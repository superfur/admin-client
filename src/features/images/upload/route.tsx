import { createFileRoute } from '@tanstack/react-router'
import { Route as authenticatedRoute } from '../../../_authenticated/route'

export const Route = createFileRoute('/_authenticated/images/upload')({
  parentRoute: authenticatedRoute,
  component: () => import('./upload.lazy').then((mod) => mod.Route),
}) 