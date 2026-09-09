import { CourseCardRoot } from "../../course/components/CourseCard";
import { CourseCover } from "../../course/components/CourseCover";
import { Button } from "#/features/shared/button/components/Button";
import type { InferRouterOutputs } from "@orpc/server";
import type { AppRouter } from "@tanstack-start-hono/server/routes/orpc.route";
import { Link } from "@tanstack/react-router";

type GetMyEnrollmentsOutput = InferRouterOutputs<AppRouter>['enroll']['getMyEnrollments']

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
                <CourseCardRoot key={course.slug} className="flex flex-col gap-4 bg-card h-fit "> <CourseCardRoot.header>
                    <CourseCover filename={course.coverUrl ?? ""} title={course.courseName} className="h-[200px] w-full  transition-[transform] duration-300 motion-safe:group-hover:scale-[1.02]" />
                </CourseCardRoot.header>
                <CourseCardRoot.context>
                        {course.courseName}
                </CourseCardRoot.context>
                <CourseCardRoot.action>
                    <Button variant='primary'>
                        Continue Learning
                    </Button>

                </CourseCardRoot.action>
                </CourseCardRoot>
                ))
            }
        </div>
        </>
    )
}