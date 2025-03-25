import axios from '@/lib/axios'
import { API_ENDPOINTS } from '@/config/api'
import { useAuthStore } from '@/stores/authStore'

interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string[]
  }
}

export const authService = {
  login: async (email: string, password: string) => {
    const response = await axios.post<LoginResponse>(API_ENDPOINTS.auth.login, {
      loginName: email,
      password,
    })

    return response.data
  },

  logout: async () => {
    await axios.post(API_ENDPOINTS.auth.logout)
    useAuthStore.getState().auth.reset()
  },

  getCurrentUser: async () => {
    const response = await axios.get(API_ENDPOINTS.auth.me)
    return response.data
  },
} 