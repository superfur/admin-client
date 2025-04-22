import * as qiniu from 'qiniu-js'
import { qiniuConfig } from '../config/qiniu'

interface UploadProgress {
  total: {
    percent: number
  }
}

interface UploadResult {
  key: string
}

export class QiniuUploader {
  private static instance: QiniuUploader
  private uploadToken: string = ''

  private constructor() {}

  public static getInstance(): QiniuUploader {
    if (!QiniuUploader.instance) {
      QiniuUploader.instance = new QiniuUploader()
    }
    return QiniuUploader.instance
  }

  public async uploadFile(file: File, key: string): Promise<string> {
    // 获取上传凭证
    const token = await this.getUploadToken()

    // 创建上传配置
    const config = {
      ...qiniuConfig.uploadConfig,
      useCdnDomain: true,
    }

    // 创建上传实例
    const observable = (qiniu as any).upload(file, key, token, config, {
      fname: file.name,
      mimeType: file.type,
    })

    // 返回上传结果
    return new Promise((resolve, reject) => {
      observable.subscribe({
        next: (_res: UploadProgress) => {
          // 上传进度处理
        },
        error: (err: Error) => {
          reject(err)
        },
        complete: (res: UploadResult) => {
          const url = `${qiniuConfig.domain}/${res.key}`
          resolve(url)
        },
      })
    })
  }

  private async getUploadToken(): Promise<string> {
    if (this.uploadToken) {
      return this.uploadToken
    }

    // TODO: 从后端获取上传凭证
    // 这里需要调用后端接口获取上传凭证
    // 临时使用一个模拟的 token
    this.uploadToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiMSIsInJvbGVzIjpbeyJpZCI6IjEiLCJyb2xlTmFtZSI6IkFETUlOIiwiZGVzY3JpcHRpb24iOiLotoXnuqfnrqHnkIblkZgiLCJjcmVhdGVkQXQiOiIyMDI1LTAzLTI1VDA5OjE0OjQzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAzLTI1VDA5OjE0OjQzLjAwMFoifV0sImlhdCI6MTc0NTMzOTQ0NSwiZXhwIjoxNzQ1NDI1ODQ1fQ.Z_2cDTChm2Y6RMhkf3JOsfgb5ZIrcGMtJNIFls3jeVg';
    return this.uploadToken
  }
}
