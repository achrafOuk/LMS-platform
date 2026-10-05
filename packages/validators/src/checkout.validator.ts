import z from "zod";

export const checkoutValidator = z.object({
  courseId: z.string().min(26).max(26),
});

export type CheckoutValidator = z.infer<typeof checkoutValidator>;

export const confirmCheckoutValidator = z.object({
  sessionId: z.string().min(1),
});

export type ConfirmCheckoutValidator = z.infer<typeof confirmCheckoutValidator>;
