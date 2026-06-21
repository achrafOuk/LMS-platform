import type { ModuleValidatorType } from "@tanstack-start-hono/validators/course";
import type { DbTransaction } from "../../db/drizzle.client";
import { modules } from "../../db/schemas";
import { and, eq, notInArray } from "drizzle-orm";
import { ulid } from "ulid";

export async function getModule(courseId: string, title: string, tx: DbTransaction) {
    const [module] = await tx
        .select()
        .from(modules)
        .where(and(eq(modules.cid, courseId), eq(modules.title, title)))
        .limit(1);

    return module ?? null;
}

export async function getModulesByCourseId(courseId: string, tx: DbTransaction) {
    return tx
        .select()
        .from(modules)
        .where(eq(modules.cid, courseId));
}

export async function updateModule(mhid: string, newModule: ModuleValidatorType, tx: DbTransaction, now: Date) {
    const [updatedModule] = await tx
        .update(modules)
        .set({
            title: newModule.title,
            order: newModule.order,
            updatedAt: now.toISOString(),
        })
        .where(eq(modules.mhid, mhid))
        .returning();

    return updatedModule;
}

export async function createModule(newModule: ModuleValidatorType, tx: DbTransaction, now: Date, courseId: string) {
    const [createdModule] = await tx
        .insert(modules)
        .values({
            mhid: ulid(),
            cid: courseId,
            title: newModule.title,
            order: newModule.order,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        })
        .returning();

    return createdModule;
}

export async function upsertModule(
    module: ModuleValidatorType,
    courseId: string,
    tx: DbTransaction,
    now: Date,
) {
    const existing = await getModule(courseId, module.title, tx);

    if (existing) {
        return updateModule(existing.mhid, module, tx, now);
    }

    return createModule(module, tx, now, courseId);
}

export async function deleteModule(courseId: string, titles: string[], tx: DbTransaction) {
    if (titles.length === 0) {
        await tx.delete(modules).where(eq(modules.cid, courseId));
        return;
    }

    await tx
        .delete(modules)
        .where(and(eq(modules.cid, courseId), notInArray(modules.title, titles)));
}
