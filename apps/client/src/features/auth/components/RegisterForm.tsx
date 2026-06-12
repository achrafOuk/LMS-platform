import { registerContent } from '../constants/authContent'
import { AuthEmailField } from './AuthEmailField'
import { AuthForm } from './AuthForm'
import { AuthFormError } from './AuthFormError'
import { AuthFormShell } from './AuthFormShell'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthSubmitButton } from './AuthSubmitButton'
import { useRegisterForm } from '../hooks/useRegisterForm'

export function RegisterForm() {
  const { form, registerMutation, errorMessage } = useRegisterForm()

  return (
    <AuthFormShell content={registerContent}>
      <AuthForm form={form}>
        <AuthEmailField form={form} />
        <AuthPasswordField
          form={form}
          autoComplete="new-password"
          placeholder="At least 8 characters…"
        />

        {errorMessage ? <AuthFormError message={errorMessage} /> : null}

        <AuthSubmitButton
          isPending={registerMutation.isPending}
          label={registerContent.submitLabel}
          pendingLabel={registerContent.pendingLabel}
        />
      </AuthForm>
    </AuthFormShell>
  )
}
