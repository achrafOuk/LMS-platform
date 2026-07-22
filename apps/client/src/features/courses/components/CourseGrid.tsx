import { formatCoursePrice } from '../constants/formatCoursePrice'
import type { CourseType } from '../types/Course'
import { courseEnrollLinkClassName } from '../constants/courseStyles'
import { Link } from '@tanstack/react-router'
import { CourseCardRoot } from '../course/components/CourseCard'
import { CourseCover } from '../course/components/CourseCover'
import { Button } from '#/features/shared/button/components/Button'

export function CourseGrid({ courses }: { courses: CourseType[] }) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        { 
          courses.map((course:CourseType) => (
            <CourseCardRoot key={course.slug} className="flex flex-col gap-4 bg-card h-fit "> <CourseCardRoot.header>
                  <CourseCover filename={course.coverUrl ?? ""} title={course.courseName} className="h-[200px] w-full  transition-[transform] duration-300 motion-safe:group-hover:scale-[1.02]" />
              </CourseCardRoot.header>
              <CourseCardRoot.context>
                <Link to={`/courses/$id`} params={{ id: course.slug }} className='text-2xl text-foreground'>
                    {course.courseName}
                </Link>
                <p className='text-sm text-foreground'>{formatCoursePrice(course.price)}</p>
              </CourseCardRoot.context>
              <CourseCardRoot.action>
                  <Button variant='primary'>
                    <Link to='/register'>
                    Enroll Now
                    </Link>
                    </Button>
              </CourseCardRoot.action>
            </CourseCardRoot>

      ))}
    </div>
  )
}
