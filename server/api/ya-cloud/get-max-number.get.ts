export default defineEventHandler(async (event) => {
  const { folder = 'gallery' } = getQuery(event)
  const folderName = typeof folder === 'string' ? folder : 'gallery'

  try {
    const res = await $fetch('/api/ya-cloud/list-gallery', {
      method: 'GET',
      params: { limit: 10000, folder: folderName },
    })

    const items = res.items || []
    
    let maxNumber = 0
    items.forEach((item: any) => {
      const fileName = item.key.split('/').pop() || ''
      const number = parseInt(fileName.split('.')[0], 10)
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number
      }
    })

    return { maxNumber }
  } catch (error) {
    return { maxNumber: 0 }
  }
})
