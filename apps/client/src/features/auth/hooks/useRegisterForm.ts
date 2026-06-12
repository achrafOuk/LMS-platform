import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { RegisterValidator } from '@tanstack-start-hono/validators/auth'

import { orpc } from '#/utils/orpc'
import { getRpcErrorMessage } from '../components/AuthFormError'

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
      registerMutation.reset()
      await registerMutation.mutateAsync(value)
    },
  })

  const errorMessage = registerMutation.isError
    ? getRpcErrorMessage(registerMutation.error)
    : null

  return { form, registerMutation, errorMessage }
}
