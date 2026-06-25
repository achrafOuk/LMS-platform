import { createFileRoute } from '@tanstack/react-router'

import { CourseFormFields } from '#/features/admin/components/course/CourseFormFields'
import { FormErrorsSummary } from '#/features/admin/components/course/FormFieldErrors'
import {
  adminActionButtonClassName,
  adminFrameClassName,
  adminPrimaryActionClassName,
} from '#/features/admin/constants/adminStyles'
import { useNewCourseForm } from '#/features/admin/hooks/useNewCourseForm'

export const Route = createFileRoute('/_protected/admin/dashboard/courses/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const { form, createCourseMutation, apiErrorMessage} = useNewCourseForm()
  console.log(apiErrorMessage)

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
      <h1 className="text-2xl font-bold text-balance">Add New Course</h1>

      <form
        onSubmit={handleSubmit}
        className={`${adminFrameClassName} flex flex-col gap-6 rounded-xl p-6`}
        noValidate
      >
        <FormErrorsSummary form={form} />
        {apiErrorMessage ? (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            {apiErrorMessage}
          </p>
        ) : null}
        <CourseFormFields form={form} />

        <div className="flex flex-row justify-end gap-2">
          <button
            type="submit"
            disabled={createCourseMutation.isPending}
            className={adminPrimaryActionClassName}
          >
            {createCourseMutation.isPending ? 'Creating…' : 'Create Course'}
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
