import { useMe } from '#/features/auth/hooks/useMe';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
  loader: async ({context}) => {
    await context.queryClient.prefetchQuery(useMe());
  },

})

function DashboardPage() {
  const { data:user } = useSuspenseQuery(useMe());
  

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as {user!.user!.email} {user!.user!.role}
      </p>
    </div>
  )
}
