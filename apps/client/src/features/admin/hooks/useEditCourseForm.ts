import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import {
  updateCourseValidator,
  type UpdateCourseValidatorType,
} from '@tanstack-start-hono/validators/course'

import { getRpcErrorMessage } from '#/features/auth/components/AuthFormError'
import { mapCourseToEditFormValues } from '#/features/admin/utils/mapCourseToEditFormValues'
import { orpc } from '#/utils/orpc'
import { useNavigate } from '@tanstack/react-router'

type CourseFromApi = Awaited<ReturnType<typeof orpc.courses.getCourse>>

export function useEditCourseForm(course: CourseFromApi) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const updateCourseMutation = useMutation({
    mutationFn: async (values: UpdateCourseValidatorType) => {
      return orpc.courses.updateCourse(values)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['course', course.slug] }),
        queryClient.invalidateQueries({ queryKey: ['featured-courses'] }),
      ]);
      await navigate({ to: '/admin/dashboard/courses' })

    },
  })

  const form = useForm({
    defaultValues: mapCourseToEditFormValues(course),
    validators: {
      onSubmit: updateCourseValidator,
    },
    onSubmit: async ({ value }) => {
      updateCourseMutation.reset()
      await updateCourseMutation.mutateAsync(value)
    },
  })

  const apiErrorMessage = updateCourseMutation.isError
    ? getRpcErrorMessage(updateCourseMutation.error)
    : null

  return { form, updateCourseMutation, apiErrorMessage }
}

export type EditCourseForm = ReturnType<typeof useEditCourseForm>['form']
