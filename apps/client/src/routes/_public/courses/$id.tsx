import { fetchMe } from '#/features/auth/server/fetchMe';
import { CoursePage } from '#/features/courses/components/CoursePage';
import { useUserIsEnrolledInCourse } from '#/features/courses/course/quiries/useUserIsEnrolledInCourse';
import { useGetCourseBySlug } from '#/features/courses/quries/useGetCourseBySlug';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/courses/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const slug = params.id;
    const [user, _] = await Promise.all([
      fetchMe(),
      context.queryClient.prefetchQuery(useGetCourseBySlug(slug)),
    ]);
    context.queryClient.prefetchQuery(useUserIsEnrolledInCourse(slug, !!user));
  }
})

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: course } = useSuspenseQuery(useGetCourseBySlug(id));

  return (
    <CoursePage course={course} />
  )
}
