import { queryOptions, type QueryClient } from '@tanstack/react-query'

import { orpc } from '#/utils/orpc'

export const meQueryOptions = queryOptions({
  queryKey: ['auth', 'me'],
  queryFn: () => orpc.auth.me(),
  retry: false,
  staleTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
})

export function clearMeQuery(queryClient: QueryClient) {
  queryClient.removeQueries({ queryKey: meQueryOptions.queryKey })
}

export function useMe() {
  return meQueryOptions
}
