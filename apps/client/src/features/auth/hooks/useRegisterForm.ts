import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { RegisterValidator } from '@tanstack-start-hono/validators/auth'

import { orpc } from '#/utils/orpc'

export function useRegisterForm() {
  const registerMutation = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      orpc.auth.register(values),
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: RegisterValidator,
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value)
    },
  })

  return { form, registerMutation }
}
