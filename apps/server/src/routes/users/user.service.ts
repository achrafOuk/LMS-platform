import { ulid } from "ulid";
import { EncryptPassword } from "../auth/auth.service";
import type { users } from "../../db/schemas";

export type User = typeof users.$inferSelect;

export async function createNormalUser(user: Pick<User, "email" | "passwordHash">) {
    const now = new Date().toISOString();
    return {
        uid: ulid(),
        username: user.email,
        passwordHash: await EncryptPassword(user.passwordHash),
        email: user.email,
        role: "user",
        createdAt: now,
        updatedAt: now,
    };
}