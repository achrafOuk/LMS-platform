import type { UpdateCourseValidatorType } from '@tanstack-start-hono/validators/course'

import type { orpc } from '#/utils/orpc'

type CourseFromApi = Awaited<ReturnType<typeof orpc.courses.getCourse>>

export function mapCourseToEditFormValues(
  course: CourseFromApi,
): UpdateCourseValidatorType {
  return {
    slug: course.slug,
    cid: course.cid,
    title: course.courseName,
    description: course.description ?? '',
    price: course.price,
    image: course.coverUrl ?? '',
    category: course.tag.tagName,
    modules: course.modules.map((module) => ({
      title: module.title,
      order: module.order,
      lessions: module.lessons.map((lesson) => ({
        title: lesson.title,
        videoLink: lesson.videoUrl ?? '',
        order: lesson.orderIndex,
      })),
    })),
  }
}
