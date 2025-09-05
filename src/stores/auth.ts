import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // 模拟登录成功
          const user: User = {
            id: '1',
            name: '管理员',
            email: email,
            role: 'admin',
            avatar: '/placeholder-avatar.jpg'
          }

          set({
            user,
            isAuthenticated: true
          })

          return true
        } catch (error) {
          console.error('Login failed:', error)
          return false
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        })
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
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
