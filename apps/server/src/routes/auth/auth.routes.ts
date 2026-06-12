import { ORPCError } from "@orpc/server";

import { deleteCookie, setCookie } from "@orpc/server/helpers";

import { LoginValidator, RegisterValidator } from "@tanstack-start-hono/validators/auth";

import { users } from "../../db/schemas";

import {

  publicProcedure,

  protectedProcedure,

} from "../../orpc/middleware/auth.middleware";

import { findUserByEmail, insertNewNormalUser } from "../users/user.repository";

import { createNormalUser } from "../users/user.service";

import {

  AUTH_COOKIE_NAME,

  checkUniqueViolation,

  compareUserPassword,

  getAuthCookieOptions,

  signAccessToken,

} from "./auth.service";



export const loginRoute = publicProcedure

  .input(LoginValidator)

  .handler(async ({ input, context }) => {
    const user = await findUserByEmail(input.email);
    if (!user || !user.passwordHash) {
      throw new ORPCError("UNAUTHORIZED", {
        message: "Invalid email or password",
      });
    }

    if (!(await compareUserPassword(input.password, user.passwordHash))) {
      throw new ORPCError("UNAUTHORIZED", {

        message: "Invalid email or password",
      });

    }

    const token = await signAccessToken({
      uid: user.uid,
      email: user.email,
      role: user.role,
    });

    setCookie(
      context.resHeaders,
      AUTH_COOKIE_NAME,
      token,
      getAuthCookieOptions(),
    );

    return user;

  });



export const registerRoute = publicProcedure

  .input(RegisterValidator)

  .handler(async ({ input }) => {

    const new_user: typeof users.$inferInsert = await createNormalUser({
      ...input,
      passwordHash: input.password,
    });


    try {
      await insertNewNormalUser(new_user);
    } catch (error: unknown) {
      const messages = await checkUniqueViolation(error as Error);
      if (messages.length > 0) {
        throw new ORPCError("CONFLICT", { message: messages.join(", ") });
      }
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Failed to register user",
      });
    }
    return { message: "User registered successfully", };
});

export const logoutRoute = publicProcedure.handler(async ({ context }) => {
  deleteCookie(context.resHeaders, AUTH_COOKIE_NAME, { path: "/" });

  return {
    message: "Logged out successfully",
  };

});



export const meRoute = protectedProcedure.handler(async ({ context }) => {
  console.log(context.user);
  return {
    user: context.user!,
  };

});


