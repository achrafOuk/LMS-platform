import { db } from "../../db/drizzle.client";
import { users } from "../../db/schemas";
import { eq } from "drizzle-orm";


export async function findUserByEmail(email: string) {
        const user = await db.select({
            passwordHash: users.passwordHash,
            username: users.username,
        }).from(users).where(eq(users.email, email)).limit(1);
        if (!user || user.length === 0 || !user[0]) {
            return null;
        }
        return user[0];
}

export type User = typeof users.$inferSelect;

export async function insertNewNormalUser(new_user: User) {
    await db.insert(users).values(new_user);
}


