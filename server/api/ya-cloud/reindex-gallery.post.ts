import { CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '~~/server/utils/s3'

export default defineEventHandler(async (event) => {
  const { folder = 'gallery' } = await readBody(event)

  try {
    // Получаем список файлов в папке
    const res = await $fetch('/api/ya-cloud/list-gallery', {
      method: 'GET',
      params: { limit: 10000, folder },
    })

    const items = (res.items || [])
      .filter((item: any) => item.key.startsWith(`${folder}/`))
      .sort((a: any, b: any) => {
        const numA = parseInt(a.key.split('/').pop()?.split('.')[0] || '0', 10)
        const numB = parseInt(b.key.split('/').pop()?.split('.')[0] || '0', 10)
        return numA - numB
      })

    const config = useRuntimeConfig()
    const bucket = config.ycBucket

    // Переиндексируем все файлы с номерами 1, 2, 3...
    let newNumber = 1
    for (const item of items) {
      const fileName = item.key.split('/').pop() || ''
      const fileParts = fileName.split('.')
      const currentNumber = parseInt(fileParts[0], 10)

      // Если номер не совпадает - переименовываем
      if (currentNumber !== newNumber) {
        const uuid = fileParts[1]
        const ext = fileParts[2]
        const oldKey = item.key
        const newKey = `${folder}/${newNumber}.${uuid}.${ext}`

        await s3.send(
          new CopyObjectCommand({
            Bucket: bucket,
            CopySource: `${bucket}/${oldKey}`,
            Key: newKey,
            ACL: 'public-read',
          })
        )

        await s3.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: oldKey,
          })
        )
      }

      newNumber++
    }

    return { success: true }
  } catch (error) {
    const errMsg = (error && typeof error === 'object' && 'message' in error) ? (error as Error).message : 'Reindex failed'
    return { success: false, error: errMsg }
  }
})
