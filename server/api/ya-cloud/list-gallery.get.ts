import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { s3 } from '~~/server/utils/s3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const bucket = config.ycBucket
  const { limit, continuationToken, folder = 'gallery' } = getQuery(event)

  const folderName = typeof folder === 'string' ? folder : 'gallery'
  const maxKeys = Number(limit) && Number(limit) > 0 ? Number(limit) : 50

  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: `${folderName}/`,
    MaxKeys: maxKeys,
    ContinuationToken: typeof continuationToken === 'string' ? continuationToken : undefined,
  })

  const result = await s3.send(command)

  const items = (result.Contents || [])
    .filter((item) => item.Key)
    .map((item) => ({
      key: item.Key!,
      url: `https://${bucket}.storage.yandexcloud.net/${item.Key}`,
      size: item.Size || 0,
      lastModified: item.LastModified || null,
    }))

  return {
    items,
    isTruncated: Boolean(result.IsTruncated),
    nextContinuationToken: result.NextContinuationToken || null,
  }
})
