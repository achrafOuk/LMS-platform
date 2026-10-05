import { createIsomorphicFn } from '@tanstack/react-start'

import { orpc } from '#/utils/orpc'

import { getSession } from './getSession'

export const fetchMe = createIsomorphicFn()
  .server(() => getSession())
  .client(() => orpc.auth.me())
