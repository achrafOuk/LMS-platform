import { meQueryOptions, useMe } from '#/features/auth/hooks/useMe';
import { MyCourses } from '#/features/courses/dashboard/components/MyCourses';
import { useGetFeaturedCourses } from '#/features/courses/hooks/useFeaturedCourses';
import { useGetMyCourses } from '#/features/courses/hooks/useGetMyCourses';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(useMe());
    const me = context.queryClient.getQueryData(meQueryOptions.queryKey);
    // await context.queryClient.prefetchQuery(useGetFeaturedCourses(1));
    await context.queryClient.prefetchQuery(useGetMyCourses(1));
    if (!me?.user) {
      throw redirect({ to: '/login' });
    }
  },
})

function DashboardPage() {
  const { data: me } = useSuspenseQuery(useMe())
  const email = me.user?.email ?? 'there'
  const { data: featuredCourses } = useSuspenseQuery(useGetMyCourses(1))

  return (
    <div className="mx-auto w-full p-4 w-[90%] mx-auto w-[90%] mx-auto space-y-4 ">

      <section className="flex flex-col  bg-foreground text-background p-4">
        <p className="text-2xl font-semibold">My Learning Dashboard</p>
        <p>Welcome to your learning journey, {email}</p>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MyCourses courses={featuredCourses.data} />
      </main>
    </div>
  )
}
