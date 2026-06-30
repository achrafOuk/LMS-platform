import { db } from "./drizzle.client";
import { users } from "./schemas";
import { seedRoleForUser, seedRoles } from "./seeds/role.seed";
import { eq } from "drizzle-orm";

async function seed()
{
    seedRoles().catch((error) => {
        console.error("Seeding roles failed:", error);
    });

    const admins = await db.select({
        uid: users.uid,
    }).from(users).where(eq(users.role, 'admin'));

    await Promise.all(admins.map(async (admin) => {
        await seedRoleForUser(admin.uid, 'admin');
    }));



    process.exit(0);
}

seed().catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
});