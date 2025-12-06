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

  return {
    uploading,
    uploadedCount,
    totalFiles,
    successMessage,
    uploadFiles,
  }
}
