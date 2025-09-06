// API 类型定义

// 基础响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  total?: number
  page?: number
  limit?: number
}

// 分页参数
export interface PaginationParams {
  page?: number
  limit?: number
  search?: string
}

// 用户相关类型
export interface User {
  id: number
  username: string
  email?: string
  mobile?: string
  status: number
  roles: Role[]
}

export interface CreateUserRequest {
  username: string
  password: string
  email?: string
  mobile?: string
  roleIds?: number[]
}

export interface UpdateUserRequest {
  username?: string
  email?: string
  mobile?: string
  status?: number
  roleIds?: number[]
}

// 角色相关类型
export interface Role {
  id: number
  roleName: string
  description?: string
  permissions?: Permission[]
}

export interface CreateRoleRequest {
  roleName: string
  description?: string
  permissionIds?: number[]
}

export interface UpdateRoleRequest {
  roleName?: string
  description?: string
  permissionIds?: number[]
}

// 权限相关类型
export interface Permission {
  id: number
  permissionName: string
  permissionCode: string
  description?: string
}

export interface CreatePermissionRequest {
  permissionName: string
  permissionCode: string
  description?: string
}

export interface UpdatePermissionRequest {
  permissionName?: string
  permissionCode?: string
  description?: string
}

// 认证相关类型
export interface LoginRequest {
  loginName: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface RegisterRequest {
  username: string
  password: string
  email?: string
  mobile?: string
  roleIds?: number[]
}

export interface ForgotPasswordRequest {
  username: string
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface LoginLog {
  id: number
  userId: number
  loginTime: string
  loginIp: string
  userAgent: string
}

export interface UserProfile {
  sub: number
  username: string
  roles: string[]
  iat: number
  exp: number
}

// API 配置
export interface ApiConfig {
  baseURL: string
  timeout: number
}

// 错误类型
export interface ApiError {
  message: string
  status?: number
  code?: string
}
