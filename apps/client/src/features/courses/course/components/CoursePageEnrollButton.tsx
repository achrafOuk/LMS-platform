import { Link } from "@tanstack/react-router";
import { Button } from "#/features/shared/button/components/Button";
import { useCourseEnrollment } from "../hooks/useCourseEnrollment";
import type { Course } from "../types/course.types";

const enrollButtonClassName =
    "text-card! mt-7 flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none";

export function CoursePageEnrollButton({ course }: { course: NonNullable<Course> }) {
    const { isLoggedIn, isEnrolled } = useCourseEnrollment(course.slug);

    if (!isLoggedIn) {
        return (
            <Link to="/register" className={enrollButtonClassName}>
                Logged in to Enroll now
            </Link>
        );
    }

    if (isEnrolled) {
        return (
            <Button variant="primary" className={enrollButtonClassName}>
                Continue Learning
            </Button>
        );
    }

    return (
        <Button variant="primary" className={enrollButtonClassName}>
            Enroll now
        </Button>
    );
}
