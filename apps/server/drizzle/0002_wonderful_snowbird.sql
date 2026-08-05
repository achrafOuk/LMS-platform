CREATE TABLE "payment" (
	"uid" varchar(26) NOT NULL,
	"cid" varchar(26) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"amount" real NOT NULL,
	"status" varchar(14) DEFAULT 'PENDING' NOT NULL,
	CONSTRAINT "payment_uid_cid_pk" PRIMARY KEY("uid","cid")
);
--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "create_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "course" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "course" ALTER COLUMN "create_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "course" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "enroll" ALTER COLUMN "enrolled_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "enroll" ALTER COLUMN "enrolled_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "lesson" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "lesson" ALTER COLUMN "create_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "lesson" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "module" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "module" ALTER COLUMN "create_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "module" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "create_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users_permissions" ALTER COLUMN "create_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users_permissions" ALTER COLUMN "create_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users_permissions" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "watched_lessons" ALTER COLUMN "watched_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "watched_lessons" ALTER COLUMN "watched_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_uid_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."user"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_cid_course_cid_fk" FOREIGN KEY ("cid") REFERENCES "public"."course"("cid") ON DELETE cascade ON UPDATE no action;