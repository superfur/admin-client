// API 服务层
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { 
  ApiResponse, 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  ForgotPasswordRequest, 
  ResetPasswordRequest,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  Role,
  CreateRoleRequest,
  UpdateRoleRequest,
  Permission,
  CreatePermissionRequest,
  UpdatePermissionRequest,
  LoginLog,
  UserProfile,
  PaginationParams,
  ApiError
} from '@/types/api'

// API 配置
const API_CONFIG = {
  baseURL: import.meta.env.DEV ? 'http://localhost:3000/api' : '/api',
  timeout: 10000,
}

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create(API_CONFIG)

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加认证头
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // 处理认证错误
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || '请求失败',
      status: error.response?.status,
      code: error.response?.data?.code,
    }
    
    return Promise.reject(apiError)
  }
)

// 通用请求方法
const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.request<ApiResponse<T>>(config)
    return response.data
  } catch (error) {
    throw error
  }
}

// 认证相关 API
export const authApi = {
  // 用户登录
  login: (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return request<LoginResponse>({
      method: 'POST',
      url: '/auth/login',
      data,
    })
  },

  // 用户注册
  register: (data: RegisterRequest): Promise<ApiResponse<User>> => {
    return request<User>({
      method: 'POST',
      url: '/auth/register',
      data,
    })
  },

  // 忘记密码
  forgotPassword: (data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string; token: string }>> => {
    return request<{ message: string; token: string }>({
      method: 'POST',
      url: '/auth/forgot-password',
      data,
    })
  },

  // 重置密码
  resetPassword: (data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return request<{ message: string }>({
      method: 'POST',
      url: '/auth/reset-password',
      data,
    })
  },

  // 获取登录日志
  getLoginLogs: (params?: PaginationParams): Promise<ApiResponse<LoginLog[]>> => {
    return request<LoginLog[]>({
      method: 'GET',
      url: '/auth/login-logs',
      params,
    })
  },

  // 获取用户个人资料
  getProfile: (): Promise<ApiResponse<UserProfile>> => {
    return request<UserProfile>({
      method: 'GET',
      url: '/auth/profile',
    })
  },
}

// 用户管理 API
export const userApi = {
  // 创建用户
  createUser: (data: CreateUserRequest): Promise<ApiResponse<User>> => {
    return request<User>({
      method: 'POST',
      url: '/users',
      data,
    })
  },

  // 获取用户列表
  getUsers: (params?: PaginationParams): Promise<ApiResponse<User[]>> => {
    return request<User[]>({
      method: 'GET',
      url: '/users',
      params,
    })
  },

  // 获取用户详情
  getUserById: (id: number): Promise<ApiResponse<User>> => {
    return request<User>({
      method: 'GET',
      url: `/users/${id}`,
    })
  },

  // 更新用户信息
  updateUser: (id: number, data: UpdateUserRequest): Promise<ApiResponse<User>> => {
    return request<User>({
      method: 'PATCH',
      url: `/users/${id}`,
      data,
    })
  },

  // 删除用户
  deleteUser: (id: number): Promise<ApiResponse<{ message: string }>> => {
    return request<{ message: string }>({
      method: 'DELETE',
      url: `/users/${id}`,
    })
  },
}

// 角色管理 API
export const roleApi = {
  // 创建角色
  createRole: (data: CreateRoleRequest): Promise<ApiResponse<Role>> => {
    return request<Role>({
      method: 'POST',
      url: '/roles',
      data,
    })
  },

  // 获取角色列表
  getRoles: (): Promise<ApiResponse<Role[]>> => {
    return request<Role[]>({
      method: 'GET',
      url: '/roles',
    })
  },

  // 获取角色详情
  getRoleById: (id: number): Promise<ApiResponse<Role>> => {
    return request<Role>({
      method: 'GET',
      url: `/roles/${id}`,
    })
  },

  // 更新角色
  updateRole: (id: number, data: UpdateRoleRequest): Promise<ApiResponse<Role>> => {
    return request<Role>({
      method: 'PATCH',
      url: `/roles/${id}`,
      data,
    })
  },

  // 删除角色
  deleteRole: (id: number): Promise<ApiResponse<{ message: string }>> => {
    return request<{ message: string }>({
      method: 'DELETE',
      url: `/roles/${id}`,
    })
  },
}

// 权限管理 API
export const permissionApi = {
  // 创建权限
  createPermission: (data: CreatePermissionRequest): Promise<ApiResponse<Permission>> => {
    return request<Permission>({
      method: 'POST',
      url: '/permissions',
      data,
    })
  },

  // 获取权限列表
  getPermissions: (): Promise<ApiResponse<Permission[]>> => {
    return request<Permission[]>({
      method: 'GET',
      url: '/permissions',
    })
  },

  // 获取权限详情
  getPermissionById: (id: number): Promise<ApiResponse<Permission>> => {
    return request<Permission>({
      method: 'GET',
      url: `/permissions/${id}`,
    })
  },

  // 更新权限
  updatePermission: (id: number, data: UpdatePermissionRequest): Promise<ApiResponse<Permission>> => {
    return request<Permission>({
      method: 'PATCH',
      url: `/permissions/${id}`,
      data,
    })
  },

  // 删除权限
  deletePermission: (id: number): Promise<ApiResponse<{ message: string }>> => {
    return request<{ message: string }>({
      method: 'DELETE',
      url: `/permissions/${id}`,
    })
  },
}

// 导出所有 API
export const api = {
  auth: authApi,
  user: userApi,
  role: roleApi,
  permission: permissionApi,
}

export default api
