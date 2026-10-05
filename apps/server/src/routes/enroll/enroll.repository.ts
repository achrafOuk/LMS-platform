import { and, count, desc, eq, max } from "drizzle-orm";
import type { Db } from "../../db/drizzle.client";
import { courses, enrollments, lessons,  watchedLessons } from "../../db/schemas";
import { getPageOffest } from "../../db/utils/db.pagination.utils";


// check if user is already enrolled in the course
// where userid = userId and courseid = courseId
export const isUserEnrolledInCourse = async (userId: string, courseId: string, db: Db) =>
{
    console.log(`course ${userId}: course: ${courseId}`);
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

export function getMyEnrollmentsPage(
    userId: string,
    currentPage: number,
    pageSize: number,
    db: Db,
) {
    return db
        .select({
            cid: courses.cid,
            courseName: courses.courseName,
            slug: courses.slug,
            coverUrl: courses.coverUrl,
            tagId: courses.tagId,
            progress: enrollments.progressPercent,
            enrolledAt: enrollments.enrolledAt,
        })
        .from(enrollments)
        .innerJoin(courses, eq(courses.cid, enrollments.cid))
        .where(eq(enrollments.uid, userId))
        .orderBy(desc(enrollments.enrolledAt))
        .limit(pageSize)
        .offset(getPageOffest(currentPage, pageSize));
}

export function countMyEnrollments(userId: string, db: Db) {
    return db
        .select({ total: count() })
        .from(enrollments)
        .where(eq(enrollments.uid, userId));
}


export async function getLastSeenCourses(userId: string, limit: number, db: Db) {
    return await db
    .select({
        cid: courses.cid,
        courseName: courses.courseName,
        slug: courses.slug,
        coverUrl: courses.coverUrl,
        progress: enrollments.progressPercent,
    })
    .from(courses)
    .innerJoin(watchedLessons, and(eq(watchedLessons.leid, lessons.leid), eq(watchedLessons.uid, userId)))
    .orderBy(desc(watchedLessons.watchedAt))
    .limit(limit);

}


