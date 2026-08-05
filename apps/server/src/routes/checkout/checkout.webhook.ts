import type { Context } from "hono";
import { getStripe } from "../../payments/stripe.client";
import { db } from "../../db/drizzle.client";
import { handleCheckoutSessionCompleted } from "./checkout.service";

export async function stripeWebhookHandler(c: Context) {
  const signature = c.req.header("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return c.json({ error: "Missing webhook signature configuration" }, 400);
  }

  const body = await c.req.text();
  const stripe = getStripe();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return c.json({ error: "Invalid signature" }, 400);
  }

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object, db);
    }
  } catch (error) {
    console.error("Stripe webhook handler failed", error);
    return c.json({ error: "Webhook handler failed" }, 500);
  }

  return c.json({ received: true });
}
