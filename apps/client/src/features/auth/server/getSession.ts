import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { AppRouter } from '@tanstack-start-hono/server/routes/orpc.route'
import { createServerFn } from '@tanstack/react-start'

const RPC_SERVER_URL = 'http://localhost:3002/rpc'

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  const { getRequestHeaders } = await import('@tanstack/react-start/server')
  const headers = getRequestHeaders()
  const cookie = headers.get('cookie') ?? ''

  const link = new RPCLink({
    url: RPC_SERVER_URL,
    headers: cookie ? { cookie } : {},
    fetch: (request, init) =>
      globalThis.fetch(request, {
        ...init,
        credentials: 'include',
      }),
  })

  const orpc: RouterClient<AppRouter> = createORPCClient(link)
  return orpc.auth.me()
})
