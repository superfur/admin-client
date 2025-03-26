import { createLazyFileRoute } from '@tanstack/react-router'
import ImagesUpload from '@/features/images/upload'

export const Route = createLazyFileRoute('/_authenticated/images/upload')({
  component: ImagesUpload,
})
