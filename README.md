# Shadcn Admin Dashboard

Admin Dashboard UI crafted with Shadcn and Vite. Built with responsiveness and accessibility in mind.

![alt text](public/images/shadcn-admin.png)

I've been creating dashboard UIs at work and for my personal projects. I always wanted to make a reusable collection of dashboard UI for future projects; and here it is now. While I've created a few custom components, some of the code is directly adapted from ShadcnUI examples.

> This is not a starter project (template) though. I'll probably make one in the future.

## Features

- Light/dark mode
- Responsive
- Accessible
- With built-in Sidebar component
- Global Search Command
- 10+ pages
- Extra custom components

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Tabler Icons](https://tabler.io/icons)

## Run Locally

Clone the project

```bash
  git clone https://github.com/satnaing/shadcn-admin.git
```

Go to the project directory

```bash
  cd shadcn-admin
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```

## Author

Crafted with 🤍 by [@satnaing](https://github.com/satnaing)

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)

# Admin Client

基于 React + TypeScript + Vite + TanStack Router + Tailwind CSS 的现代化后台管理系统。

## 项目结构

```
src/
├── components/           # 通用组件
│   ├── layout/          # 布局组件
│   │   ├── app-header/  # 顶部导航栏
│   │   ├── app-sidebar/ # 侧边栏
│   │   └── main/        # 主内容区
│   └── ui/             # UI 基础组件
│       ├── button/     # 按钮组件
│       ├── card/       # 卡片组件
│       ├── progress/   # 进度条组件
│       └── toast/      # 提示组件
├── config/             # 配置文件
│   ├── api.ts         # API 接口配置
│   └── qiniu.ts       # 七牛云配置
├── context/           # React Context
│   └── search-context.tsx  # 搜索上下文
├── features/          # 功能模块
│   ├── auth/         # 认证相关
│   ├── dashboard/    # 仪表盘
│   ├── settings/     # 设置
│   └── users/        # 用户管理
├── hooks/            # 自定义 Hooks
│   └── use-toast.ts  # 提示 Hook
├── lib/              # 工具库
│   ├── axios.ts      # Axios 配置
│   └── utils.ts      # 通用工具函数
├── routes/           # 路由配置
│   ├── (auth)/      # 认证相关路由
│   ├── (errors)/    # 错误页面路由
│   └── _authenticated/  # 需要认证的路由
│       ├── images/  # 图片管理
│       ├── settings/ # 设置
│       └── users/   # 用户管理
├── services/         # API 服务
│   ├── auth.ts      # 认证服务
│   ├── image.ts     # 图片服务
│   └── qiniu.ts     # 七牛云服务
├── stores/          # 状态管理
│   └── authStore.ts # 认证状态
└── types/           # 类型定义
    └── index.d.ts   # 全局类型
```

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: TanStack Router
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **UI 组件**: Radix UI
- **图标**: Lucide Icons
- **工具库**:
  - class-variance-authority
  - clsx
  - tailwind-merge
  - qiniu-js

## 主要功能

1. **认证系统**
   - 登录/注册
   - 权限控制
   - 状态管理

2. **图片管理**
   - 图片上传（支持七牛云）
   - 图片列表
   - 图片预览
   - 图片删除

3. **用户管理**
   - 用户列表
   - 用户详情
   - 用户编辑

4. **系统设置**
   - 个人设置
   - 系统配置

## 开发环境配置

1. 安装依赖：
```bash
yarn install
```

2. 配置环境变量：
```bash
# .env
VITE_API_BASE_URL=http://localhost:3000
VITE_QINIU_ACCESS_KEY=你的七牛云 AccessKey
VITE_QINIU_SECRET_KEY=你的七牛云 SecretKey
VITE_QINIU_BUCKET=你的七牛云存储空间名称
VITE_QINIU_DOMAIN=你的七牛云域名
VITE_QINIU_REGION=z0  # 存储区域，默认华东
```

3. 启动开发服务器：
```bash
yarn dev
```

## 构建部署

```bash
yarn build
```

## 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 使用函数组件和 Hooks
- 采用模块化和组件化的开发方式

## 项目特点

1. **现代化架构**
   - 基于 Vite 的快速开发体验
   - TypeScript 类型安全
   - 模块化的项目结构

2. **优秀的用户体验**
   - 响应式设计
   - 优雅的加载状态
   - 友好的错误提示

3. **开发效率**
   - 组件复用
   - 类型提示
   - 热更新

4. **可维护性**
   - 清晰的目录结构
   - 统一的代码风格
   - 完善的类型定义
