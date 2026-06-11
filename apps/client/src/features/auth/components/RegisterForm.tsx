import { useRef, useState, useTransition, type FormEvent } from 'react'

import { registerContent } from '../constants/authContent'
import { authPrimaryButtonClassName } from '../constants/authStyles'
import { AuthFormField } from './AuthFormField'
import { AuthFormShell } from './AuthFormShell'

type FieldErrors = {
  email?: string
  password?: string
}

function validateRegisterForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {}

  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Create a password to continue.'
  } else if (password.length < 8) {
    errors.password = 'Use at least 8 characters for your password.'
  }

  return errors
}

export function RegisterForm() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')
    const errors = validateRegisterForm(email, password)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      const firstErrorField = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      )
      firstErrorField?.focus()
      return
    }

    setFieldErrors({})

    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setFormError(
        'Registration is not connected yet. Connect Better Auth to enable sign up.',
      )
    })
  }

  return (
    <AuthFormShell
      headingId={registerContent.headingId}
      title={registerContent.title}
      description={registerContent.description}
      alternatePrompt={registerContent.alternatePrompt}
      alternateLinkLabel={registerContent.alternateLinkLabel}
      alternateTo={registerContent.alternateTo}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        noValidate
      >
        <AuthFormField
          id="register-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com…"
          spellCheck={false}
          error={fieldErrors.email}
        />

        <AuthFormField
          id="register-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters…"
          error={fieldErrors.password}
        />

        {formError ? (
          <p role="alert" aria-live="polite" className="text-sm text-destructive">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className={authPrimaryButtonClassName}
        >
          {isPending ? registerContent.pendingLabel : registerContent.submitLabel}
        </button>
      </form>
    </AuthFormShell>
  )
}
