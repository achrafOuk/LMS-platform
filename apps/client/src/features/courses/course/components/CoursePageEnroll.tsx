import { formatPrice } from "../utils/formatPrice";
import type { Course } from "../types/course.types";
import { CoursePageEnrollButton } from "./CoursePageEnrollButton";

export function CoursePageEnroll({ course }: { course: NonNullable<Course> }) {
    console.log('course:', course);
    return (
        <aside className="border border-border bg-card p-6 lg:sticky lg:top-8">
            <p className="text-sm font-medium text-muted-foreground">Full course access</p>
            <p className="mt-2 font-serif text-4xl font-medium tracking-tight text-foreground">
                {formatPrice(course.price)}
            </p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Enroll to access every lesson and keep your progress in one place.
            </p>
            <CoursePageEnrollButton course={course} />
        </aside>
    );
}
