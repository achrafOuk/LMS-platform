import { getMediaUrlOptions } from "#/features/media/queries/getMediaUrl";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

type Course = Awaited<ReturnType<typeof import("#/utils/orpc").orpc.courses.getCourse>>;

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
});

function CourseCover({ filename, title }: { filename: string; title: string }) {
    const { data } = useSuspenseQuery(getMediaUrlOptions(filename));

    return (
        <img
            src={data.url}
            alt={`Cover image for ${title}`}
            className="h-full w-full "
        />
    );
}

function formatPrice(price: number) {
    return price === 0 ? "Free" : currencyFormatter.format(price);
}

function LessonList({ lessons }: { lessons: NonNullable<Course>["modules"][number]["lessons"] }) {
    return (
        <ol className="divide-y divide-border">
            {lessons.map((lesson, index) => (
                <li key={lesson.leid} className="flex items-center gap-4 py-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                        {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{lesson.title}</span>
                </li>
            ))}
        </ol>
    );
}


export function ModuleList({ modules }: { modules: NonNullable<Course>["modules"] }) {
    return (
        <div className="divide-y divide-border border-y border-border">
            {modules.map((module, index) => (
                <details key={module.mhid} className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-base font-semibold text-foreground">{module.title}</span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                                {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}
                            </span>
                        </span>
                        <span
                            aria-hidden="true"
                            className="text-xl leading-none text-muted-foreground transition-transform duration-200 motion-reduce:transition-none group-open:rotate-45"
                        >
                            +
                        </span>
                    </summary>
                    <div className="pb-2 pl-0 sm:pl-13">
                        <LessonList lessons={module.lessons} />
                    </div>
                </details>
            ))}
        </div>
    );
}

export function CoursePage({ course }: { course: NonNullable<Course> }) {
    const lessonCount = course.modules.reduce((count, module) => count + module.lessons.length, 0);

    return (
        <main className="min-h-screen bg-muted/35">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                <div className="mb-8 text-sm">
                    <Link to="/courses" className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                        All courses
                    </Link>
                </div>

                {/* <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start"> */}
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
                    <section className="min-w-0">
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
                </div>
            </div>
        </main>
    );
}