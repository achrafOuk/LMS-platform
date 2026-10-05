import { meQueryOptions, useMe } from '#/features/auth/hooks/useMe';
import { MyCourses } from '#/features/courses/dashboard/components/MyCourses';
import { useGetMyEnrollments } from '#/features/courses/hooks/useGetMyEnrollments';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(useMe());
    const me = context.queryClient.getQueryData(meQueryOptions.queryKey);
    await context.queryClient.prefetchQuery(useGetMyEnrollments(1));
    if (!me?.user) {
      throw redirect({ to: '/login' });
    }
  },
})

function RouteComponent() {
  const { data: me } = useSuspenseQuery(useMe())
  const email = me.user?.email ?? 'there'
  const { data: myEnrollments } = useSuspenseQuery(useGetMyEnrollments(1))

  return (
    <div className="mx-auto w-full p-4 w-[90%] mx-auto w-[90%] mx-auto space-y-4 ">

      <section className="flex flex-col  bg-foreground text-background p-4">
        <p className="text-2xl font-semibold">My Learning Dashboard</p>
        <p>Welcome to your learning journey, {email}</p>
      </section>

      <main className="justify-center">
        <MyCourses courses={myEnrollments.data} />
      </main>
    </div>
  )
}
