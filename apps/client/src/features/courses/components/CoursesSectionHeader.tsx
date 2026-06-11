import { Link } from '@tanstack/react-router'
import {
  FEATURED_COURSES_HEADING_ID,
  featuredCoursesSubheading,
  viewAllCoursesLabel,
} from '../constants/featuredCourses'
import { courseViewAllLinkClassName } from '../constants/courseStyles'

export function CoursesSectionHeader() {
  return (
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
      <h2
        id={FEATURED_COURSES_HEADING_ID}
        className="text-balance font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground"
      >
        Featured courses
      </h2>
      <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {featuredCoursesSubheading}
      </p>
      <Link to="/courses" className={courseViewAllLinkClassName}>
        {viewAllCoursesLabel}
      </Link>
    </header>
  )
}
