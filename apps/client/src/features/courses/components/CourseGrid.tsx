import type { CourseType } from '../types/Course'
import { CourseCard } from './CourseCard'

export function CourseGrid({ courses }: { courses: CourseType[] }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <li key={course.slug} className="min-w-0">
          <CourseCard course={course} />
        </li>
      ))}
    </ul>
  )
}
