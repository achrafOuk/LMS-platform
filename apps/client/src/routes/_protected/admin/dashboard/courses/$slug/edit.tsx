import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import {
  adminFrameClassName,
  adminSecondaryLinkClassName,
} from '#/features/admin/constants/adminStyles'
import { featuredCourses } from '#/features/courses/constants/featuredCourses'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute(
  '/_protected/admin/dashboard/courses/$slug/edit',
)({
  loader: ({ params }) => {
    const course = featuredCourses.find((item) => item.slug === params.slug)

    if (!course) {
      throw new Error('Course not found')
    }

    return { course }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { course } = Route.useLoaderData()

  return (
    <section className="flex flex-col gap-6">
      <Link
        to="/admin/dashboard/courses"
        className={adminSecondaryLinkClassName}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to courses
      </Link>

      <AdminPageHeader title={`Edit ${course.title}`} />

      <div className={`${adminFrameClassName} px-6 py-8`}>
        <p className="text-sm text-muted-foreground">
          Course editing form will go here. Slug:{' '}
          <span className="font-mono text-foreground">{course.slug}</span>
        </p>
      </div>
    </section>
  )
}
