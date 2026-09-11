import { db } from "../../db/drizzle.client";
import { optionalAuthProcedure, protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { courseSlugValidator, courseValidator, updateCourseValidator} from "@tanstack-start-hono/validators/course";
import { COURSES_PAGE_SIZE, paginationQueryValidator } from "@tanstack-start-hono/validators/pagination";
import {   getCourse, getFeaturedCourses} from "./course.repository";
import { ORPCError } from "@orpc/server";
import { checkViolation, formatViolationErrorMessage } from "../../db/utils/db.errors.utils";
import { createCourse, getLastSeenCoursesService, updateCourse } from "./course.service";
import {  hasPermission } from "../../orpc/middleware/auth.middleware";
import { isUserEnrolledInCourse } from "../enroll/enroll.repository";

export const createCourseRoute = protectedProcedure
.route({
    method: "POST",
    path: "/courses",
})
.use(hasPermission("course:manage:create"))
.input(courseValidator)
.handler(async ({ input }) => {
    try
    {
        await db.transaction(async (tx) => { await createCourse(input, tx); });
        return { message: "Course created successfully" };
    }
    catch (error: unknown) 
    {
        const errorMessage = checkViolation(error);
        if (errorMessage) throw new ORPCError("CONFLICT", { message: formatViolationErrorMessage(errorMessage as string) });
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to create course" });
    }
});

export const getCoursesRoute = 
// protectedProcedure
optionalAuthProcedure
.route({
    method: "GET",
    path: "/courses",
})
.input(paginationQueryValidator)
.handler(async ({ input, context }) => {
    const userId = context.user?.uid ?? "";
    return getFeaturedCourses(db, input.page, COURSES_PAGE_SIZE, userId);
});

export const getCourseRoute = optionalAuthProcedure.route({
    method: "GET",
    path: "/courses/:slug",
})
.input(courseSlugValidator)
.handler(async ({ input, context }) =>{
    
    const userId = context.user?.uid ?? "";
    const course = await getCourse(input.slug, db, userId);
    if (!course) {
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    }
    return course!;

});

export const updateCourseRoute = protectedProcedure
.route({
    method: "PUT",
    path: "/courses/:slug",
})
.use(hasPermission("course:manage:update"))
.input(updateCourseValidator)
.handler(async ({ input }) =>{
    try
    {
        await db.transaction(async (tx) => { await updateCourse(input, tx); });

        return { message: "Course updated successfully" };
    }
    catch (error: unknown) 
    {
        const errorMessage = checkViolation(error);
        if (errorMessage) throw new ORPCError("CONFLICT", { message: errorMessage });
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to update course" });
    }
});


export const getLastSeenCoursesRoute = 
protectedProcedure
.route({
    method: "GET",
    path: "/last-seen-courses",
})
.use(hasPermission("course:view"))
.handler(async ({ context }) =>{
    return getLastSeenCoursesService(context.user.uid, db);
});


export const getCourseLessonsRoute = protectedProcedure
.input(courseSlugValidator)
.use(hasPermission("course:view"))
.handler(async ({ context , input}) =>{
    const courseSlug = input.slug;
    const userId = context.user.uid;
    console.log("userId:", userId, "|");
    // check if course exists
    const course = await getCourse(courseSlug, db, userId);
    if (!course) {
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    }
    // check  if user is enrollled in this course
    // (userId: string, courseId: string, db: Db)
    const isEnrolled = await isUserEnrolledInCourse( userId, course.cid, db);
    console.log(`enrolled: ${isEnrolled}, in course slug ${courseSlug}` )
    if (!isEnrolled)
    {
        throw new ORPCError("FORBIDDEN", { message: "you are not registerd to see this content" });
    }
    return course;
    // return course info
});
