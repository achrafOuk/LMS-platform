import {
  checkoutValidator,
  confirmCheckoutValidator,
} from "@tanstack-start-hono/validators/checkout";
import { hasPermission, protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { db } from "../../db/drizzle.client";
import {
  confirmCheckoutSessionService,
  createCheckoutSessionService,
} from "./checkout.service";

export const createCheckoutSessionRoute = protectedProcedure
  .use(hasPermission("course:enroll"))
  .input(checkoutValidator)
  .handler(async ({ input, context }) => {
    return createCheckoutSessionService(context.user.uid, input.courseId, db);
  });

export const confirmCheckoutSessionRoute = protectedProcedure
  .use(hasPermission("course:enroll"))
  .input(confirmCheckoutValidator)
  .handler(async ({ input, context }) => {
    return confirmCheckoutSessionService(
      context.user.uid,
      input.sessionId,
      db,
    );
  });
