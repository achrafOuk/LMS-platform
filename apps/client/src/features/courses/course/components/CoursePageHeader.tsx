import { Button } from "#/features/shared/button/components/Button";
import { useCourseDescription } from "../hooks/useCourseDescription";
import type { Course } from "../types/course.types";
import { CourseCover } from "./CourseCover";

export function CoursePageHeader({
    course,
    lessonCount,
}: {
    course: NonNullable<Course>;
    lessonCount: number;
}) {
    const { displayDescription, canExpand, isOpen, toggle } = useCourseDescription(course.description);

    return (
        <div className="overflow-hidden border border-border bg-card flex flex-col ">
            <div className="aspect-[4/3] bg-muted md:aspect-auto  h-[300px]">
                <CourseCover filename={course.coverUrl ?? ""} title={course.courseName} />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 h-fit">
                <p className="mb-5 text-sm font-semibold bg-primary text-card w-fit px-4 py-1 rounded-full">
                    {course.tag.tagName}
                </p>
                <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl">
                    {course.courseName}
                </h1>
                <section>
                    <p className="mt-6 max-w-prose text-base leading-7 text-pretty text-muted-foreground">
                        {displayDescription}
                    </p>
                    {canExpand ? (
                        <Button
                            variant="outline"
                            onClick={toggle}
                            className="mt-7 flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none"
                        >
                            {isOpen ? "Show Less" : "Show More...."}
                        </Button>
                    ) : null}
                </section>
                <p className="mt-8 text-sm font-medium text-foreground">
                    {course.modules.length} {course.modules.length === 1 ? "module" : "modules"} · {lessonCount}{" "}
                    {lessonCount === 1 ? "lesson" : "lessons"}
                </p>
            </div>
        </div>
    );
}
