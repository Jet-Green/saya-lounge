import { CopyObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '~~/server/utils/s3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const bucket = config.ycBucket
  const { oldKey, newKey } = await readBody(event)

  if (!oldKey || !newKey || typeof oldKey !== 'string' || typeof newKey !== 'string') {
    return { success: false, error: 'Invalid keys provided' }
  }

  if (oldKey === newKey) {
    return { success: true }
  }

  try {
    // Проверяем что исходный файл существует
    await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: oldKey,
      })
    )

    // Copy to new location
    await s3.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: `${bucket}/${oldKey}`,
        Key: newKey,
        ACL: 'public-read',
      })
    )

    // Убедимся что новый файл создан перед удалением старого
    await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: newKey,
      })
    )

    // Delete old file
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: oldKey,
      })
    )

    return { success: true }
  } catch (error) {
    const errMsg = (error && typeof error === 'object' && 'message' in error) ? (error as Error).message : 'Rename failed'
    return { success: false, error: errMsg }
  }
})

