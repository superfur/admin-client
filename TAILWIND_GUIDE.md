# Tailwind CSS 使用指南

本项目已完全集成 Tailwind CSS，并进行了优化配置。以下是详细的使用指南。

## 🎨 主题系统

### CSS 变量
项目使用 CSS 变量来管理主题，支持明暗两种模式：

```css
/* 明色主题 */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... 更多变量 */
}

/* 暗色主题 */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... 更多变量 */
}
```

### 颜色系统
项目包含完整的颜色系统：

- **基础颜色**: `background`, `foreground`, `card`, `popover`
- **语义颜色**: `primary`, `secondary`, `muted`, `accent`
- **状态颜色**: `destructive`, `success`, `warning`, `info`
- **功能颜色**: `border`, `input`, `ring`
- **图表颜色**: `chart-1` 到 `chart-5`
- **侧边栏颜色**: `sidebar-*` 系列

## 🛠️ 工具函数

### 基础工具
```typescript
import { cn } from '@/lib/utils'

// 合并类名，自动处理冲突
const className = cn('px-4 py-2', 'bg-primary', 'text-white')
```

### 状态颜色工具
```typescript
import { getStatusColor, getStatusBgColor } from '@/lib/utils'

// 获取状态文本颜色
const textColor = getStatusColor('active') // 'text-green-600 dark:text-green-400'

// 获取状态背景颜色
const bgColor = getStatusBgColor('active') // 'bg-green-100 dark:bg-green-900/20'
```

### 常用类名组合
```typescript
import { commonClasses } from '@/lib/tailwind-utils'

// 使用预定义的类名组合
<div className={commonClasses.flexCenter}>居中内容</div>
<div className={commonClasses.card}>卡片样式</div>
<div className={commonClasses.heading1}>主标题</div>
```

## 🎭 动画系统

### 内置动画
项目配置了丰富的动画效果：

```typescript
// 淡入淡出
<div className="animate-fade-in">淡入效果</div>
<div className="animate-fade-out">淡出效果</div>

// 滑动效果
<div className="animate-slide-in-from-top">从顶部滑入</div>
<div className="animate-slide-in-from-bottom">从底部滑入</div>
<div className="animate-slide-in-from-left">从左侧滑入</div>
<div className="animate-slide-in-from-right">从右侧滑入</div>

// 手风琴效果
<div className="animate-accordion-down">展开</div>
<div className="animate-accordion-up">收起</div>
```

### 自定义动画
```css
/* 在 CSS 中定义自定义动画 */
@keyframes custom-animation {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-custom {
  animation: custom-animation 0.3s ease-out;
}
```

## 📱 响应式设计

### 断点系统
```typescript
// 使用响应式类名
<div className="w-full md:w-1/2 lg:w-1/3">
  响应式宽度
</div>

// 使用工具函数
import { createResponsiveClass } from '@/lib/tailwind-utils'

const responsiveClass = createResponsiveClass(
  'w-full',      // 基础
  'w-1/2',       // sm
  'w-1/3',       // md
  'w-1/4'        // lg
)
```

### 响应式工具
```typescript
import { commonClasses } from '@/lib/tailwind-utils'

// 预定义的响应式类名
<div className={commonClasses.responsive.mobile}>仅移动端显示</div>
<div className={commonClasses.responsive.desktop}>仅桌面端显示</div>
```

## 🎨 组件样式

### 状态徽章
```typescript
import { StatusBadge } from '@/components/ui/status-badge'

<StatusBadge status="active">活跃</StatusBadge>
<StatusBadge status="inactive">离线</StatusBadge>
<StatusBadge status="warning">警告</StatusBadge>
```

### 按钮变体
```typescript
import { Button } from '@/components/ui/button'

<Button variant="default">默认按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>
```

## 🎯 最佳实践

### 1. 使用 cn() 函数
```typescript
// ✅ 推荐
const className = cn('base-class', condition && 'conditional-class', props.className)

// ❌ 不推荐
const className = `base-class ${condition ? 'conditional-class' : ''} ${props.className}`
```

### 2. 使用语义化类名
```typescript
// ✅ 推荐 - 使用语义化颜色
<div className="bg-primary text-primary-foreground">主要内容</div>

// ❌ 不推荐 - 使用具体颜色
<div className="bg-blue-500 text-white">主要内容</div>
```

### 3. 组件化样式
```typescript
// ✅ 推荐 - 创建可复用的样式组件
const Card = ({ children, className, ...props }) => (
  <div className={cn(commonClasses.card, className)} {...props}>
    {children}
  </div>
)

// ❌ 不推荐 - 重复写样式
<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
```

### 4. 使用工具函数
```typescript
// ✅ 推荐 - 使用工具函数
const statusClass = getStatusColor(user.status)

// ❌ 不推荐 - 硬编码条件
const statusClass = user.status === 'active' 
  ? 'text-green-600 dark:text-green-400' 
  : 'text-gray-600 dark:text-gray-400'
```

## 🔧 配置说明

### Tailwind 配置
```javascript
// tailwind.config.js
export default {
  darkMode: ['class'], // 使用 class 策略切换主题
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      // 自定义颜色
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... 更多颜色
      },
      // 自定义动画
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // ... 更多动画
      },
    },
  },
  plugins: [tailwindCssAnimate],
}
```

### CSS 变量
```css
/* src/index.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... 明色主题变量 */
  }
  
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... 暗色主题变量 */
  }
}
```

## 📚 参考资源

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [ShadcnUI 组件库](https://ui.shadcn.com/)
- [Radix UI 原语](https://www.radix-ui.com/)
- [Class Variance Authority](https://cva.style/)

## 🚀 性能优化

### 1. 使用 JIT 模式
项目已配置 Tailwind 的 JIT 模式，只生成使用的样式。

### 2. 避免动态类名
```typescript
// ✅ 推荐 - 使用预定义的类名
const statusClasses = {
  active: 'text-green-600',
  inactive: 'text-gray-600',
}

// ❌ 不推荐 - 动态生成类名
const statusClass = `text-${color}-600`
```

### 3. 使用 PurgeCSS
项目已配置 PurgeCSS 来移除未使用的样式。

## 🎨 设计系统

项目遵循 ShadcnUI 设计系统，提供：

- 一致的颜色方案
- 统一的间距系统
- 标准化的组件变体
- 可访问性支持
- 响应式设计

通过遵循这些指南，您可以创建一致、可维护且美观的用户界面。
