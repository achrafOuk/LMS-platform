import { Link } from '@tanstack/react-router'
import type { CourseType } from '../types/Course'
import {
  courseCardClassName,
  courseTitleLinkClassName,
} from '../constants/courseStyles'

export function CourseCard({ course, children }: { course: CourseType, children: React.ReactNode }) {
  return (
    <article className={courseCardClassName}>
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={course.image}
          alt={`${course.title} — ${course.category}`}
          width={course.imageWidth}
          height={course.imageHeight}
          loading="lazy"
          className="h-full w-full object-cover transition-[transform] duration-300 motion-safe:group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-muted-foreground">{course.category}</p>

        <h3 className="min-w-0">
          <Link to="/courses" className={courseTitleLinkClassName}>
            {course.title}
          </Link>
        </h3>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {course.description}
        </p>
        {children}
      </div>
    </article>
  )
}
