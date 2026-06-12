import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { LoginValidator } from '@tanstack-start-hono/validators/auth'

import { orpc } from '#/utils/orpc'
import { getRpcErrorMessage } from '../components/AuthFormError'

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
      loginMutation.reset()
      const result = await loginMutation.mutateAsync(value)
      console.log(result)
      
    },
  })

  const errorMessage = loginMutation.isError
    ? getRpcErrorMessage(loginMutation.error)
    : null

  return { form, loginMutation, errorMessage }
}
