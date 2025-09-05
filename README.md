# 后台管理系统

基于现代技术栈构建的后台管理系统，提供用户管理、系统设置等功能。

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite
- **路由**: TanStack Router
- **UI组件**: ShadcnUI (TailwindCSS + RadixUI)
- **状态管理**: Zustand
- **数据获取**: TanStack Query
- **类型检查**: TypeScript
- **代码规范**: ESLint + Prettier
- **图标**: Tabler Icons

## 功能特性

- 🎨 现代化UI设计，支持暗色模式
- 📱 响应式设计，支持移动端
- 🔐 完整的认证系统
- 👥 用户管理功能
- ⚙️ 系统设置配置
- 🚀 基于Vite的快速开发体验
- 📦 组件化开发架构
- 🔒 TypeScript类型安全

## 项目结构

```
src/
├── components/          # 组件
│   ├── ui/             # 基础UI组件
│   └── layout/         # 布局组件
├── routes/             # 路由页面
├── stores/             # 状态管理
├── lib/                # 工具函数
├── hooks/              # 自定义Hooks
├── types/              # 类型定义
└── utils/              # 工具函数
```

## 开发指南

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

### 代码格式化

```bash
pnpm format
```

## 页面说明

- `/` - 仪表盘首页
- `/users` - 用户管理
- `/settings` - 系统设置
- `/login` - 登录页面

## 开发规范

### 组件命名

- 组件文件使用 PascalCase
- 组件名与文件名保持一致
- 基础组件使用 `Base` 前缀
- 布局组件放在 `layout` 目录

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 组件使用函数式组件 + Hooks

### 样式规范

- 使用 TailwindCSS 进行样式开发
- 遵循 ShadcnUI 设计系统
- 支持暗色模式
- 响应式设计优先

## 部署

项目已配置 GitHub Actions 自动部署，推送到 main 分支即可自动部署到服务器。

## 许可证

MIT License