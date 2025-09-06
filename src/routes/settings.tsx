import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { RouteGuard } from '@/components/auth/route-guard'

export const Route = createFileRoute('/settings')({
  component: () => (
    <RouteGuard requireAuth={true}>
      <Settings />
    </RouteGuard>
  ),
})

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
        <p className="text-muted-foreground">
          配置系统参数和偏好设置
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>基本设置</CardTitle>
            <CardDescription>
              配置系统的基本参数
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">站点名称</Label>
                <Input id="site-name" defaultValue="管理系统" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">站点URL</Label>
                <Input id="site-url" defaultValue="https://admin.example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">站点描述</Label>
              <Input id="description" defaultValue="基于现代技术栈的管理系统" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>用户设置</CardTitle>
            <CardDescription>
              配置用户相关的设置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>允许用户注册</Label>
                <p className="text-sm text-muted-foreground">
                  是否允许新用户注册账户
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>邮箱验证</Label>
                <p className="text-sm text-muted-foreground">
                  注册时是否需要邮箱验证
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>双因素认证</Label>
                <p className="text-sm text-muted-foreground">
                  启用双因素认证提高安全性
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>安全设置</CardTitle>
            <CardDescription>
              配置系统安全相关参数
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">会话超时时间（分钟）</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">最大登录尝试次数</Label>
                <Input id="max-login-attempts" type="number" defaultValue="5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>强制HTTPS</Label>
                <p className="text-sm text-muted-foreground">
                  强制使用HTTPS连接
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">重置</Button>
          <Button>保存设置</Button>
        </div>
      </div>
    </div>
  )
}
