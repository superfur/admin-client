// Tailwind CSS 工具函数和配置验证

import { cn } from './utils'

// 验证 Tailwind 类名是否有效
export function validateTailwindClass(className: string): boolean {
  // 这里可以添加更复杂的验证逻辑
  // 目前只是简单的检查是否包含有效的 Tailwind 模式
  const validPatterns = [
    /^(bg|text|border|rounded|p|m|w|h|flex|grid|space|gap|opacity|shadow|transition|transform|animate)-/,
    /^(hover|focus|active|disabled|dark|sm|md|lg|xl|2xl):/,
    /^(top|right|bottom|left|inset)-/,
    /^(z|order|col|row)-/,
  ]
  
  return validPatterns.some(pattern => pattern.test(className))
}

// 常用的 Tailwind 类名组合
export const commonClasses = {
  // 布局
  container: 'container mx-auto px-4',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  flexRow: 'flex flex-row',
  
  // 间距
  sectionPadding: 'py-16 px-4',
  cardPadding: 'p-6',
  buttonPadding: 'px-4 py-2',
  
  // 文本
  heading1: 'text-4xl font-bold tracking-tight',
  heading2: 'text-3xl font-semibold tracking-tight',
  heading3: 'text-2xl font-semibold',
  body: 'text-base leading-7',
  caption: 'text-sm text-muted-foreground',
  
  // 卡片
  card: 'rounded-lg border bg-card text-card-foreground shadow-sm',
  cardHover: 'transition-all duration-200 hover:shadow-md hover:scale-[1.02]',
  
  // 按钮
  button: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  
  // 输入框
  input: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  
  // 动画
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in-from-bottom',
  slideInTop: 'animate-slide-in-from-top',
  slideInLeft: 'animate-slide-in-from-left',
  slideInRight: 'animate-slide-in-from-right',
  
  // 响应式
  responsive: {
    mobile: 'block sm:hidden',
    tablet: 'hidden sm:block md:hidden',
    desktop: 'hidden md:block',
    mobileTablet: 'block md:hidden',
    tabletDesktop: 'hidden sm:block',
  },
  
  // 状态
  loading: 'animate-pulse',
  disabled: 'opacity-50 cursor-not-allowed',
  error: 'border-destructive text-destructive',
  success: 'border-green-500 text-green-600',
  warning: 'border-yellow-500 text-yellow-600',
} as const

// 创建响应式类名
export function createResponsiveClass(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string {
  const classes = [base]
  if (sm) classes.push(`sm:${sm}`)
  if (md) classes.push(`md:${md}`)
  if (lg) classes.push(`lg:${lg}`)
  if (xl) classes.push(`xl:${xl}`)
  return cn(...classes)
}

// 创建状态类名
export function createStateClass(
  base: string,
  states: {
    hover?: string
    focus?: string
    active?: string
    disabled?: string
  }
): string {
  const classes = [base]
  if (states.hover) classes.push(`hover:${states.hover}`)
  if (states.focus) classes.push(`focus:${states.focus}`)
  if (states.active) classes.push(`active:${states.active}`)
  if (states.disabled) classes.push(`disabled:${states.disabled}`)
  return cn(...classes)
}

// 主题相关类名
export const themeClasses = {
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200',
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-700',
  },
} as const

// 创建主题类名
export function createThemeClass(
  lightClass: string,
  darkClass: string
): string {
  return cn(lightClass, `dark:${darkClass}`)
}

// 验证和优化类名
export function optimizeClasses(...classes: (string | undefined)[]): string {
  const validClasses = classes.filter(Boolean) as string[]
  return cn(...validClasses)
}

// 所有工具函数已在上面单独导出
