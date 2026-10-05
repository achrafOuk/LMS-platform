import { ORPCError } from "@orpc/server";
import { COURSES_PAGE_SIZE } from "@tanstack-start-hono/validators/pagination";
import type { Db } from "../../db/drizzle.client";
import { getSuccessfulPayment } from "../checkout/checkout.repository";
import { countMyEnrollments, enrollUserInCourse, getMyEnrollmentsPage, isUserEnrolledInCourse } from "./enroll.repository";
import { PaginateRequest } from "../../db/utils/db.pagination.utils";

export async function enrollInCourseService(
    userId: string,
    courseId: string,
    price: number,
    db: Db,
) {
    const isEnrolled = await isUserEnrolledInCourse(userId, courseId, db);
    if (isEnrolled)
        throw new ORPCError("CONFLICT", { message: "User already enrolled in the course" });

    if (price > 0) {
        const payment = await getSuccessfulPayment(userId, courseId, db);
        if (!payment) {
            throw new ORPCError("FORBIDDEN", { message: "Payment required" });
        }
    }

    const enroll = await enrollUserInCourse(userId, courseId, db);
    if (!enroll)
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to enroll user in the course" });
    return { success: true };
}

export async function getMyEnrollmentsService(
    userId: string,
    currentPage: number,
    db: Db,
    pageSize = COURSES_PAGE_SIZE,
) {
    const [data, countResult] = await Promise.all([
        getMyEnrollmentsPage(userId, currentPage, pageSize, db),
        countMyEnrollments(userId, db),
    ]);

    const total = countResult[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return PaginateRequest(data, pageSize, currentPage, totalPages);
}
