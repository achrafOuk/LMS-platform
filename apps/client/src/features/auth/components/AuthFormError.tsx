import { ORPCError } from '@orpc/client'

type AuthFormErrorProps = {
  message: string
}

export function AuthFormError({ message }: AuthFormErrorProps) {
  return (
    <p role="alert" aria-live="polite" className="text-sm text-destructive">
      {message}
    </p>
  )
}

export function getRpcErrorMessage(error: unknown): string {
  if (error instanceof ORPCError) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}
