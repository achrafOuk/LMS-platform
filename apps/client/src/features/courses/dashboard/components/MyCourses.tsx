import { CourseCardRoot } from "../../course/components/CourseCard";
import { CourseCover } from "../../course/components/CourseCover";
import type { CourseType } from "../../types/Course";
import { Button } from "#/features/shared/button/components/Button";
import type { InferRouterOutputs } from "@orpc/server";
import type { AppRouter } from "@tanstack-start-hono/server/routes/orpc.route";

type GetMyCoursesOutput = InferRouterOutputs<AppRouter>['courses']['getMyCourses']

export function MyCourses({courses}: {courses: GetMyCoursesOutput['data']}) {
    console.log('courses:', courses);
    return (
        <>
        {
            courses.map((course) => (
            <CourseCardRoot key={course.slug} className="flex flex-col gap-4 bg-card h-fit "> <CourseCardRoot.header>
                  <CourseCover filename={course.coverUrl ?? ""} title={course.courseName} className="h-[200px] w-full  transition-[transform] duration-300 motion-safe:group-hover:scale-[1.02]" />
              </CourseCardRoot.header>
              <CourseCardRoot.context>
                    {course.courseName}
              </CourseCardRoot.context>
              <CourseCardRoot.action>
                  <Button variant='secondary'>
                    Continue Learning
                    </Button>
              </CourseCardRoot.action>
            </CourseCardRoot>
            ))
        }
        </>
    )
}