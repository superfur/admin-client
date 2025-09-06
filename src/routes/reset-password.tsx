import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconEye, IconEyeOff, IconLock, IconArrowLeft } from '@tabler/icons-react'
import { api } from '@/lib/api'
import { ResetPasswordRequest } from '@/types/api'
import { RouteGuard } from '@/components/auth/route-guard'
import { AuthLayout } from '@/components/layout/auth-layout'

export const Route = createFileRoute('/reset-password')({
  component: () => (
    <RouteGuard requireAuth={false}>
      <AuthLayout>
        <ResetPassword />
      </AuthLayout>
    </RouteGuard>
  ),
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token: (search.token as string) || '',
    }
  },
})

export function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { token } = useSearch({ from: '/reset-password' })

  useEffect(() => {
    if (!token) {
      navigate({ to: '/forgot-password' })
    }
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!password.trim() || !confirmPassword.trim()) {
      setError('请填写密码和确认密码')
      return
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }
    
    if (password.length < 6) {
      setError('密码长度不能少于6个字符')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const data: ResetPasswordRequest = {
        token,
        newPassword: password.trim(),
        confirmPassword: confirmPassword.trim()
      }
      
      const response = await api.auth.resetPassword(data)
      if (response.success) {
        setIsSuccess(true)
      } else {
        setError(response.message || '重置失败，请稍后重试')
      }
    } catch (error: any) {
      setError(error.message || '重置失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-600">密码重置成功</CardTitle>
          <CardDescription>
            您的密码已成功重置，请使用新密码登录。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full"
            onClick={() => navigate({ to: '/login' })}
          >
            立即登录
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">重置密码</CardTitle>
        <CardDescription>
          请输入您的新密码
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">新密码</Label>
            <div className="relative">
              <IconLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入新密码（至少6个字符）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IconEyeOff className="h-4 w-4" />
                ) : (
                  <IconEye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认新密码</Label>
            <div className="relative">
              <IconLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="请再次输入新密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <IconEyeOff className="h-4 w-4" />
                ) : (
                  <IconEye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {password && confirmPassword && password !== confirmPassword && (
            <div className="text-sm text-destructive">
              两次输入的密码不一致
            </div>
          )}
          
          {error && (
            <div className="text-sm text-destructive text-center">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading || password !== confirmPassword}>
            {isLoading ? '重置中...' : '重置密码'}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm">
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
      </CardContent>
    </Card>
  )
}