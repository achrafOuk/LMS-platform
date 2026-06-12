import { os } from "@orpc/server";
import { LoginValidator, RegisterValidator } from "@tanstack-start-hono/validators/auth"

export const loginRoute = os
.input(LoginValidator)
.handler(async ({ input }) => {
    return `Hello, ${input.email}!`;
});

export const registerRoute = os
.input(RegisterValidator)
.handler(async ({ input }) => {
    return `Welcome, ${input.email}!`;
});
