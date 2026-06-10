import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="font-serif text-3xl font-medium text-foreground">
        Create your account
      </h1>
      <p className="mt-4 text-muted-foreground">
        Registration is coming soon. Start exploring courses in the meantime.
      </p>
    </div>
  )
}
