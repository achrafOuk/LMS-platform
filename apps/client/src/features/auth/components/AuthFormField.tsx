import { cn } from '../../../utils/cn'
import { authInputClassName, authLabelClassName } from '../constants/authStyles'

type AuthFormFieldProps = {
  id: string
  label: string
  name: string
  type?: 'email' | 'password' | 'text'
  autoComplete: string
  placeholder: string
  spellCheck?: boolean
  error?: string
}

export function AuthFormField({
  id,
  label,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  spellCheck,
  error,
}: AuthFormFieldProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={authLabelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        spellCheck={spellCheck}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={cn(
          authInputClassName,
          error && 'border-destructive focus-visible:ring-destructive',
        )}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
