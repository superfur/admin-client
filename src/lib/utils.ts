import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Tailwind 工具函数
export function getStatusColor(status: string) {
  const statusMap: Record<string, string> = {
    active: 'text-green-600 dark:text-green-400',
    inactive: 'text-gray-600 dark:text-gray-400',
    pending: 'text-yellow-600 dark:text-yellow-400',
    error: 'text-red-600 dark:text-red-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    info: 'text-blue-600 dark:text-blue-400',
  }
  return statusMap[status] || statusMap.inactive
}

export function getStatusBgColor(status: string) {
  const statusMap: Record<string, string> = {
    active: 'bg-green-100 dark:bg-green-900/20',
    inactive: 'bg-gray-100 dark:bg-gray-900/20',
    pending: 'bg-yellow-100 dark:bg-yellow-900/20',
    error: 'bg-red-100 dark:bg-red-900/20',
    success: 'bg-green-100 dark:bg-green-900/20',
    warning: 'bg-yellow-100 dark:bg-yellow-900/20',
    info: 'bg-blue-100 dark:bg-blue-900/20',
  }
  return statusMap[status] || statusMap.inactive
}

// 响应式断点工具
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// 动画工具类
export const animations = {
  fadeIn: 'animate-fade-in',
  slideIn: 'animate-slide-in-from-bottom',
  slideInTop: 'animate-slide-in-from-top',
  slideInLeft: 'animate-slide-in-from-left',
  slideInRight: 'animate-slide-in-from-right',
} as const

// 间距工具类
export const spacing = {
  xs: 'space-y-1',
  sm: 'space-y-2',
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
} as const

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatBytes(
  bytes: number,
  decimals = 0
) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function formatNumber(
  value: number
) {
  return new Intl.NumberFormat("zh-CN").format(value)
}

export function formatCurrency(
  value: number,
  currency = "CNY"
) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
  }).format(value)
}
