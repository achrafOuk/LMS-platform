import { formatCoursePrice } from '../constants/formatCoursePrice'
import type { CourseType } from '../types/Course'
import { Link } from '@tanstack/react-router'
import { CourseCardRoot } from '../course/components/CourseCard'
import { CourseCover } from '../course/components/CourseCover'
import { Button } from '#/features/shared/button/components/Button'

export function CourseGrid({ courses, linkTo = '/dashboard/courses/$slug' }: { courses: CourseType[], linkTo?: string  }) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        { 
          courses.map((course:CourseType) => (
            <CourseCardRoot key={course.slug} className="flex h-fit flex-col gap-4 bg-card"> <CourseCardRoot.header>
              <CourseCover filename={course.coverUrl ?? ""} title={course.courseName} className="h-[200px] w-full transition-[transform] duration-300 motion-safe:group-hover:scale-[1.02]" />
              </CourseCardRoot.header>
              <CourseCardRoot.context>
                <Link to={linkTo} params={{ slug: course.slug }} className='text-2xl text-foreground' >
                    {course.courseName}
                </Link>
                <p className='text-foreground text-sm'>{formatCoursePrice(course.price)}</p>
              </CourseCardRoot.context>
              <CourseCardRoot.action>
                
                {
                  course.isEnrolled ? (
                    <Button variant='primary'>
                      <Link to={linkTo} params={{ slug: course.slug }}>
                        View Course
                      </Link>
                    </Button>
                  ) : (
                    <Button variant='primary'>
                      <Link to='/register'>
                        Enroll Now
                      </Link>
                    </Button>
                  )
                }
              </CourseCardRoot.action>
            </CourseCardRoot>
      ))}
    </div>
  )
}
