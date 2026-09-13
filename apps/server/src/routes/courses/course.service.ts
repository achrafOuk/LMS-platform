import type { CourseValidatorType, UpdateCourseValidatorType } from "@tanstack-start-hono/validators/course";
import { db, type Db, type DbTransaction } from "../../db/drizzle.client";
import { createNewCourse, createNewModule, findOrCreateCategory, getCourse, updateCourseFields } from "./course.repository";
import { createNewLesson, deleteLesson, upsertLesson } from "../lessons/lessons.repository";
import { deleteModule, upsertModule } from "../modules/module.repository";
import { getLastSeenCourses, isUserEnrolledInCourse } from "../enroll/enroll.repository";
import { ORPCError } from "@orpc/server";
import { tags } from "../../db/schemas";



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

export const LAST_SEEN_COURSES_LIMIT = 3;
export async function getLastSeenCoursesService(
    userId: string,
    db: Db,
    limit = LAST_SEEN_COURSES_LIMIT,
) {

    return getLastSeenCourses(userId, limit, db);
}


export async function getCourseLessons(courseSlug : string, userId: string, db: Db)
{
    const course = await getCourse(courseSlug, db, userId);
    if (!course) {
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    }
    const isEnrolled = await isUserEnrolledInCourse( userId, course.cid, db);
    if (!isEnrolled)
    {
        throw new ORPCError("FORBIDDEN", { message: "you are not registerd to see this content" });
    }
    return course;
}

export async function getCourseTags()
{
    const result = await db
    .select({
        tid: tags.tid,
        tagName: tags.tagName,
    })
    .from(tags);
    return result;

}
