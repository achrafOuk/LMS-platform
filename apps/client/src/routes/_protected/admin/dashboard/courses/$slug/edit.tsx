import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import {
  adminFrameClassName,
  adminSecondaryLinkClassName,
} from '#/features/admin/constants/adminStyles'
import {  useCourseOptions } from '#/features/courses/hooks/useCourse'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute(
  '/_protected/admin/dashboard/courses/$slug/edit',
)({
  loader: async ({ params ,context}) => {
    await context.queryClient.prefetchQuery(useCourseOptions(params.slug));
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams();
  const { data: course } = useSuspenseQuery(useCourseOptions(slug));

  console.log(course);
  return (
    <section className="flex flex-col gap-6">
      <Link
        to="/admin/dashboard/courses"
        className={adminSecondaryLinkClassName}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to courses
      </Link>

      <AdminPageHeader title={`Edit ${course.slug}`} />

      <div className={`${adminFrameClassName} px-6 py-8`}>
        <p className="text-sm text-muted-foreground">
          Course editing form will go here. Slug:{' '}
          <span className="font-mono text-foreground">{course.slug}</span>
        </p>
      </div>
    </section>
  )
}
