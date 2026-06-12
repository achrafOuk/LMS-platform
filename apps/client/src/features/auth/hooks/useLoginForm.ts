import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { LoginValidator } from '@tanstack-start-hono/validators/auth'

import { orpc } from '#/utils/orpc'

export function useLoginForm() {
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
      await loginMutation.mutateAsync(value)
    },
  })

  return { form, loginMutation }
}
