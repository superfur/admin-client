import { createLazyFileRoute } from '@tanstack/react-router'
import SignIn from '@/features/auth/sign-in'

export const Route = createLazyFileRoute('/(auth)/signin')({
  component: SignIn,
})
