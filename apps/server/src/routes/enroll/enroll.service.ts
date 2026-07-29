import { ORPCError } from "@orpc/server";
import { COURSES_PAGE_SIZE } from "@tanstack-start-hono/validators/pagination";
import type { Db } from "../../db/drizzle.client";
import { countMyEnrollments, enrollUserInCourse, getMyEnrollmentsPage, isUserEnrolledInCourse } from "./enroll.repository";
import { PaginateRequest } from "../../db/utils/db.pagination.utils";

export async function enrollInCourseService (userId: string, slug: string, db: Db)
{
    const isEnrolled = await isUserEnrolledInCourse(userId, slug, db);
    if (isEnrolled)
        throw new ORPCError("CONFLICT", { message: "User already enrolled in the course" });
    // enroll the user to the course
    const enroll = await enrollUserInCourse(userId, slug, db);
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
