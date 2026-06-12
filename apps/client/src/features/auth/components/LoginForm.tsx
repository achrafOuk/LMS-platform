import { loginContent } from '../constants/authContent'
import { AuthEmailField } from './AuthEmailField'
import { AuthForm } from './AuthForm'
import { AuthFormError, getMutationErrorMessage } from './AuthFormError'
import { AuthFormShell } from './AuthFormShell'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthSubmitButton } from './AuthSubmitButton'
import { useLoginForm } from '../hooks/useLoginForm'

export function LoginForm() {
  const { form, loginMutation } = useLoginForm()

  return (
    <AuthFormShell content={loginContent}>
      <AuthForm form={form}>
        <AuthEmailField form={form} />
        <AuthPasswordField form={form} />

        {loginMutation.isError ? (
          <AuthFormError message={getMutationErrorMessage(loginMutation.error)} />
        ) : null}

        <AuthSubmitButton
          isPending={loginMutation.isPending}
          label={loginContent.submitLabel}
          pendingLabel={loginContent.pendingLabel}
        />
      </AuthForm>
    </AuthFormShell>
  )
}
