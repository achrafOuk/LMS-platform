import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { LoginValidator, type LoginValidatorType } from '@tanstack-start-hono/validators/auth'

import { meQueryOptions } from '#/features/auth/hooks/useMe'
import { orpc } from '#/utils/orpc'
import { getRpcErrorMessage } from '../components/AuthFormError'

export function useLoginForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: (values: LoginValidatorType) =>
      orpc.auth.login(values),
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: LoginValidator,
    },
    onSubmit: async ({ value }) => {
      loginMutation.reset()
      const loggedInUser = await loginMutation.mutateAsync(value)
      queryClient.setQueryData(meQueryOptions.queryKey, {
        user: {
          uid: loggedInUser.uid,
          email: loggedInUser.email,
          role: loggedInUser.role,
        },
      })
      await navigate({ to: '/dashboard' })
    },
  })

  const errorMessage = loginMutation.isError
    ? getRpcErrorMessage(loginMutation.error)
    : null

  return { form, loginMutation, errorMessage }
}
