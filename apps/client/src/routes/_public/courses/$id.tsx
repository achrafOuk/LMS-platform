import { CoursePage } from '#/features/courses/components/CoursePage';
import { useGetCourseBySlug } from '#/features/courses/quries/useGetCourseBySlug';
import { orpc } from '#/utils/orpc';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/courses/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.prefetchQuery(useGetCourseBySlug(params.id));
  }
})

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: course } = useSuspenseQuery(useGetCourseBySlug(id));

  return (
    <CoursePage course={course} />
  )
}
