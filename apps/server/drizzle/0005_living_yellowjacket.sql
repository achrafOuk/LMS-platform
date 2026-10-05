ALTER TABLE "payment" ALTER COLUMN "response_data" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "amount" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "stripe_checkout_session_id" text;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "currency" varchar(3) DEFAULT 'usd' NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_stripe_checkout_session_id_unique" UNIQUE("stripe_checkout_session_id");