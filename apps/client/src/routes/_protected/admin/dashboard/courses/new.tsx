import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import {
  adminFrameClassName,
  adminSecondaryLinkClassName,
} from '#/features/admin/constants/adminStyles'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/_protected/admin/dashboard/courses/new')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <section className="flex flex-col gap-6">
      <Link
        to="/admin/dashboard/courses"
        className={adminSecondaryLinkClassName}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to courses
      </Link>

      <AdminPageHeader title="New Course" />

      <div className={`${adminFrameClassName} px-6 py-8`}>
        <p className="text-sm text-muted-foreground">
          Course creation form will go here.
        </p>
      </div>
    </section>
  )
}
