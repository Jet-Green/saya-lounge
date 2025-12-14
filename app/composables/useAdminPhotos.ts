export const useAdminPhotos = (folder: 'gallery' | 'menu' | 'bar') => {
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
        await $fetch(`/api/ya-cloud/upload-photo-gallery?folder=${folder}`, {
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
    
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }

  const items = ref<any[]>([])
  const loading = ref(false)
  const error = ref('')
  const deletingKey = ref<string | null>(null)

  const extractFileName = (key: string): string => {
    const parts = key.split('/')
    const fileName = parts[parts.length - 1]
    return fileName?.split('.')[0] || ''
  }

  const sortByFileName = (items: any[]) => {
    return items.sort((a, b) => {
      const nameA = extractFileName(a.key)
      const nameB = extractFileName(b.key)
      
      const numA = parseInt(nameA, 10)
      const numB = parseInt(nameB, 10)
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }
      
      return nameA.localeCompare(nameB)
    })
  }

  const fetchItems = async () => {
    loading.value = true
    error.value = ''
    try {
      const res = await $fetch('/api/ya-cloud/list-gallery', {
        method: 'GET',
        params: { limit: 1000, folder },
      })
      items.value = sortByFileName(res.items || [])
    } catch (e) {
      error.value = 'Ошибка загрузки'
    } finally {
      loading.value = false
    }
  }

  const deleteItem = async (key: string) => {
    if (!key) return
    deletingKey.value = key
    error.value = ''

    try {
      const res: any = await $fetch('/api/ya-cloud/delete-photo-gallery', {
        method: 'POST',
        body: { key },
      })

      if (!res?.success) {
        throw new Error(res?.error || 'Delete failed')
      }

      items.value = items.value.filter((item) => item.key !== key)
    } catch (e) {
      error.value = 'Ошибка удаления файла'
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
    items,
    loading,
    error,
    fetchItems,
    deleteItem,
    deletingKey,
  }
}
