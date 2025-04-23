import { qiniuConfig } from '@/config/qiniu'
import * as qiniu from 'qiniu-js'

interface UploadProgress {
  total: {
    percent: number
  }
}

export const uploadToQiniu = async (file: File): Promise<{ url: string; key: string; hash: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const key = `${Date.now()}-${file.name}`
      const token = getUploadToken()
      const putExtra = {
        fname: file.name,
        params: {},
        mimeType: file.type || null,
      }
      const config = {
        useCdnDomain: true,
        region: qiniuConfig.uploadConfig.region,
      }

      const observable = (qiniu as any).upload(file, key, token, putExtra, config)
      observable.subscribe({
        next: (res: UploadProgress) => {
          console.log('上传进度：', res.total.percent)
        },
        error: (err: Error) => {
          console.error('上传错误：', err)
          reject(err)
        },
        complete: (res: { key: string; hash: string }) => {
          resolve({
            url: `${qiniuConfig.domain}/${res.key}`,
            key: res.key,
            hash: res.hash,
          })
        },
      })
    } catch (error) {
      console.error('上传异常：', error)
      reject(error)
    }
  })
}

const getUploadToken = () => {
  // 这里应该从后端获取上传凭证
  // 临时返回一个测试用的 token
  return 'your-upload-token'
}
