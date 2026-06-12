import { ORPCError, os } from "@orpc/server";
import { ulid } from "ulid";
import bcrypt from "bcrypt";
import { LoginValidator, RegisterValidator } from "@tanstack-start-hono/validators/auth"
import { users } from "../db/schemas";
import { db } from "../db/drizzle.client";
import { DatabaseError } from "pg";
import { eq } from "drizzle-orm";

export const loginRoute = os
.input(LoginValidator)
.handler(async ({ input }) => {
    const user = await db
    .select({ passwordHash: users.passwordHash, username: users.username })
    .from(users)
    .where(eq(users.email, input.email))
    .limit(1);
    if (!user || user.length === 0 || !user[0]) {
        throw new ORPCError("NOT_FOUND", {message: "User not found"});
    }
    const passwordMatch = await bcrypt.compare(input.password, user[0].passwordHash);
    if (!passwordMatch) {
        throw new ORPCError("UNAUTHORIZED", {message: "Invalid password"});
    }
    return `Hello, ${input.email}!`;
});


export const registerRoute = os
.input(RegisterValidator)
.handler(async ({ input }) => {
    const new_user: typeof users.$inferInsert = {
        uid: ulid(),
        username: input.email,
        passwordHash: await bcrypt.hash(input.password, 10),
        email: input.email,
        role: "user",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    try {
        await db.insert(users).values(new_user);
        return {
            message: "User registered successfully",
        };
    } catch (error) {
        console.error(error);
        if (error instanceof DatabaseError && error.code === "23505") // unique_violation
        {
            if (error.constraint?.includes("email"))
            {
                throw new ORPCError("CONFLICT", {message: "Email already in use"});
            }
            if (error.constraint?.includes("user_username_unique"))
            {
                throw new ORPCError("CONFLICT", {message: "Username already in use"});
            }
        }
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
            message: "Failed to register user",
        });
    }


});

