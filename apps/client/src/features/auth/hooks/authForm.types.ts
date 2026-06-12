import type { useLoginForm } from './useLoginForm'

export type AuthFormInstance = ReturnType<typeof useLoginForm>['form']
