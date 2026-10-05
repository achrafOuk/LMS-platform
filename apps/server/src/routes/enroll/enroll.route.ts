import { enrollInCourseValidator } from "@tanstack-start-hono/validators/course";
import { paginationQueryValidator } from "@tanstack-start-hono/validators/pagination";
import { ORPCError } from "@orpc/server";
import { hasPermission, protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { getCourse } from "../courses/course.repository";
import { db } from "../../db/drizzle.client";
import { isUserEnrolledInCourse } from "./enroll.repository";
import { enrollInCourseService, getMyEnrollmentsService } from "./enroll.service";


export const enrollInCourseRoute = protectedProcedure
.use(hasPermission("course:enroll"))
.input(enrollInCourseValidator)
.handler(async ({input, context}) => {
    const userId = context.user?.uid ?? "";
    const course = await getCourse(input.slug, db, userId);
    if (!course)
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    const user = context.user;
    return enrollInCourseService(user.uid, course.cid, course.price, db);
});


export const isUserEnrolledInCourseRoute = protectedProcedure
.input(enrollInCourseValidator)
.handler(async ({input, context}) => {
    const userId = context.user?.uid ?? "";
    const course = await getCourse(input.slug, db, userId);
    if (!course)
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    const user = context.user;
    const isEnrolled = await isUserEnrolledInCourse(user.uid, course.cid, db);
    console.log('isEnrolled:', isEnrolled);
    return { isEnrolled };
});


export const getMyEnrollmentsRoute = protectedProcedure
.route({
    method: "GET",
    path: "/my-enrollments",
})
.use(hasPermission("course:view"))
.input(paginationQueryValidator)
.handler(async ({ input, context }) => {
    return getMyEnrollmentsService(context.user.uid, input.page, db);
});
