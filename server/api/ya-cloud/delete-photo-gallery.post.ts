import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '~~/server/utils/s3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const bucket = config.ycBucket
  const { key } = await readBody(event)

  if (!key || typeof key !== 'string') {
    return { success: false, error: 'No key provided' }
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })
    await s3.send(command)
    return { success: true }
  } catch (error) {
    const errMsg = (error && typeof error === 'object' && 'message' in error) ? (error as Error).message : 'Delete failed'
    return { success: false, error: errMsg }
  }
})
