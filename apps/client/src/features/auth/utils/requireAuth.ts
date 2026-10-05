import { isRedirect, redirect } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'

import { meQueryOptions } from '#/features/auth/hooks/useMe'
import { fetchMe } from '#/features/auth/server/fetchMe'

type RequireAuthContext = {
  queryClient: QueryClient
}

export async function requireAuth({ context }: { context: RequireAuthContext }) {
  try {
    const cached = context.queryClient.getQueryData(meQueryOptions.queryKey)
    if (cached?.user) {
      return { user: cached.user }
    }

    const me = await fetchMe()

    if (!me?.user) {
      throw redirect({ to: '/login' })
    }

    context.queryClient.setQueryData(meQueryOptions.queryKey, me)

    return { user: me.user }
  } catch (error) {
    if (isRedirect(error)) throw error
    throw redirect({ to: '/login' })
  }
}

