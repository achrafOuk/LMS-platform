ALTER TABLE "payment" ADD COLUMN "stripe_payment_intent" text NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "response_data" jsonb DEFAULT '{}' NOT NULL;