import { enrollInCourseValidator } from "@tanstack-start-hono/validators/course";
import { hasPermission, protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { getCourse } from "../courses/course.repository";
import { db } from "../../db/drizzle.client";
import { ORPCError } from "@orpc/server";
import {  isUserEnrolledInCourse } from "./course.repository";
import { enrollInCourseService } from "./enroll.service";


export const enrollInCourseRoute = protectedProcedure
.use(hasPermission("course:enroll"))
.input(enrollInCourseValidator)
.handler(async ({input, context}) => {
    const { slug } = input;
    if (!getCourse(slug, db))
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    const user = context.user;
    return enrollInCourseService(user.uid, slug, db);
});


export const isUserEnrolledInCourseRoute = protectedProcedure
.input(enrollInCourseValidator)
.handler(async ({input, context}) => {

    const { slug } = input;
    if (!getCourse(slug, db))
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    const user = context.user;
    const isEnrolled = await isUserEnrolledInCourse(user.uid, slug, db);
    return { isEnrolled };
});