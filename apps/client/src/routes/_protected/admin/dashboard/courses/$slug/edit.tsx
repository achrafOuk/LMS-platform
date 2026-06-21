import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import { CourseFormFields } from '#/features/admin/components/course/CourseFormFields'
import { FormErrorsSummary } from '#/features/admin/components/course/FormFieldErrors'
import {
  adminActionButtonClassName,
  adminFrameClassName,
  adminPrimaryActionClassName,
  adminSecondaryLinkClassName,
} from '#/features/admin/constants/adminStyles'
import { useEditCourseForm } from '#/features/admin/hooks/useEditCourseForm'
import type { CourseFormApi } from '#/features/admin/types/courseForm'
import { useCourseOptions } from '#/features/courses/hooks/useCourse'

export const Route = createFileRoute(
  '/_protected/admin/dashboard/courses/$slug/edit',
)({
  loader: async ({ params, context }) => {
    await context.queryClient.prefetchQuery(useCourseOptions(params.slug))
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const { data: course } = useSuspenseQuery(useCourseOptions(slug))
  const { form, updateCourseMutation } = useEditCourseForm(course)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await form.handleSubmit()
    } catch (error) {
      console.error(error)
    }
  }

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

      <form
        onSubmit={handleSubmit}
        className={`${adminFrameClassName} flex flex-col gap-6 rounded-xl p-6`}
        noValidate
      >
        <FormErrorsSummary form={form} />
        <CourseFormFields form={form as unknown as CourseFormApi} />

        <div className="flex flex-row justify-end gap-2">
          <button
            type="submit"
            disabled={updateCourseMutation.isPending}
            className={adminPrimaryActionClassName}
          >
            {updateCourseMutation.isPending ? 'Saving…' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => form.reset()}
            className={adminActionButtonClassName}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
