import { ORPCError } from "@orpc/server";
import { enrollUserInCourse, isUserEnrolledInCourse } from "./course.repository";
import type { Db } from "../../db/drizzle.client";

export async function enrollInCourseService (userId: string, slug: string, db: Db)
{
    const isEnrolled = await isUserEnrolledInCourse(userId, slug, db);
    if (isEnrolled)
        throw new ORPCError("BAD_REQUEST", { message: "User already enrolled in the course" });
    // enroll the user to the course
    const enroll = await enrollUserInCourse(userId, slug, db);
    if (!enroll)
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to enroll user in the course" });
    return { success: true };

}