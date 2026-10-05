import { CourseCardRoot } from "../../course/components/CourseCard";
import { CourseCover } from "../../course/components/CourseCover";
import { Button } from "#/features/shared/button/components/Button";
import type { InferRouterOutputs } from "@orpc/server";
import type { AppRouter } from "@tanstack-start-hono/server/routes/orpc.route";
import { Link } from "@tanstack/react-router";

type GetMyEnrollmentsOutput = InferRouterOutputs<AppRouter>['enroll']['getMyEnrollments']

const enrollButtonClassName =
  "text-card! mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transform-none motion-reduce:transition-none";


export function MyCourses({courses}: {courses: GetMyEnrollmentsOutput['data']}) {
    console.log('courses:', courses);
    if (courses.length === 0) {
        return (
            <div>
                <p className="text-2xl font-semibold">Last seen courses</p>
                <p>No courses found, discover courses and enroll in a course now <Link to="/courses" className="text-primary">from here</Link>

                </p>

            </div>

    )}
    return (
        <>
        <p>Last seen courses</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {
                courses.map((course) => (
                <CourseCardRoot key={course.slug} className="flex h-fit flex-col gap-4 bg-card"> <CourseCardRoot.header>
                    <CourseCover filename={course.coverUrl ?? ""} title={course.courseName} className="h-[200px] w-full transition-[transform] duration-300 motion-safe:group-hover:scale-[1.02]" />
                </CourseCardRoot.header>
                <CourseCardRoot.context>
                    <Link to='/dashboard/courses/watch/$slug' params={{ slug: course.slug }}>
                        {course.courseName}
                    </Link>
                </CourseCardRoot.context>
                <CourseCardRoot.action>
                    <Link 
                        to="/dashboard/courses/watch/$slug"
                        params={{ slug: course.slug }}
                        className={enrollButtonClassName}
                    >
                        Continue Learning
                    </Link>

                </CourseCardRoot.action>
                </CourseCardRoot>
                ))
            }
        </div>
        </>
    )
}