import { os } from "@orpc/server";
import { LoginValidator } from "@tanstack-start-hono/validators/auth"

export const loginRoute = os
.input(LoginValidator)
.handler(async ({ input }) => {
    return `Hello, ${input.email}!`;
});