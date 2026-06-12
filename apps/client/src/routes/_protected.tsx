import { createFileRoute, redirect } from '@tanstack/react-router'

import { orpc } from '#/utils/orpc'
import { useQuery } from '@tanstack/react-query'
import { useMe } from '#/features/auth/hooks/useMe';

export const Route = createFileRoute('/_protected')({
  beforeLoad: async () => {
    try {
      const { data:user, isLoading, isError } = useMe();       
      if (!isLoading && isError) {
        throw redirect({ to: '/login' })
      }
      return { user };
    } catch {
      throw redirect({ to: '/login' })
    }
  },
})
