CREATE TABLE "course" (
	"cid" varchar(26) PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"course_name" varchar(255) NOT NULL,
	"cover_url" text,
	"description" text,
	"price" real NOT NULL,
	"tag_id" varchar(26) NOT NULL,
	"enrolled" integer DEFAULT 0 NOT NULL,
	"create_at" date NOT NULL,
	"updated_at" date NOT NULL,
	CONSTRAINT "course_course_name_unique" UNIQUE("course_name")
);
--> statement-breakpoint
CREATE TABLE "enroll" (
	"cid" varchar(26) NOT NULL,
	"uid" varchar(26) NOT NULL,
	"progress_percent" integer NOT NULL,
	"enrolled_at" date NOT NULL,
	CONSTRAINT "enroll_cid_uid_pk" PRIMARY KEY("cid","uid")
);
--> statement-breakpoint
CREATE TABLE "lesson" (
	"leid" varchar(26) PRIMARY KEY NOT NULL,
	"chid" varchar(26) NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	"video_url" text,
	"order_index" integer NOT NULL,
	"create_at" date NOT NULL,
	"updated_at" date NOT NULL,
	CONSTRAINT "lesson_chid_title_order_unique" UNIQUE("chid","title","order")
);
--> statement-breakpoint
CREATE TABLE "module" (
	"mhid" varchar(26) PRIMARY KEY NOT NULL,
	"order" varchar(26) NOT NULL,
	"cid" varchar(26) NOT NULL,
	"title" text NOT NULL,
	"create_at" date NOT NULL,
	"updated_at" date NOT NULL,
	CONSTRAINT "module_cid_title_order_unique" UNIQUE("cid","title","order")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"pid" varchar(26) PRIMARY KEY NOT NULL,
	"permission" varchar(255) NOT NULL,
	CONSTRAINT "permissions_permission_unique" UNIQUE("permission")
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"tid" varchar(26) PRIMARY KEY NOT NULL,
	"tag_name" text NOT NULL,
	CONSTRAINT "tag_tag_name_unique" UNIQUE("tag_name")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"uid" varchar(26) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"create_at" date NOT NULL,
	"updated_at" date NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "users_permissions" (
	"user_id" varchar(26) NOT NULL,
	"pid" varchar(26) NOT NULL,
	"create_at" date NOT NULL,
	"updated_at" date NOT NULL,
	CONSTRAINT "users_permissions_pid_user_id_pk" PRIMARY KEY("pid","user_id")
);
--> statement-breakpoint
CREATE TABLE "watched_lessons" (
	"wlid" varchar(26) PRIMARY KEY NOT NULL,
	"uid" varchar(26) NOT NULL,
	"leid" varchar(26) NOT NULL,
	"watched_at" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_tag_id_tag_tid_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("tid") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enroll" ADD CONSTRAINT "enroll_cid_course_cid_fk" FOREIGN KEY ("cid") REFERENCES "public"."course"("cid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enroll" ADD CONSTRAINT "enroll_uid_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."user"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson" ADD CONSTRAINT "lesson_chid_module_mhid_fk" FOREIGN KEY ("chid") REFERENCES "public"."module"("mhid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module" ADD CONSTRAINT "module_cid_course_cid_fk" FOREIGN KEY ("cid") REFERENCES "public"."course"("cid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_user_id_user_uid_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_permissions" ADD CONSTRAINT "users_permissions_pid_permissions_pid_fk" FOREIGN KEY ("pid") REFERENCES "public"."permissions"("pid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watched_lessons" ADD CONSTRAINT "watched_lessons_uid_user_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."user"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watched_lessons" ADD CONSTRAINT "watched_lessons_leid_lesson_leid_fk" FOREIGN KEY ("leid") REFERENCES "public"."lesson"("leid") ON DELETE cascade ON UPDATE no action;