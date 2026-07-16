import { queryOptions, type QueryClient } from '@tanstack/react-query'

import { fetchMe } from '#/features/auth/server/fetchMe'

export const meQueryOptions = queryOptions({
  queryKey: ['auth', 'me'],
  queryFn: () => fetchMe(),
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
