import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { MainLayout } from '@/components/layout/main-layout'

export const Route = createRootRoute({
  component: () => (
    <>
      <MainLayout />
      <TanStackRouterDevtools />
    </>
  ),
})
