import type { ReactNode } from 'react'

import type { AuthFormInstance } from '../hooks/authForm.types'

type AuthFormProps = {
  form: AuthFormInstance
  children: ReactNode
}

export function AuthForm({ form, children }: AuthFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
      className="flex flex-col gap-5"
      noValidate
    >
      {children}
    </form>
  )
}
