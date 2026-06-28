import { count, eq } from "drizzle-orm";
import { PaginateRequest } from "../../db/utils/db.pagination.utils";
import { COURSES_PAGE_SIZE } from "@tanstack-start-hono/validators/pagination";
import { ulid } from "ulid";
import type { Db, DbTransaction } from "../../db/drizzle.client";
import { courses, modules, tags } from "../../db/schemas";
import type { CourseValidatorType, ModuleValidatorType, UpdateCourseValidatorType } from "@tanstack-start-hono/validators/course";
import { desc } from "drizzle-orm";

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

function getFeaturedCoursesQuery(db: Db, currentPage: number, pageSize = COURSES_PAGE_SIZE) 
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

export async function getFeaturedCourses(db: Db, currentPage: number, pageSize = COURSES_PAGE_SIZE) {

    const [data, countResult] = await Promise.all([
            getFeaturedCoursesQuery(db, currentPage, pageSize),
            getFeaturedCoursesCountQuery(db),
    ]);

    const total = countResult[0]?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return PaginateRequest(data, pageSize, currentPage, totalPages);
}

export async function getCourse(slug: string, db: Db)
{
    return await db.query.courses.findFirst({
        where: eq(courses.slug, slug),
        columns: {
            cid: true,
            courseName: true,
            slug: true,
            coverUrl: true,
            price: true,
            description: true,
        },
        with: {
            tag: {
                columns: {
                    tagName: true,
                },
            },
            modules: {
                orderBy: (modules, { asc }: any) => [asc(modules.order)],
                columns: {
                    mhid: true,
                    title: true,
                    order: true,
                },
                with: {
                    lessons: {
                        columns: {
                            leid: true,
                            title: true,
                            orderIndex: true,
                            videoUrl: true,
                        },
                        orderBy: (lessons, { asc }: any) => [asc(lessons.orderIndex)],

                    },
                    
                },
            },
        },
    });


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

