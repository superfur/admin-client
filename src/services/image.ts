import { API_ENDPOINTS } from '@/config/api'
import axios from '@/lib/axios'
import { QiniuUploader } from '../utils/qiniuUpload'

export interface Image {
  id: string
  url: string
  name: string
  size: number
  type: string
  createdAt: string
}

export interface ImageListResponse {
  data: Image[]
  total: number
  page: number
  pageSize: number
}

export const imageService = {
  // 上传图片
  upload: async (file: File) => {
    try {
      // 使用七牛云上传
      const qiniuUploader = QiniuUploader.getInstance()
      const key = `images/${Date.now()}-${file.name}`
      const url = await qiniuUploader.uploadFile(file, key)

      // 将上传结果保存到后端
      const response = await axios.post<Image>(
        API_ENDPOINTS.images.upload,
        {
          url,
          filename: file.name,
          size: file.size,
          type: file.type,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    } catch (_error) {
      throw new Error('图片上传失败')
    }
  },

  // 获取图片列表
  getList: async (page = 1, pageSize = 10) => {
    const response = await axios.get<ImageListResponse>(
      API_ENDPOINTS.images.list,
      {
        params: {
          page,
          pageSize,
        },
      }
    )
    return response.data
  },

  // 删除图片
  delete: async (id: string) => {
    await axios.delete(API_ENDPOINTS.images.delete(id))
  },
}
