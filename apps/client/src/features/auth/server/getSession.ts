import { createServerFn } from '@tanstack/react-start'

import { orpc } from '#/utils/orpc'

export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  return orpc.auth.me()
})
