import type { AnyFieldApi } from '@tanstack/react-form'

import { cn } from '../../../utils/cn'
import { authInputClassName, authLabelClassName } from '../constants/authStyles'

type AuthFormFieldProps = {
  field: AnyFieldApi
  label: string
  type?: 'email' | 'password' | 'text'
  autoComplete: string
  placeholder: string
  spellCheck?: boolean
}

function getFieldErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'Invalid value'
}

export function AuthFormField({
  field,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  spellCheck,
}: AuthFormFieldProps) {
  const errors = field.state.meta.errors
  const hasError = errors.length > 0
  const errorId = hasError ? `${field.name}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name} className={authLabelClassName}>
        {label}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value}
        onChange={(event) => field.handleChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        spellCheck={spellCheck}
        aria-invalid={hasError ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          authInputClassName,
          hasError && 'border-destructive focus-visible:ring-destructive',
        )}
      />
      {errors.map((error, index) => (
        <p
          key={`${field.name}-error-${index}`}
          id={index === 0 ? errorId : undefined}
          role="alert"
          className="text-sm text-destructive"
        >
          {getFieldErrorMessage(error)}
        </p>
      ))}
    </div>
  )
}
