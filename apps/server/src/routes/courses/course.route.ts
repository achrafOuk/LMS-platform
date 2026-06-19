import { db } from "../../db/drizzle.client";
import { protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { courseValidator} from "@tanstack-start-hono/validators/course";
import { createNewCourse, createNewLesson, createNewModule } from "./course.repository";
import { ORPCError } from "@orpc/server";
import { checkViolation } from "../../db/db.utils";

export const createCourseRoute = protectedProcedure
.input(courseValidator)
.handler(async ({ input }) => {
    try
    {
        await db.transaction(async (tx) => {
            const now = new Date();
            const createdCourse = await createNewCourse(input, tx, now);
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
})