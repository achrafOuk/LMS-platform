import { redirect } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { requireAuth } from './requireAuth'

type RequireAdminContext = {
  queryClient: QueryClient
}

export async function requireAdmin({ context }: { context: RequireAdminContext }) {
  const user = await requireAuth({ context })
  if (user.user.role !== 'ADMIN') {
    throw redirect({ to: '/dashboard' })
  }
  return user
}
