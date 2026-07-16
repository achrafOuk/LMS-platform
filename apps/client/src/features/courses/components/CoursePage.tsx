import { getMediaUrlOptions } from "#/features/media/queries/getMediaUrl";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CourseCover } from "./CoverCourse";
import { ModuleList } from "./ModuleList";
import { formatPrice } from "../utils/formatPrice";

export type Course = Awaited<ReturnType<typeof import("#/utils/orpc").orpc.courses.getCourse>>;

function CoursePageEnroll({ course }: { course: NonNullable<Course> })
{
    return (
        <aside className="border border-border bg-card p-6 lg:sticky lg:top-8">
            <p className="text-sm font-medium text-muted-foreground">Full course access</p>
            <p className="mt-2 font-serif text-4xl font-medium tracking-tight text-foreground">{formatPrice(course.price)}</p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
                Enroll to access every lesson and keep your progress in one place.
            </p>
            <Link
                to="/register"
                className="mt-7 flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none"
            >
                Enroll now
            </Link>
        </aside>
    )
}

export function CoursePageHeader({ course,lessonCount }: { course: NonNullable<Course>,lessonCount: number })
{
    return (
        <div className="grid overflow-hidden border border-border bg-card md:grid-rows-[1.05fr_0.95fr]">
            <div className="aspect-[4/3] bg-muted md:aspect-auto">
                {course.coverUrl ? (
                    <CourseCover filename={course.coverUrl} title={course.courseName} />
                ) : (
                    <div className="flex h-full items-center justify-center px-8 text-center text-sm text-muted-foreground">
                        Course cover coming soon
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10">
                {course.tag?.tagName ? (
                    <p className="mb-5 text-sm font-semibold text-primary">{course.tag.tagName}</p>
                ) : null}
                <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-balance text-foreground sm:text-5xl">
                    {course.courseName}
                </h1>
                {course.description ? (
                    <p className="mt-6 max-w-prose text-base leading-7 text-pretty text-muted-foreground">
                        {course.description}
                    </p>
                ) : null}
                <p className="mt-8 text-sm font-medium text-foreground">
                    {course.modules.length} {course.modules.length === 1 ? "module" : "modules"} · {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                </p>
            </div>
        </div>
    )
}

function CourseDetails({ course }: { course: NonNullable<Course> })
{
    const lessonCount = course.modules.reduce((count, module) => count + module.lessons.length, 0);

    return (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <section className="min-w-0">
                <CoursePageHeader course={course} lessonCount={lessonCount} />  

                <section className="mt-14">
                    <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">Course curriculum</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Explore every module before you enroll.</p>
                        </div>
                    </div>
                    <ModuleList modules={course.modules} />
                </section>
            </section>

            <CoursePageEnroll course={course} />

        </div>
    )

}

export function CoursePage({ course }: { course: NonNullable<Course> }) {

    return (
        <main className="min-h-screen bg-muted/35">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                <div className="mb-8 text-sm">
                    <Link to="/courses" className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                        All courses
                    </Link>
                </div>

                <CourseDetails course={course} />

            </div>
        </main>
    );
}