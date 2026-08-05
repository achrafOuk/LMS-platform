import type { Course } from "../types/course.types";
import { getLessonCount } from "../utils/getLessonCount";
import { CoursePageEnroll } from "./CoursePageEnroll";
import { CoursePageHeader } from "./CoursePageHeader";
import { ModuleList } from "./ModuleList";

export function CourseDetails({ course }: { course: NonNullable<Course> }) {
    const lessonCount = getLessonCount(course);

    return (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start h-fit">
            <section className="min-w-0">
                <CoursePageHeader course={course} lessonCount={lessonCount} />
                <section className="mt-14">
                    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">
                                Course curriculum
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Explore every module before you enroll.
                            </p>
                        </div>
                    </div>
                    <ModuleList modules={course.modules} />
                </section>
            </section>
            <CoursePageEnroll course={course} />
        </div>
    );
}
