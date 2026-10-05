CREATE TABLE "media" (
	"uid" varchar(26) PRIMARY KEY NOT NULL,
	"path" text NOT NULL,
	"mime_type" text NOT NULL,
	"status" varchar(14) DEFAULT 'PENDING' NOT NULL,
	"create_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course" DROP CONSTRAINT "course_course_name_unique";--> statement-breakpoint
ALTER TABLE "module" ALTER COLUMN "order" TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_course_name_unique" UNIQUE("course_name","slug");