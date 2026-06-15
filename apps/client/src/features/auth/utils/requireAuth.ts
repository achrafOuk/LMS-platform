import { isRedirect, redirect } from '@tanstack/react-router'

import { orpc } from '#/utils/orpc'

export async function requireAuth() {
  try {
    const me = await orpc.auth.me()
    if (!me.user) {
      throw redirect({ to: '/login' })
    }
    return { user: me.user }
  } catch (error) {
    if (isRedirect(error)) throw error
    throw redirect({ to: '/login' })
  }
}
