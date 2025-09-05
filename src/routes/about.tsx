import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">关于系统</h1>
          <p className="text-muted-foreground">
            这是一个基于现代技术栈构建的后台管理系统
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>技术栈</CardTitle>
            <CardDescription>
              系统采用的技术和工具
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">前端框架</h4>
                <p className="text-sm text-muted-foreground">React 19</p>
              </div>
              <div>
                <h4 className="font-medium">构建工具</h4>
                <p className="text-sm text-muted-foreground">Vite</p>
              </div>
              <div>
                <h4 className="font-medium">路由</h4>
                <p className="text-sm text-muted-foreground">TanStack Router</p>
              </div>
              <div>
                <h4 className="font-medium">UI组件</h4>
                <p className="text-sm text-muted-foreground">ShadcnUI</p>
              </div>
              <div>
                <h4 className="font-medium">样式</h4>
                <p className="text-sm text-muted-foreground">TailwindCSS</p>
              </div>
              <div>
                <h4 className="font-medium">图标</h4>
                <p className="text-sm text-muted-foreground">Tabler Icons</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>功能特性</CardTitle>
            <CardDescription>
              系统的主要功能
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• 响应式设计，支持移动端</li>
              <li>• 暗色模式支持</li>
              <li>• 组件化开发</li>
              <li>• TypeScript 类型安全</li>
              <li>• 现代化开发工具</li>
              <li>• 可扩展的架构</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
