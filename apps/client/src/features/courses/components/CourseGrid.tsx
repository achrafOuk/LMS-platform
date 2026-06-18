import { formatCoursePrice } from '../constants/formatCoursePrice'
import type { CourseType } from '../types/Course'
import { CourseCard } from './CourseCard'
import { courseEnrollLinkClassName } from '../constants/courseStyles'
import { Link } from '@tanstack/react-router'

export function CourseGrid({ courses }: { courses: CourseType[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <li key={course.slug} className="min-w-0">
          <CourseCard course={course} >
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold tabular-nums text-foreground">
            {formatCoursePrice(course.price)}
          </p>
          <Link to="/register" className={courseEnrollLinkClassName}>
            Enroll now
          </Link>
        </div>
        </CourseCard>
        </li>
      ))}
    </ul>
  )
}
