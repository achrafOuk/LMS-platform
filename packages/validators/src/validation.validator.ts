import { ZodError } from 'zod'

export type ValidationError = ZodError

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ZodError
}

export function parseValidationError(error: unknown)
{
  console.log('error', error);
  if (error instanceof Error) 
  {
    try {
      return JSON.parse(error.message)
    } catch {
      return null
    }
  }
  return null;
}

export function getValidationErrorMessage(error: unknown): string {

  if (isValidationError(error)) {
    return error.issues.map((issue) => issue.message).join(', ')
  }

  if (error instanceof Error) {
    try {
      const parsedMessage = JSON.parse(error.message);
      if (parsedMessage.code === 'invalid_type') {
        return parsedMessage.message
      }
    } catch {
      return error.message
    }

    return error.message
  }

  return 'An error occurred'
}
