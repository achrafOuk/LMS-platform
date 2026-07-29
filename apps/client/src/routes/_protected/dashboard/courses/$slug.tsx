import { fetchMe } from '#/features/auth/server/fetchMe';
import { CoursePage } from '#/features/courses/course/components/CoursePage'
import { useGetCourseBySlug } from '#/features/courses/course/queries/useGetCourseBySlug';
import { useUserIsEnrolledInCourse } from '#/features/courses/course/queries/useUserIsEnrolledInCourse';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/courses/$slug')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const slug = params.slug;
    const [user, _] = await Promise.all([
      fetchMe(),
      context.queryClient.prefetchQuery(useGetCourseBySlug(slug)),
    ]);
    context.queryClient.prefetchQuery(useUserIsEnrolledInCourse(slug, !!user));
  }
})

function RouteComponent() {
  const { slug } = Route.useParams();
  const { data: course } = useSuspenseQuery(useGetCourseBySlug(slug));

  return (
    <CoursePage course={course} />
  )
}
