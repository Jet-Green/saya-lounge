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

    // Переиндексируем файлы после загрузки
    try {
      await $fetch('/api/ya-cloud/reindex-gallery', {
        method: 'POST',
        body: { folder },
      })
    } catch (error) {
      console.error('Reindex error:', error)
    }

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
  const movingKey = ref<string | null>(null)

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
        params: { limit: 10000, folder },
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
        body: { key, folder },
      })

      if (!res?.success) {
        throw new Error(res?.error || 'Delete failed')
      }

      await fetchItems()
    } catch (e) {
      error.value = 'Ошибка удаления файла'
    } finally {
      deletingKey.value = null
    }
  }

  const moveItem = async (key: string, direction: 'left' | 'right') => {
    if (movingKey.value !== null) return
    
    error.value = ''
    movingKey.value = key
    
    const sortedItems = [...items.value]
    const currentIndex = sortedItems.findIndex((item) => item.key === key)

    if (currentIndex === -1) {
      movingKey.value = null
      return
    }

    const swapIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1

    if (swapIndex < 0 || swapIndex >= sortedItems.length) {
      movingKey.value = null
      return
    }

    const currentItem = sortedItems[currentIndex]
    const swapItem = sortedItems[swapIndex]

    try {
      // Извлекаем компоненты имени файла (формат: число.uuid.расширение)
      const parseFileName = (fileKey: string) => {
        const fileName = fileKey.split('/').pop() || ''
        const parts = fileName.split('.')
        return {
          number: parts[0],
          uuid: parts[1],
          ext: parts[2],
          folder: fileKey.split('/')[0],
        }
      }

      const current = parseFileName(currentItem.key)
      const swap = parseFileName(swapItem.key)

      // Используем временное очень большое число для промежуточного файла
      const tempKey = `${current.folder}/999999.${current.uuid}.${current.ext}`
      const currentNewKey = `${current.folder}/${swap.number}.${current.uuid}.${current.ext}`
      const swapNewKey = `${swap.folder}/${current.number}.${swap.uuid}.${swap.ext}`

      // Шаг 1: Переименовываем текущий в промежуточное имя
      let res: any = await $fetch('/api/ya-cloud/rename-photo-gallery', {
        method: 'POST',
        body: { oldKey: currentItem.key, newKey: tempKey },
      })

      if (!res?.success) {
        throw new Error(`Move step 1 failed: ${res?.error || 'Unknown error'}`)
      }

      // Шаг 2: Переименовываем соседний в номер текущего
      res = await $fetch('/api/ya-cloud/rename-photo-gallery', {
        method: 'POST',
        body: { oldKey: swapItem.key, newKey: swapNewKey },
      })

      if (!res?.success) {
        // Откатываем первую операцию
        await $fetch('/api/ya-cloud/rename-photo-gallery', {
          method: 'POST',
          body: { oldKey: tempKey, newKey: currentItem.key },
        })
        throw new Error(`Move step 2 failed: ${res?.error || 'Unknown error'}`)
      }

      // Шаг 3: Переименовываем промежуточный в номер соседа
      res = await $fetch('/api/ya-cloud/rename-photo-gallery', {
        method: 'POST',
        body: { oldKey: tempKey, newKey: currentNewKey },
      })

      if (!res?.success) {
        // Откатываем: возвращаем на места
        await $fetch('/api/ya-cloud/rename-photo-gallery', {
          method: 'POST',
          body: { oldKey: swapNewKey, newKey: swapItem.key },
        })
        throw new Error(`Move step 3 failed: ${res?.error || 'Unknown error'}`)
      }

      await fetchItems()
    } catch (e) {
      error.value = 'Ошибка при перемещении файла'
      await fetchItems()
    } finally {
      movingKey.value = null
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
    moveItem,
    deletingKey,
    movingKey,
  }
}
