import type { Course } from "../types/course.types";
import { CourseDetails } from "./CourseDetails";

export function CoursePage({ course }: { course: NonNullable<Course> }) {
    return (
        <main className="min-h-screen bg-muted/35">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                <CourseDetails course={course} />
            </div>
        </main>
    );
}
