import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/ui/status-badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconPlus, IconSearch, IconDots, IconEdit, IconTrash, IconRefresh } from '@tabler/icons-react'
import { api } from '@/lib/api'
import { User, PaginationParams } from '@/types/api'
import { RouteGuard } from '@/components/auth/route-guard'

export const Route = createFileRoute('/users')({
  component: () => (
    <RouteGuard requireAuth={true}>
      <Users />
    </RouteGuard>
  ),
})

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10
  })

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params: PaginationParams = {
        ...pagination,
        search: search.trim() || undefined
      }
      const response = await api.user.getUsers(params)
      if (response.success && response.data) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error('获取用户列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 删除用户
  const handleDeleteUser = async (id: number) => {
    if (!confirm('确定要删除这个用户吗？')) {
      return
    }
    
    try {
      const response = await api.user.deleteUser(id)
      if (response.success) {
        // 重新获取用户列表
        fetchUsers()
      }
    } catch (error) {
      console.error('删除用户失败:', error)
    }
  }

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearch(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  // 初始加载
  useEffect(() => {
    fetchUsers()
  }, [pagination.page, pagination.limit, search])

  // 获取状态显示文本
  const getStatusText = (status: number) => {
    return status === 1 ? '活跃' : '离线'
  }

  // 获取状态类型
  const getStatusType = (status: number) => {
    return status === 1 ? 'active' : 'inactive'
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="text-muted-foreground">
            管理系统用户和权限
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={fetchUsers} disabled={loading}>
            <IconRefresh className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            添加用户
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>用户列表</CardTitle>
              <CardDescription>
                共 {users.length} 个用户
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索用户..."
                  className="w-64 pl-10"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-muted-foreground">加载中...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  暂无用户数据
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email || '未设置邮箱'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {user.roles?.map(role => role.roleName).join(', ') || '无角色'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {user.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={getStatusType(user.status)}>
                          {getStatusText(user.status)}
                        </StatusBadge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <IconDots className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <IconEdit className="mr-2 h-4 w-4" />
                              编辑
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <IconTrash className="mr-2 h-4 w-4" />
                              删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
