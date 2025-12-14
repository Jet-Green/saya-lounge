import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '~~/server/utils/s3'
import { randomUUID } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const bucket = config.ycBucket

  const formData = await readMultipartFormData(event)
  if (!formData?.[0]) {
    throw createError({ statusCode: 400, message: 'No file provided' })
  }

  const file = formData[0]
  if (!file.data || !file.type?.startsWith('image/')) {
    throw createError({ statusCode: 400, message: 'Invalid image file' })
  }

  // Получаем folder из query параметров (по умолчанию 'gallery')
  const { folder = 'gallery' } = getQuery(event)
  const folderName = typeof folder === 'string' ? folder : 'gallery'

  try {
    const filename = file.filename || 'file'
    const ext = filename.split('.').pop() || 'jpg'
    const uuid = randomUUID()
    // Используем большой рандомный номер для новых файлов, потом переиндексируем
    const timestamp = Date.now()
    const key = `${folderName}/${timestamp}.${uuid}.${ext}`

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.data,
        ContentType: file.type,
        ACL: 'public-read',
      })
    )

    const url = `https://${bucket}.storage.yandexcloud.net/${key}`

    return { success: true, url, key }
  } catch (error) {
    console.error('S3 Upload Error:', error)
    throw createError({ statusCode: 500, message: 'Upload failed' })
  }
})
