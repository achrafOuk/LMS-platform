import { ORPCError, os } from "@orpc/server";
import { getCookie } from "@orpc/server/helpers";
import { base, type AuthUser } from "../context";
import {
  AUTH_COOKIE_NAME,
  verifyAccessToken,
} from "../../routes/auth/auth.service";
import { db } from "../../db/drizzle.client";
import { permissions, usersPermissions } from "../../db/schemas";
import { eq } from "drizzle-orm";
import type { PermissionTypes } from "@tanstack-start-hono/shared/rbac";

const publicMiddleware =  base.middleware(async ({ context, next }) => {
  const token = getCookie(context.reqHeaders, AUTH_COOKIE_NAME);
  if (token)
  {
    throw new ORPCError("UNAUTHORIZED", { message: "invalid" });
  }
  return next();

});


export const authMiddleware = base.middleware(async ({ context, next }) => {
  const token = getCookie(context.reqHeaders, AUTH_COOKIE_NAME);

  if (!token) {
    throw new ORPCError("UNAUTHORIZED", { message: "Not authenticated" });
  }

  try {
    const payload = await verifyAccessToken(token);
    const user: AuthUser = {
      uid: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    let userPermissions= await db
    .select({
      permission: permissions.permission,
    })
    .from(usersPermissions)
    .innerJoin(permissions, eq(usersPermissions.pid, permissions.pid))
    .where(eq(usersPermissions.userId, user.uid));

    const userWithPermissions = { ...user, userPermissions };

    return next({ context: { user: userWithPermissions } });
  } catch {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Invalid or expired session",
    });
  }
});

export function hasPermission(permission: PermissionTypes) {
  return base.middleware(async ({ context, next }) => {
      const user = context.user;
      if (!user)
      {
        throw new ORPCError("UNAUTHORIZED", { message: "Not authenticated" });
      }
      if (user?.userPermissions?.find((p) => p.permission === permission) === null)
      {
        throw new ORPCError("FORBIDDEN", { message: "You don't have permission to see it" });
      }

      return next();
  });
}


export const publicProcedure = base.use(publicMiddleware);
export const protectedProcedure = base.use(authMiddleware);
