import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe() {
  if (stripe) {
    return stripe;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  stripe = new Stripe(secretKey);
  return stripe;
}

export function getClientOrigin() {
  return process.env.CORS_ORIGIN ?? "http://localhost:3000";
}
