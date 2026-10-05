import { db } from "../../db/drizzle.client";
import { protectedProcedure } from "../../orpc/middleware/auth.middleware"
import { getCourseStatic } from "./statistics.service";


export const courseStaticRoute = protectedProcedure
.handler(async () =>{
    return  await getCourseStatic(db);

})