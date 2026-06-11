import { Link } from '@tanstack/react-router'
import { useRef, useState, useTransition, type FormEvent } from 'react'

import { cn } from '../../../utils/cn'
import { loginContent } from '../constants/authContent'
import {
  authInputClassName,
  authLabelClassName,
  authPrimaryButtonClassName,
} from '../constants/authStyles'
import { AuthFormField } from './AuthFormField'
import { AuthFormShell } from './AuthFormShell'

type FieldErrors = {
  email?: string
  password?: string
}

function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {}

  if (!email.trim()) {
    errors.email = 'Enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Enter your password.'
  }

  return errors
}

export function LoginForm() {
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
    const errors = validateLoginForm(email, password)

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
      setFormError('Sign in is not connected yet. Connect Better Auth to enable login.')
    })
  }

  const passwordErrorId = fieldErrors.password ? 'login-password-error' : undefined

  return (
    <AuthFormShell
      headingId={loginContent.headingId}
      title={loginContent.title}
      description={loginContent.description}
      alternatePrompt={loginContent.alternatePrompt}
      alternateLinkLabel={loginContent.alternateLinkLabel}
      alternateTo={loginContent.alternateTo}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        noValidate
      >
        <AuthFormField
          id="login-email"
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com…"
          spellCheck={false}
          error={fieldErrors.email}
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="login-password" className={authLabelClassName}>
              Password
            </label>
            <Link
              to="/login"
              className="text-sm font-medium text-primary underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-primary/90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password…"
            aria-invalid={fieldErrors.password ? true : undefined}
            aria-describedby={passwordErrorId}
            className={cn(
              authInputClassName,
              fieldErrors.password &&
                'border-destructive focus-visible:ring-destructive',
            )}
          />
          {fieldErrors.password ? (
            <p id={passwordErrorId} role="alert" className="text-sm text-destructive">
              {fieldErrors.password}
            </p>
          ) : null}
        </div>

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
          {isPending ? loginContent.pendingLabel : loginContent.submitLabel}
        </button>
      </form>
    </AuthFormShell>
  )
}
