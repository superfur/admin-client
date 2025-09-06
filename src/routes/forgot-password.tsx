import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconArrowLeft, IconMail, IconUser } from '@tabler/icons-react'
import { api } from '@/lib/api'
import { ForgotPasswordRequest } from '@/types/api'
import { RouteGuard } from '@/components/auth/route-guard'
import { AuthLayout } from '@/components/layout/auth-layout'

export const Route = createFileRoute('/forgot-password')({
  component: () => (
    <RouteGuard requireAuth={false}>
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    </RouteGuard>
  ),
})

export function ForgotPassword() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username.trim() || !email.trim()) {
      setError('请填写用户名和邮箱')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const data: ForgotPasswordRequest = {
        username: username.trim(),
        email: email.trim()
      }
      
      const response = await api.auth.forgotPassword(data)
      if (response.success) {
        setIsSuccess(true)
      } else {
        setError(response.message || '发送失败，请稍后重试')
      }
    } catch (error: any) {
      setError(error.message || '发送失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">邮件已发送</CardTitle>
          <CardDescription>
            密码重置链接已发送到您的邮箱，请查收邮件并按照说明重置密码。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            没有收到邮件？请检查垃圾邮件文件夹，或稍后重试。
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                setIsSuccess(false)
                setUsername('')
                setEmail('')
              }}
            >
              重新发送
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate({ to: '/login' })}
            >
              返回登录
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">找回密码</CardTitle>
        <CardDescription>
          输入您的用户名和邮箱，我们将发送密码重置链接到您的邮箱
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <div className="relative">
              <IconUser className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="请输入用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <div className="relative">
              <IconMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="请输入注册时使用的邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-destructive text-center">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '发送中...' : '发送重置链接'}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm space-y-2">
          <div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/login' })}
              className="p-0 h-auto text-primary hover:underline"
            >
              <IconArrowLeft className="mr-1 h-3 w-3" />
              返回登录
            </Button>
          </div>
          <div>
            还没有账户？{' '}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate({ to: '/register' })}
              className="p-0 h-auto text-primary hover:underline"
            >
              立即注册
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
