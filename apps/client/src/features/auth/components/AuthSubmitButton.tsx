import { authPrimaryButtonClassName } from '../constants/authStyles'

type AuthSubmitButtonProps = {
  isPending: boolean
  label: string
  pendingLabel: string
}

export function AuthSubmitButton({
  isPending,
  label,
  pendingLabel,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={authPrimaryButtonClassName}
    >
      {isPending ? pendingLabel : label}
    </button>
  )
}
