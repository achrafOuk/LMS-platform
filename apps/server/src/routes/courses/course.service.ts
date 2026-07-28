import type { CourseValidatorType, UpdateCourseValidatorType } from "@tanstack-start-hono/validators/course";
import type { Db, DbTransaction } from "../../db/drizzle.client";
import { createNewCourse, createNewModule, findOrCreateCategory, updateCourseFields } from "./course.repository";
import { createNewLesson, deleteLesson, upsertLesson } from "../lessons/lessons.repository";
import { deleteModule, upsertModule } from "../modules/module.repository";
import { getLastSeenCourses } from "../enroll/enroll.repository";

export const LAST_SEEN_COURSES_LIMIT = 3;


export async function createCourse(input: CourseValidatorType, tx: DbTransaction)
{
    const now = new Date();
    const tagId = await findOrCreateCategory(input.category, tx);
    const createdCourse = await createNewCourse(input, tx, now, tagId);
    for (const module of input.modules)
    {
        const createdModule = await createNewModule(module, tx, now, createdCourse!.cid);
        for (const lesson of module.lessions)
        {
            await createNewLesson(lesson, tx, now, createdModule!.mhid);
        }
    }
}

export async function updateCourse(input: UpdateCourseValidatorType, tx: DbTransaction)
{
    const now = new Date();
    const tagId = await findOrCreateCategory(input.category, tx);
    await updateCourseFields(input, tx, now, tagId);

    const inputModuleTitles = input.modules.map((module) => module.title);

    for (const module of input.modules) {
        const upsertedModule = await upsertModule(module, input.cid, tx, now);
        const inputLessonTitles = module.lessions.map((lesson) => lesson.title);

        for (const lesson of module.lessions) {
            await upsertLesson(lesson, upsertedModule!.mhid, tx, now);
        }

        await deleteLesson(upsertedModule!.mhid, inputLessonTitles, tx);
    }
    await deleteModule(input.cid, inputModuleTitles, tx);
}

export async function getLastSeenCoursesService(
    userId: string,
    db: Db,
    limit = LAST_SEEN_COURSES_LIMIT,
) {
    return getLastSeenCourses(userId, limit, db);
}

