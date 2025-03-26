import { API_ENDPOINTS } from '@/config/api'
import axios from '@/lib/axios'

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
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post<Image>(
      API_ENDPOINTS.images.upload,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
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
