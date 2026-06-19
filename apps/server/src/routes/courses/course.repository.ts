import { ulid } from "ulid";
import type { Db, DbTransaction } from "../../db/drizzle.client";
import { courses, lessons, modules } from "../../db/schemas";
import type { CourseValidatorType, LessonValidatorType, ModuleValidatorType } from "@tanstack-start-hono/validators/course";

export async function createNewCourse(input: CourseValidatorType,db: DbTransaction, now: Date)
{
    const [createdCourse] = await db.insert(courses).values({
            cid: ulid(),
            slug: input.title.toLowerCase().replace(/ /g, "-"),
            courseName: input.title,
            coverUrl: input.image,
            description: input.description,
            price: input.price,
            tagId: input.category,
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

export async function createNewLesson(input: LessonValidatorType,db: DbTransaction, now: Date, chid: string)
{
    const [createdLesson] = await db.insert(lessons).values({
        leid: ulid(),
        chid: chid,
        title: input.title,
        order: input.order,
        orderIndex: input.order,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
    }).returning();
    return createdLesson;
}