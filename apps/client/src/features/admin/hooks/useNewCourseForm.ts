import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import {
  courseValidator,
  type CourseValidatorType,
} from '@tanstack-start-hono/validators/course'

import { getRpcErrorMessage } from '#/features/auth/components/AuthFormError'
import { orpc } from '#/utils/orpc'
import { useNavigate } from '@tanstack/react-router'

const defaultValues: CourseValidatorType = {
  title: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  modules: [],
}

export function useNewCourseForm() {
  const navigate = useNavigate()
  const createCourseMutation = useMutation({
    mutationFn: async (value: CourseValidatorType) => {
      await orpc.courses.createCourse(value);
    },
    onSuccess: async () => {
      await navigate({ to: '/admin/dashboard/courses' })
    }
  })

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: courseValidator,
    },
    onSubmit: async ({ value }) => {
      createCourseMutation.reset();
      await createCourseMutation.mutateAsync(value);
    }
        
  })

  const apiErrorMessage = createCourseMutation.isError
    ? getRpcErrorMessage(createCourseMutation.error)
    : null

  return { form, createCourseMutation, apiErrorMessage }
}

export type NewCourseForm = ReturnType<typeof useNewCourseForm>['form']
