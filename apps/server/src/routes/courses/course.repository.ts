// import { asc, count, eq, sql } from "drizzle-orm";
import { PaginateRequest } from "../../db/utils/db.pagination.utils";
import { ulid } from "ulid";
import type { Db, DbTransaction } from "../../db/drizzle.client";
import { courses, enrollments, lessons, modules, tags } from "../../db/schemas";
import type { CourseValidatorType, ModuleValidatorType, UpdateCourseValidatorType } from "@tanstack-start-hono/validators/course";
import { COURSES_PAGE_SIZE } from "@tanstack-start-hono/validators/pagination";
import { isUserEnrolledInCourse } from "../enroll/enroll.repository";

import { desc, inArray, like } from "drizzle-orm";
import { asc, count, eq, sql, and} from "drizzle-orm";

export async function findOrCreateCategory(categoryName: string, db: DbTransaction) {
    const [existingTag] = await db
        .select({ tid: tags.tid })
        .from(tags)
        .where(eq(tags.tagName, categoryName))
        .limit(1);

    if (existingTag) {
        return existingTag.tid;
    }

    const [createdTag] = await db
        .insert(tags)
        .values({
            tid: ulid(),
            tagName: categoryName,
        })
        .returning({ tid: tags.tid });

    return createdTag!.tid;
}

export async function createNewCourse(input: CourseValidatorType, db: DbTransaction, now: Date, tagId: string)
{
    const [createdCourse] = await db.insert(courses).values({
            cid: ulid(),
            slug: input.title.toLowerCase().replace(/ /g, "-"),
            courseName: input.title,
            coverUrl: input.image,
            description: input.description,
            price: input.price,
            tagId,
            enrolled: 0,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        }).returning();
    return createdCourse;
}

export async function createNewModule(input: ModuleValidatorType,db: DbTransaction, now: Date, cid: string)
{
    const [createdModule] = await db.insert(modules).values({
        mhid: ulid(),
        cid: cid,
        title: input.title,
        order: input.order,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
    }).returning();
    return createdModule;
}

function getFeaturedCoursesQuery(db: Db, currentPage: number, pageSize:number, userId: string) 
{
    const offset = (currentPage - 1) * pageSize;
    const query = db
            .select({
                cid: courses.cid,
                courseName: courses.courseName,
                slug: courses.slug,
                coverUrl: courses.coverUrl,
                price: courses.price,
                category: tags.tagName,
                isEnrolled: sql<boolean>`
                    EXISTS (
                        SELECT 1
                        FROM ${enrollments}
                        WHERE ${enrollments.uid} = ${userId}
                        AND ${enrollments.cid} = ${courses.cid}
                    )
                `,
            })
            .from(courses)
            .orderBy(desc(courses.createdAt))
            .innerJoin(tags, eq(courses.tagId, tags.tid))
            .limit(pageSize)
            .offset(offset)
    return query;
}

function getFeaturedCoursesCountQuery(db: Db) {
    const query =  db
        .select({ total: count() })
        .from(courses)
        .innerJoin(tags, eq(courses.tagId, tags.tid));
    return query;
}

