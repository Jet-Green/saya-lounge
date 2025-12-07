export const useAdminGallery = () => {
  const uploading = ref(false)
  const uploadedCount = ref(0)
  const totalFiles = ref(0)
  const successMessage = ref('')

  const uploadFiles = async (files: File[]) => {
    if (!files || files.length === 0) return

    uploading.value = true
    uploadedCount.value = 0
    totalFiles.value = files.length
    successMessage.value = ''

    const uploadPromises = files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)

      try {
        await $fetch('/api/ya-cloud/upload-photo-gallery', {
          method: 'POST',
          body: formData,
        })
        uploadedCount.value++
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error)
      }
    })

    await Promise.all(uploadPromises)

    uploading.value = false
    successMessage.value = `Успешно загружено ${uploadedCount.value} из ${totalFiles.value} файлов`
    
    // Очистить сообщение через 5 секунд
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }

  const galleryItems = ref<any[]>([])
  const galleryLoading = ref(false)
  const galleryError = ref('')
  const deletingKey = ref<string | null>(null)

  const fetchGallery = async () => {
    galleryLoading.value = true
    galleryError.value = ''
    try {
      const res = await $fetch('/api/ya-cloud/list-gallery', {
        method: 'GET',
        params: { limit: 1000 },
      })
      galleryItems.value = res.items || []
    } catch (e) {
      galleryError.value = 'Ошибка загрузки галереи'
    } finally {
      galleryLoading.value = false
    }
  }

  const deleteGalleryItem = async (key: string) => {
    if (!key) return
    deletingKey.value = key
    galleryError.value = ''

    try {
      const res: any = await $fetch('/api/ya-cloud/delete-photo-gallery', {
        method: 'POST',
        body: { key },
      })

      if (!res?.success) {
        throw new Error(res?.error || 'Delete failed')
      }

      galleryItems.value = galleryItems.value.filter((item) => item.key !== key)
    } catch (e) {
      galleryError.value = 'Ошибка удаления файла'
    } finally {
      deletingKey.value = null
    }
  }

  return {
    uploading,
    uploadedCount,
    totalFiles,
    successMessage,
    uploadFiles,
    galleryItems,
    galleryLoading,
    galleryError,
    fetchGallery,
    deleteGalleryItem,
    deletingKey,
  }
}
