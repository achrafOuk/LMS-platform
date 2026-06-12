import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { LoginValidator } from '@tanstack-start-hono/validators/auth'

import { orpc } from '#/utils/orpc'
import { getRpcErrorMessage } from '../components/AuthFormError'

export function useLoginForm() {
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
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
      await loginMutation.mutateAsync(value)
      await navigate({ to: '/dashboard' });
    },
  })

  const errorMessage = loginMutation.isError
    ? getRpcErrorMessage(loginMutation.error)
    : null

  return { form, loginMutation, errorMessage }
}
