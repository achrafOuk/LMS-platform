import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import type { RouterClient } from '@orpc/server'
import type { Router } from '@tanstack-start-hono/server/routes/orpc.routes'

const link = new RPCLink({
  url: import.meta.env.VITE_RPC_URL ?? 'http://localhost:3002/rpc',
  fetch: (request, init) =>
    globalThis.fetch(request, {
      ...init,
      credentials: 'include',
    }),
})

export const orpc: RouterClient<Router> = createORPCClient(link)