export async function getFeaturedCourses(db: Db, currentPage: number, pageSize :number, userId: string) {

    const [data, countResult] = await Promise.all([
            getFeaturedCoursesQuery(db, currentPage, pageSize, userId),
            getFeaturedCoursesCountQuery(db),
    ]);

    const total = countResult[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return PaginateRequest(data, pageSize, currentPage, totalPages);
}

function getCourseQuery(slug: string, db: Db, userId: string) {
    const query = db
        .select({
            cid: courses.cid,
            courseName: courses.courseName,
            slug: courses.slug,
            coverUrl: courses.coverUrl,
            price: courses.price,
            description: courses.description,
            tag: { tagName: tags.tagName },
            isEnrolled: sql<boolean>`
                EXISTS (
                    SELECT 1
                    FROM ${enrollments}
                    WHERE ${enrollments.uid} = ${userId}
                    AND ${enrollments.cid} = ${courses.cid}
                )
            `,
        })
        .from(courses)
        .innerJoin(tags, eq(courses.tagId, tags.tid))
        .where(eq(courses.slug, slug))
        .limit(1);
    return query;
}

function getCourseModulesWithLessonsQuery(cid: string, db: Db) {
    const query = db
        .select({
            mhid: modules.mhid,
            title: modules.title,
            order: modules.order,
            lesson: {
                leid: lessons.leid,
                title: lessons.title,
                orderIndex: lessons.orderIndex,
                videoUrl: lessons.videoUrl,
            },
        })
        .from(modules)
        .leftJoin(lessons, eq(lessons.chid, modules.mhid))
        .where(eq(modules.cid, cid))
        .orderBy(asc(modules.order), asc(lessons.orderIndex));
    return query;
}

function groupModulesWithLessons(rows: Awaited<ReturnType<typeof getCourseModulesWithLessonsQuery>>) {
    const modulesByMhid = new Map<string, { mhid: string; title: string; order: number; lessons: NonNullable<typeof rows[number]["lesson"]>[] }>();

    for (const row of rows) {
        let courseModule = modulesByMhid.get(row.mhid);
        if (!courseModule) {
            courseModule = { mhid: row.mhid, title: row.title, order: row.order, lessons: [] };
            modulesByMhid.set(row.mhid, courseModule);
        }
        if (row.lesson) {
            courseModule.lessons.push(row.lesson);
        }
    }

    return Array.from(modulesByMhid.values());
}

export async function getCourse(slug: string, db: Db, userId: string)
{
    const [course] = await getCourseQuery(slug, db, userId);
    if (!course) return undefined;

    const moduleRows = await getCourseModulesWithLessonsQuery(course.cid, db);

    return {
        ...course,
        modules: groupModulesWithLessons(moduleRows),
    };
}

export async function updateCourseFields(input: UpdateCourseValidatorType, tx: DbTransaction, now: Date, tagId: string) {
    await tx.update(courses).set({
        courseName: input.title,
        coverUrl: input.image,
        description: input.description,
        price: input.price,
        tagId: tagId,
        updatedAt: now.toISOString(),
    }).where(eq(courses.cid, input.cid!));
}


export async function getCourseWithModules(courseId : string, db: Db)
{
    const result = await db.select({ 
        mhid: modules.mhid,
        title: modules.title,
        order: modules.order,
        lesson: {
            leid: lessons.leid,
            title: lessons.title,
            orderIndex: lessons.orderIndex,
            videoUrl: lessons.videoUrl,
        },
    })
    .from(modules)
    .innerJoin(lessons, eq(lessons.chid,modules.mhid))
    .where(eq(modules.mhid, courseId));
    return result;
}

export async function getSearchedCourseCount(db: Db,  searchedCourse: string, tages: string[])
{
    const searchedCourses = await db
    .select({ 
        total: count()
     })
    .from(courses)
    .innerJoin(tags, eq(courses.tagId, tags.tid))
    .where(
        and(
            inArray(tags.tagName, tages),
            like(courses.courseName, `%${searchedCourse}%`)
        )
    )

    return searchedCourses;

}

export async function getSearchedCourseQuery(db: Db, userId: string, searchedCourse: string, tages: string[],currentPage:number, pageSize:number,)
{

    const offset = (currentPage - 1) * pageSize;

    const conditions = [
        like(courses.courseName, `%${searchedCourse}%`)
    ];

    // Only add tag condition if tags were provided
    if (tages.length > 0) {
        conditions.push(
            inArray(tags.tagName, tages)
        );
    }

    const searchedCourses = await db
        .select({
            cid: courses.cid,
            courseName: courses.courseName,
            slug: courses.slug,
            coverUrl: courses.coverUrl,
            price: courses.price,

            isEnrolled: sql<boolean>`
                EXISTS (
                    SELECT 1
                    FROM ${enrollments}
                    WHERE ${enrollments.uid} = ${userId}
                    AND ${enrollments.cid} = ${courses.cid}
                )
            `,

            createdAt: courses.createdAt
        })
        .from(courses)
        .innerJoin(tags, eq(courses.tagId, tags.tid))
        .where(and(...conditions))
        .orderBy(desc(courses.createdAt))
        .limit(pageSize)
        .offset(offset);

    return searchedCourses;
}



export async function getSearchedCourse(db: Db, userId: string, searchedCourse: string, tages: string[],currentPage:number, pageSize:number,) {
    const [data, countResult] = await Promise.all([
            getSearchedCourseQuery(db, userId, searchedCourse, tages,currentPage, pageSize),
            getSearchedCourseCount(db,  searchedCourse, tages)
    ]);

    const total = countResult[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return PaginateRequest(data, pageSize, currentPage, totalPages);
}