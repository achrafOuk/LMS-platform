import { and, eq } from "drizzle-orm";
import type { Db } from "../../db/drizzle.client";
import { enrollments } from "../../db/schemas";


// check if user is already enrolled in the course
// where userid = userId and courseid = courseId
export const isUserEnrolledInCourse = async (userId: string, courseId: string, db: Db) =>
{
    const result = await db
    .select({
    })
    .from(enrollments)
    .where(and(eq(enrollments.uid, userId), eq(enrollments.cid, courseId)));

    return result.length > 0;

}

// enroll the user to the course
export const enrollUserInCourse = async (userId: string, courseId: string, db: Db) =>
{
    const result = await db
    .insert(enrollments)
    .values({
        uid: userId,
        cid: courseId,
        progressPercent: 0,
        enrolledAt: new Date().toISOString(),
    }).returning();
    return result;
}
