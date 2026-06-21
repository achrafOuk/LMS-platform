import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import {
  courseValidator,
  type CourseValidatorType,
} from '@tanstack-start-hono/validators/course'

import { getRpcErrorMessage } from '#/features/auth/components/AuthFormError'
import { orpc } from '#/utils/orpc'

const defaultValues: CourseValidatorType = {
  title: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  modules: [],
}

export function useNewCourseForm() {
  const createCourseMutation = useMutation({
    mutationFn: async (_values: CourseValidatorType) => {
      throw new Error('Course API not connected yet')
    },
  })

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: courseValidator,
    },
    onSubmit: async ({ value }) => {
      createCourseMutation.reset();
      await orpc.courses.createCourse(value);
    },
    
  })

  const apiErrorMessage = createCourseMutation.isError
    ? getRpcErrorMessage(createCourseMutation.error)
    : null

  return { form, createCourseMutation, apiErrorMessage }
}

export type NewCourseForm = ReturnType<typeof useNewCourseForm>['form']
