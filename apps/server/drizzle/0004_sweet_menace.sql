ALTER TABLE "payment" RENAME COLUMN "stripe_payment_intent" TO "stripe_payment_intent_id";--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "idempotency_key" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_idempotency_key_unique" UNIQUE("idempotency_key");