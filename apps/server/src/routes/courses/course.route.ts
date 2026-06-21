import { db } from "../../db/drizzle.client";
import { protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { courseSlugValidator, courseValidator, updateCourseValidator} from "@tanstack-start-hono/validators/course";
import { createNewCourse, createNewModule, findOrCreateCategory, getCourse, getFeaturedCourses, updateCourseFields } from "./course.repository";
import { deleteLesson, createNewLesson, upsertLesson } from "../lessons/lessons.repository";
import { deleteModule, upsertModule } from "../modules/module.repository";
import { ORPCError } from "@orpc/server";
import { checkViolation } from "../../db/db.utils";

export const createCourseRoute = protectedProcedure
.input(courseValidator)
.handler(async ({ input }) => {
    try
    {
        await db.transaction(async (tx) => {
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
        });
        return { message: "Course created successfully" };
    }
    catch (error: unknown) 
    {
        const errorMessage = checkViolation(error);
        if (errorMessage) throw new ORPCError("CONFLICT", { message: errorMessage });
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to create course" });
    }
});

export const getCoursesRoute = protectedProcedure
.handler(async () =>{

    const featuredCourses = await getFeaturedCourses(db);
    return featuredCourses;

});

export const getCourseRoute = protectedProcedure.route({
    method: "GET",
    path: "/courses/:slug",
})
.input(courseSlugValidator)
.handler(async ({ input }) =>{
    
    const course = await getCourse(input.slug, db);
    if (!course) {
        throw new ORPCError("NOT_FOUND", { message: "Course not found" });
    }
    return course!;

});

export const updateCourseRoute = protectedProcedure
.input(updateCourseValidator)
.handler(async ({ input }) =>{
    console.log("input:", input);
    try
    {
        await db.transaction(async (tx) => {
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
        });

        return { message: "Course updated successfully" };
    }
    catch (error: unknown) 
    {
        const errorMessage = checkViolation(error);
        if (errorMessage) throw new ORPCError("CONFLICT", { message: errorMessage });
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to update course" });
    }
});

