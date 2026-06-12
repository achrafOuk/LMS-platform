import { AuthFormField } from './AuthFormField'
import type { AuthFormInstance } from '../hooks/authForm.types'

type AuthEmailFieldProps = {
  form: AuthFormInstance
}

export function AuthEmailField({ form }: AuthEmailFieldProps) {
  return (
    <form.Field name="email">
      {(field) => (
        <AuthFormField
          field={field}
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com…"
          spellCheck={false}
        />
      )}
    </form.Field>
  )
}
