import { count, eq } from "drizzle-orm";
import { courses, enrollments, users } from "../../db/schemas";
import type { Db, DbTransaction } from "../../db/drizzle.client";

async function getCourseCount(db: Db)
{
    return await db.select({
        count: count()
    })
    .from(courses)
    .execute();
}

async function getUserCount(db: Db)
{
    return await db.select({
            count: count()
        })
        .from(users)
        .where(eq(users.role, "USER"))
        .execute()
}

async function getRevenue(db: Db)
{
    return 0;
}

async function getEnrollmentCount(db: Db)
{
    return db.select({count: count()})
    .from(enrollments)
    .execute();
}


export async function getCourseStatic(db: Db)
{
    const [userCount, courseCount, enrollmentCount, revenue] = await Promise.all([
        getUserCount(db),
        getCourseCount(db),
        getEnrollmentCount(db),
        getRevenue(db),
    ])

    return [
        {
            name: "Courses",
            value: courseCount[0]?.count,
            
        },
        {
            name: "Enrollments",
            value: enrollmentCount[0]?.count,
        },
        {
            name: "Revenue",
            value: revenue,
        },
        {
            name: "Users",
            value: userCount[0]?.count,
        }
    ];

}