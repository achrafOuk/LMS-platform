import { isRedirect, redirect } from '@tanstack/react-router'

import { getSession } from '#/features/auth/server/getSession'

export async function requireGuest() {
  try {
    const me = await getSession()

    if (me?.user) {
      throw redirect({ to: '/dashboard' })
    }
  } catch (error) {
    if (isRedirect(error)) throw error
  }
}
