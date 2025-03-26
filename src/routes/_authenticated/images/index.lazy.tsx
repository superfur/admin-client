import { createLazyFileRoute } from '@tanstack/react-router'
import ImagesPage from '@/features/images'

export const Route = createLazyFileRoute('/_authenticated/images/')({
  component: ImagesPage,
})
