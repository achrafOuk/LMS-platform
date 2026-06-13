import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { AppRouter } from '@tanstack-start-hono/server/routes/orpc.route'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

const getForwardHeaders = createIsomorphicFn()
  .server(() => {
    const headers = getRequestHeaders()
    const cookie = headers.get('cookie') ?? ''
    return cookie ? { cookie } : {}
  })
  .client(() => ({}))

const link = new RPCLink({
  url: import.meta.env.VITE_RPC_URL ?? 'http://localhost:3002/rpc',
  headers: getForwardHeaders(),
  fetch: (request, init) =>
    globalThis.fetch(request, {
      ...init,
      credentials: 'include',
    }),
})

export const orpc: RouterClient<AppRouter> = createORPCClient(link)
