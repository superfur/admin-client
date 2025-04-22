export const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:3000/api'
  : '/api'

export const API_ENDPOINTS = {
  // 认证相关
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh-token',
    me: '/auth/me',
  },
  // 用户相关
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  images: {
    upload: '/images/upload',
    list: '/images',
    delete: (id: string) => `/images/${id}`,
  },
  // 其他接口...
} as const
 