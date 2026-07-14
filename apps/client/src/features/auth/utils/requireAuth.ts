import { isRedirect, redirect } from '@tanstack/react-router'

import { getSession } from '#/features/auth/server/getSession'

export async function requireAuth() {
  try {
    const me = await getSession()

    if (!me?.user) {
      throw redirect({ to: '/login' })
    }

    return { user: me.user }
  } catch (error) {
    if (isRedirect(error)) throw error
    throw redirect({ to: '/login' })
  }
}

