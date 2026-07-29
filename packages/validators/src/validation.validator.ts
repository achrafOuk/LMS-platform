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
    const message = error.message.substring(1, error.message.length - 1)
    const parsedMessage = JSON.parse(message);
    return parsedMessage;
  }
  return null;
}

export function getValidationErrorMessage(error: unknown): string {

  if (isValidationError(error)) {
    return error.issues.map((issue) => issue.message).join(', ')
  }

  if (error instanceof Error) {
    const parsedMessage = JSON.parse(error.message.substring(1, error.message.length - 1));
    if (parsedMessage.code === 'invalid_type') 
    {
      return parsedMessage.message 
    }
    // console.log('error message:',  JSON.parse(error.message.substring(1, error.message.length - 1)));
    return error.message
  }

  return 'An error occurred'
}
