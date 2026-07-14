import { ORPCError } from "@orpc/server";
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


async function resolveUserFromToken(token: string): Promise<AuthUser> {
  const payload = await verifyAccessToken(token);
  const user: AuthUser = {
    uid: payload.sub,
    email: payload.email,
    role: payload.role,
  };
  const userPermissions = await db
    .select({
      permission: permissions.permission,
    })
    .from(usersPermissions)
    .innerJoin(permissions, eq(usersPermissions.pid, permissions.pid))
    .where(eq(usersPermissions.userId, user.uid));

  return { ...user, userPermissions };
}

export const optionalAuthMiddleware = base.middleware(async ({ context, next }) => {
  const token = getCookie(context.reqHeaders, AUTH_COOKIE_NAME);

  if (!token) {
    return next({ context: { user: null } });
  }

  try {
    const user = await resolveUserFromToken(token);
    return next({ context: { user } });
  } catch {
    return next({ context: { user: null } });
  }
});

export const authMiddleware = base.middleware(async ({ context, next }) => {
  const token = getCookie(context.reqHeaders, AUTH_COOKIE_NAME);

  if (!token) {
    throw new ORPCError("UNAUTHORIZED", { message: "Not authenticated" });
  }

  try {
    const user = await resolveUserFromToken(token);
    return next({ context: { user } });
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
export const optionalAuthProcedure = base.use(optionalAuthMiddleware);
export const protectedProcedure = base.use(authMiddleware);
