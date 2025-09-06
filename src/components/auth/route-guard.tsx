import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function RouteGuard({ children, requireAuth = true }: RouteGuardProps) {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      navigate({ to: '/login' })
    } else if (!requireAuth && isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, isLoading, requireAuth, navigate])

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    )
  }

  // 如果需要认证但未登录，不渲染（会重定向到登录页）
  if (requireAuth && !isAuthenticated) {
    return null
  }

  // 如果不需要认证但已登录，不渲染（会重定向到首页）
  if (!requireAuth && isAuthenticated) {
    return null
  }

  // 其他情况（requireAuth=false && isAuthenticated=false 或 requireAuth=true && isAuthenticated=true）
  return <>{children}</>
}
