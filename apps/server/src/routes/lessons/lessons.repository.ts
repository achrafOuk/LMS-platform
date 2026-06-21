import type { LessonValidatorType } from "@tanstack-start-hono/validators/course";
import type { DbTransaction } from "../../db/drizzle.client";
import { lessons } from "../../db/schemas";
import { and, eq, notInArray } from "drizzle-orm";
import { ulid } from "ulid";

export async function getLesson(moduleId: string, title: string, tx: DbTransaction) {
    const [lesson] = await tx
        .select()
        .from(lessons)
        .where(and(eq(lessons.chid, moduleId), eq(lessons.title, title)))
        .limit(1);

    return lesson ?? null;
}

export async function getLessonsByModuleId(moduleId: string, tx: DbTransaction) {
    return tx
        .select()
        .from(lessons)
        .where(eq(lessons.chid, moduleId));
}

export async function updateLesson(
    leid: string,
    input: LessonValidatorType,
    tx: DbTransaction,
    now: Date,
) {
    const [updatedLesson] = await tx
        .update(lessons)
        .set({
            title: input.title,
            order: input.order,
            orderIndex: input.order,
            videoUrl: input.videoLink,
            updatedAt: now.toISOString(),
        })
        .where(eq(lessons.leid, leid))
        .returning();

    return updatedLesson;
}

export async function createNewLesson(input: LessonValidatorType, tx: DbTransaction, now: Date, moduleId: string) {
    const [createdLesson] = await tx
        .insert(lessons)
        .values({
            leid: ulid(),
            chid: moduleId,
            title: input.title,
            order: input.order,
            orderIndex: input.order,
            videoUrl: input.videoLink,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        })
        .returning();

    return createdLesson;
}

export async function upsertLesson(
    input: LessonValidatorType,
    moduleId: string,
    tx: DbTransaction,
    now: Date,
) {
    const existing = await getLesson(moduleId, input.title, tx);

    if (existing) {
        return updateLesson(existing.leid, input, tx, now);
    }

    return createNewLesson(input, tx, now, moduleId);
}

export async function deleteLesson(moduleId: string, titles: string[], tx: DbTransaction) {
    if (titles.length === 0) {
        await tx.delete(lessons).where(eq(lessons.chid, moduleId));
        return;
    }

    await tx
        .delete(lessons)
        .where(and(eq(lessons.chid, moduleId), notInArray(lessons.title, titles)));
}
