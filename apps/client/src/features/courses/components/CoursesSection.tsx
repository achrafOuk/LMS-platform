import { useSuspenseQuery } from '@tanstack/react-query';
import { featuredCourses, FEATURED_COURSES_HEADING_ID } from '../constants/featuredCourses'
import { CourseGrid } from './CourseGrid'
import { CoursesSectionHeader } from './CoursesSectionHeader'
import { useFeaturedCourses } from '#/routes/_public/index';
import { CourseCardRoot } from '../course/components/CourseCard';
import { formatCoursePrice } from '../constants/formatCoursePrice';
import { CourseCover } from '../course/components/CourseCover';


export function CoursesSection() {

  const {data: featuredCourses} = useSuspenseQuery(useFeaturedCourses());

  return (
    <section
      aria-labelledby={FEATURED_COURSES_HEADING_ID}
      className="py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:px-8">
        <CoursesSectionHeader />
        <CourseGrid courses={featuredCourses.data}  linkTo={'/courses/$slug'}/>
      
      </div>
    </section>
  )
}
