import type { AnyFieldApi, AnyFormApi } from '@tanstack/react-form'

export function getFieldErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }

  return 'Invalid value'
}

type FieldErrorsProps = {
  field: AnyFieldApi
}

export function FieldErrors({ field }: FieldErrorsProps) {
  const errors = field.state.meta.errors

  if (errors.length === 0) {
    return null
  }

  const errorId = `${field.name}-error`

  return (
    <>
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
    </>
  )
}

export function getFieldErrorId(field: AnyFieldApi): string | undefined {
  return field.state.meta.errors.length > 0 ? `${field.name}-error` : undefined
}

type FormValidationErrorItem = {
  fieldName: string
  message: string
}

export function collectFormValidationErrors(
  formApi: AnyFormApi,
): FormValidationErrorItem[] {
  const seen = new Set<string>()
  const items: FormValidationErrorItem[] = []

  const add = (fieldName: string, message: string) => {
    const key = `${fieldName}:${message}`
    if (seen.has(key)) {
      return
    }

    seen.add(key)
    items.push({ fieldName, message })
  }

  const { fieldMeta, errorMap, errors } = formApi.state

  for (const [fieldName, meta] of Object.entries(fieldMeta)) {
    for (const error of meta?.errors ?? []) {
      add(fieldName, getFieldErrorMessage(error))
    }
  }

  const onSubmitErrors = errorMap.onSubmit
  if (
    onSubmitErrors &&
    typeof onSubmitErrors === 'object' &&
    !Array.isArray(onSubmitErrors)
  ) {
    for (const [fieldName, issues] of Object.entries(onSubmitErrors)) {
      if (!Array.isArray(issues)) {
        continue
      }

      for (const issue of issues) {
        add(fieldName, getFieldErrorMessage(issue))
      }
    }
  } else if (onSubmitErrors) {
    add('form', getFieldErrorMessage(onSubmitErrors))
  }

  for (const error of errors) {
    add('form', getFieldErrorMessage(error))
  }

  return items
}

type FormErrorsSummaryProps = {
  form: AnyFormApi
}

export function FormErrorsSummary({ form }: FormErrorsSummaryProps) {
  return (
    <form.Subscribe
      selector={(state) => ({
        submissionAttempts: state.submissionAttempts,
        fieldMeta: state.fieldMeta,
        errorMap: state.errorMap,
        errors: state.errors,
      })}
    >
      {({ submissionAttempts }) => {
        if (submissionAttempts === 0) {
          return null
        }

        const validationErrors = collectFormValidationErrors(form)

        if (validationErrors.length === 0) {
          return null
        }

        return (
          <section
            aria-live="polite"
            className="flex flex-col gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4"
          >
            <h2 className="text-sm font-semibold text-destructive">
              Please fix the following errors
            </h2>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-destructive">
              {validationErrors.map(({ fieldName, message }) => (
                <li key={`${fieldName}:${message}`}>
                  <span className="font-medium text-foreground">{fieldName}</span>
                  {' — '}
                  {message}
                </li>
              ))}
            </ul>
          </section>
        )
      }}
    </form.Subscribe>
  )
}
