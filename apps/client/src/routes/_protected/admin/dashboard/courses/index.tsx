import { AdminCoursesTable } from '#/features/courses/components/AdminCoursesTable'
import { featuredCourses } from '#/features/courses/constants/featuredCourses'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/dashboard/courses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdminCoursesTable initialCourses={featuredCourses} />
}
