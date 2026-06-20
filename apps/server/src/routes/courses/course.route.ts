import { db } from "../../db/drizzle.client";
import { protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { courseValidator} from "@tanstack-start-hono/validators/course";
import { createNewCourse, createNewLesson, createNewModule, findOrCreateCategory } from "./course.repository";
import { ORPCError } from "@orpc/server";
import { checkViolation } from "../../db/db.utils";
import { courses, tags } from "../../db/schemas";
import { eq } from "drizzle-orm";

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

export const getCourseRoute = protectedProcedure
.handler(async () =>{
    const featuredCourses = await db.select({
        cid: courses.cid,
        courseName: courses.courseName,
        slug: courses.slug,
        coverUrl: courses.coverUrl,
        price: courses.price,
        category: tags.tagName,
    })
    .from(courses) 
    .innerJoin(tags, eq(courses.tagId, tags.tid))

    return featuredCourses;
})