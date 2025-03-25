import { createLazyFileRoute } from '@tanstack/react-router'
import SignIn2 from '@/features/auth/sign-in/sign-in-2'

export const Route = createLazyFileRoute('/(auth)/signin')({
  component: SignIn2,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: search.redirect as string | undefined,
    }
  },
})
