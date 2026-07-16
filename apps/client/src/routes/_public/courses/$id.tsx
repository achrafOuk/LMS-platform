import { CoursePage } from '#/features/courses/components/CoursePage';
import { useGetCourseBySlug } from '#/features/courses/quries/useGetCourseBySlug';
import { orpc } from '#/utils/orpc';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/courses/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    context.queryClient.prefetchQuery(useGetCourseBySlug(params.id));
  }
})

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: course } = useSuspenseQuery(useGetCourseBySlug(id));

  console.log(course);

  // return <div>Hello "/_public/courses/$id" {id}!</div>
  return (
    <CoursePage course={course} />
  )
}
