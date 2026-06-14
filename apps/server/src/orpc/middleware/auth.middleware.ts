import { ORPCError } from "@orpc/server";
import { getCookie } from "@orpc/server/helpers";
import { base, type AuthUser } from "../context";
import {
  AUTH_COOKIE_NAME,
  verifyAccessToken,
} from "../../routes/auth/auth.service";

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

    return next({ context: { user } });
  } catch {
    throw new ORPCError("UNAUTHORIZED", {
      message: "Invalid or expired session",
    });
  }
});


export const publicProcedure = base.use(publicMiddleware);
export const protectedProcedure = base.use(authMiddleware);
