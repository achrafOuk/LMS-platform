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

export function getMutationErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}
