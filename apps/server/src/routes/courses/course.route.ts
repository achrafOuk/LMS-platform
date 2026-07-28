import { db } from "../../db/drizzle.client";
import { optionalAuthProcedure, protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { courseSlugValidator, courseValidator, updateCourseValidator} from "@tanstack-start-hono/validators/course";
import { paginationQueryValidator } from "@tanstack-start-hono/validators/pagination";
import {   getCourse, getFeaturedCourses} from "./course.repository";
import { ORPCError } from "@orpc/server";
import { checkViolation, formatViolationErrorMessage } from "../../db/utils/db.errors.utils";
import { createCourse, getLastSeenCoursesService, updateCourse } from "./course.service";
import {  hasPermission } from "../../orpc/middleware/auth.middleware";

export const createCourseRoute = protectedProcedure
.route({
    method: "POST",
    path: "/courses",
})
.use(hasPermission("course:create"))
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
.handler(async ({ input }) => {
    return getFeaturedCourses(db, input.page);
});

export const getCourseRoute = optionalAuthProcedure.route({
    method: "GET",
    path: "/courses/:slug",
})
.input(courseSlugValidator)
.handler(async ({ input }) =>{
    
    const course = await getCourse(input.slug, db);
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
.use(hasPermission("course:update"))
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



