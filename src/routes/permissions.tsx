import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconPlus, IconSearch, IconDots, IconEdit, IconTrash, IconRefresh, IconKey } from '@tabler/icons-react'
import { api } from '@/lib/api'
import { Permission } from '@/types/api'
import { RouteGuard } from '@/components/auth/route-guard'

export const Route = createFileRoute('/permissions')({
  component: () => (
    <RouteGuard requireAuth={true}>
      <Permissions />
    </RouteGuard>
  ),
})

function Permissions() {
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  // 获取权限列表
  const fetchPermissions = async () => {
    setLoading(true)
    try {
      const response = await api.permission.getPermissions()
      if (response.success && response.data) {
        setPermissions(response.data)
      }
    } catch (error) {
      console.error('获取权限列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  // 删除权限
  const handleDeletePermission = async (id: number) => {
    if (!confirm('确定要删除这个权限吗？')) {
      return
    }
    
    try {
      const response = await api.permission.deletePermission(id)
      if (response.success) {
        // 重新获取权限列表
        fetchPermissions()
      }
    } catch (error) {
      console.error('删除权限失败:', error)
    }
  }

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearch(value)
  }

  // 过滤权限
  const filteredPermissions = permissions.filter(permission => 
    permission.permissionName.toLowerCase().includes(search.toLowerCase()) ||
    permission.permissionCode.toLowerCase().includes(search.toLowerCase()) ||
    permission.description?.toLowerCase().includes(search.toLowerCase())
  )

  // 初始加载
  useEffect(() => {
    fetchPermissions()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">权限管理</h1>
          <p className="text-muted-foreground">
            管理系统权限和访问控制
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={fetchPermissions} disabled={loading}>
            <IconRefresh className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            添加权限
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>权限列表</CardTitle>
              <CardDescription>
                共 {filteredPermissions.length} 个权限
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索权限..."
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
              {filteredPermissions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {search ? '未找到匹配的权限' : '暂无权限数据'}
                </div>
              ) : (
                filteredPermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <IconKey className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{permission.permissionName}</p>
                          <Badge variant="secondary">
                            ID: {permission.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {permission.permissionCode}
                        </p>
                        {permission.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {permission.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
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
                            onClick={() => handleDeletePermission(permission.id)}
                          >
                            <IconTrash className="mr-2 h-4 w-4" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
