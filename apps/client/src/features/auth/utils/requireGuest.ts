import { isRedirect, redirect } from '@tanstack/react-router'

import { orpc } from '#/utils/orpc'

export async function requireGuest() {
  try {
    const me = await orpc.auth.me()
    if (me.user) {
      throw redirect({ to: '/dashboard' })
    }
  } catch (error) {
    if (isRedirect(error)) throw error
  }
}
