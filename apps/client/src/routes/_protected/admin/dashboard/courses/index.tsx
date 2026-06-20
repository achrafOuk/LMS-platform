import { AdminCoursesTable } from '#/features/courses/components/AdminCoursesTable'
import { featuredCourses } from '#/features/courses/constants/featuredCourses'
import { useGetFeaturedCourses } from '#/features/courses/hooks/useFeaturedCourses';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/dashboard/courses/')({
  component: RouteComponent,
  loader: async ({context}) =>{
    await context.queryClient.prefetchQuery(useGetFeaturedCourses());
  },
})

function RouteComponent() {
  const { data: featuredCourses } = useSuspenseQuery(useGetFeaturedCourses());
  return <AdminCoursesTable initialCourses={featuredCourses } />
}
