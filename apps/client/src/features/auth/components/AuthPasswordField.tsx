import { AuthFormField } from './AuthFormField'
import type { AuthFormInstance } from '../hooks/authForm.types'

type AuthPasswordFieldProps = {
  form: AuthFormInstance
  autoComplete?: 'current-password' | 'new-password'
  placeholder?: string
}

export function AuthPasswordField({
  form,
  autoComplete = 'current-password',
  placeholder = 'Enter your password…',
}: AuthPasswordFieldProps) {
  return (
    <form.Field name="password">
      {(field) => (
        <AuthFormField
          field={field}
          label="Password"
          type="password"
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
      )}
    </form.Field>
  )
}
