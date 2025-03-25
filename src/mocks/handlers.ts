import { API_BASE_URL } from '@/config/api'
import { http, HttpResponse } from 'msw'

interface LoginRequest {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
}

// 模拟用户数据
const mockUsers: User[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
  },
]

export const handlers = [
  // 登录接口
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest

    if (email === 'admin@example.com' && password === 'admin123') {
      return HttpResponse.json({
        token: 'mock-token',
        user: {
          id: '1',
          name: '管理员',
          email: 'admin@example.com',
          role: ['admin'],
        },
      })
    }

    return new HttpResponse(JSON.stringify({ message: '用户名或密码错误' }), {
      status: 401,
    })
  }),

  // 获取用户列表
  http.get(`${API_BASE_URL}/users`, () => {
    return HttpResponse.json({
      data: mockUsers,
      total: mockUsers.length,
    })
  }),

  // 获取用户详情
  http.get(`${API_BASE_URL}/users/:id`, ({ params }) => {
    const { id } = params
    const user = mockUsers.find((u) => u.id === id)

    if (!user) {
      return new HttpResponse(JSON.stringify({ message: '用户不存在' }), {
        status: 404,
      })
    }

    return HttpResponse.json(user)
  }),

  // 创建用户
  http.post(`${API_BASE_URL}/users`, async ({ request }) => {
    const userData = (await request.json()) as Omit<User, 'id' | 'status'>
    const newUser: User = {
      id: String(mockUsers.length + 1),
      ...userData,
      status: 'active',
    }
    mockUsers.push(newUser)

    return new HttpResponse(JSON.stringify(newUser), { status: 201 })
  }),

  // 更新用户
  http.put(`${API_BASE_URL}/users/:id`, async ({ request, params }) => {
    const { id } = params
    const updateData = (await request.json()) as Partial<User>
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return new HttpResponse(JSON.stringify({ message: '用户不存在' }), {
        status: 404,
      })
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...updateData,
    }

    return HttpResponse.json(mockUsers[userIndex])
  }),

  // 删除用户
  http.delete(`${API_BASE_URL}/users/:id`, ({ params }) => {
    const { id } = params
    const userIndex = mockUsers.findIndex((u) => u.id === id)

    if (userIndex === -1) {
      return new HttpResponse(JSON.stringify({ message: '用户不存在' }), {
        status: 404,
      })
    }

    mockUsers.splice(userIndex, 1)

    return HttpResponse.json({ message: '删除成功' })
  }),
]
