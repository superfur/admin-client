import { QINIU_CONFIG } from '@/config/qiniu'
import * as qiniu from 'qiniu-js'

interface UploadResult {
  url: string
  key: string
  hash: string
}

export const qiniuService = {
  // 获取上传凭证
  getUploadToken: async () => {
    const response = await fetch('/api/qiniu/token')
    const { token } = await response.json()
    return token
  },

  // 上传文件
  upload: async (file: File): Promise<UploadResult> => {
    const token = await qiniuService.getUploadToken()
    const key = `images/${Date.now()}-${file.name}`

    const config = {
      useCdnDomain: true,
      region: QINIU_CONFIG.region,
    }

    const putExtra = {
      mimeType: [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/webp',
      ],
    }
    return new Promise((resolve, reject) => {
      const observable = qiniu.upload(file, key, token, putExtra, config)

      observable.subscribe({
        next: (res: { total: { percent: number } }) => {
          // 上传进度
          console.log('上传进度：', res.total.percent)
        },
        error: (err: unknown) => {
          reject(err)
        },
        complete: (res: { key: string; hash: string }) => {
          resolve({
            url: `${QINIU_CONFIG.domain}/${res.key}`,
            key: res.key,
            hash: res.hash,
          })
        },
      })
    })
  },
}
