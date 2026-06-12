import { ORPCError, os } from "@orpc/server";
import { LoginValidator, RegisterValidator } from "@tanstack-start-hono/validators/auth"
import { users } from "../../db/schemas";
import {  findUserByEmail, insertNewNormalUser } from "../users/user.repository";
import { checkUniqueViolation, compareUserPassword } from "./auth.service";
import { createNormalUser } from "../users/user.service";

export const loginRoute = os
.input(LoginValidator)
.handler(async ({ input }) => {
    const user = await findUserByEmail(input.email);
    if (!user || !user.passwordHash) {
        throw new ORPCError("NOT_FOUND", {message: "User not found"});
    }
    if (!await compareUserPassword(input.password, user.passwordHash)) {
        throw new ORPCError("UNAUTHORIZED", {message: "Invalid password"});
    }
    return {
        message: "User logged in successfully",
    };
});


export const registerRoute = os
.input(RegisterValidator)
.handler(async ({ input }) => {
    const new_user: typeof users.$inferInsert = 
    await createNormalUser({...input, passwordHash: input.password});
    try {
        await insertNewNormalUser(new_user);
        
    } catch (error: unknown) {
        const messages = await checkUniqueViolation(error as Error);
        if (messages.length > 0) {
            throw new ORPCError("CONFLICT", {message: messages.join(", ")});
        }
        throw new ORPCError("INTERNAL_SERVER_ERROR", {
            message: "Failed to register user",
        });
    }
    return {
        message: "User registered successfully",
    };

});

