import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MainLayout } from '@/components/layout/main-layout'
import { RouteGuard } from '@/components/auth/route-guard'

export const Route = createFileRoute('/')({
  component: () => (
    <RouteGuard requireAuth={true}>
      <MainLayout />
    </RouteGuard>
  ),
})

export function Index() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">后台管理系统</h1>
          <p className="text-xl text-muted-foreground">
            基于现代技术栈构建的管理后台
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>用户管理</CardTitle>
              <CardDescription>
                管理系统用户，权限分配
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>用户</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">用户总数</p>
                  <p className="text-sm text-muted-foreground">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>数据统计</CardTitle>
              <CardDescription>
                查看系统运行数据
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">今日访问</span>
                  <span className="text-sm font-medium">8,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">活跃用户</span>
                  <span className="text-sm font-medium">2,345</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系统设置</CardTitle>
              <CardDescription>
                配置系统参数
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">进入设置</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="mr-4">
            开始使用
          </Button>
          <Button variant="outline" size="lg">
            查看文档
          </Button>
        </div>
      </div>
    </div>
  )
}
