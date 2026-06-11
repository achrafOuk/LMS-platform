import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { AppRouter } from '@tanstack-start-hono/server/routes/orpc.route'

const link = new RPCLink({
  url: import.meta.env.VITE_RPC_URL ?? 'http://localhost:3002/rpc',
  fetch: (request, init) =>
    globalThis.fetch(request, {
      ...init,
      credentials: 'include',
    }),
})

export const orpc: RouterClient<AppRouter> = createORPCClient(link)
