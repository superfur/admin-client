import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api } from '@/lib/api'
import { User, LoginRequest, RegisterRequest, ApiError } from '@/types/api'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // 认证方法
  login: (data: LoginRequest) => Promise<boolean>
  register: (data: RegisterRequest) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  clearError: () => void
  
  // 获取用户信息
  fetchProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.auth.login(data)
          
          if (response.success && response.data) {
            // 保存 token
            localStorage.setItem('access_token', response.data.access_token)
            
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
            
            return true
          } else {
            set({
              error: response.message || '登录失败',
              isLoading: false
            })
            return false
          }
        } catch (error) {
          const apiError = error as ApiError
          set({
            error: apiError.message || '登录失败',
            isLoading: false
          })
          return false
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.auth.register(data)
          
          if (response.success && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
            
            return true
          } else {
            set({
              error: response.message || '注册失败',
              isLoading: false
            })
            return false
          }
        } catch (error) {
          const apiError = error as ApiError
          set({
            error: apiError.message || '注册失败',
            isLoading: false
          })
          return false
        }
      },

      logout: () => {
        localStorage.removeItem('access_token')
        set({
          user: null,
          isAuthenticated: false,
          error: null
        })
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          })
        }
      },

      clearError: () => {
        set({ error: null })
      },

      fetchProfile: async () => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await api.auth.getProfile()
          
          if (response.success && response.data) {
            // 这里需要根据实际 API 响应调整
            // 因为 profile 接口返回的是 JWT payload，不是完整的用户信息
            const currentUser = get().user
            if (currentUser) {
              set({
                user: {
                  ...currentUser,
                  id: response.data.sub,
                  username: response.data.username,
                  roles: response.data.roles.map(role => ({ id: 0, roleName: role, description: '' }))
                },
                isLoading: false,
                error: null
              })
            }
          }
        } catch (error) {
          const apiError = error as ApiError
          set({
            error: apiError.message || '获取用户信息失败',
            isLoading: false
          })
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
