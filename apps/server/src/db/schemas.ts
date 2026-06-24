import { relations, sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  primaryKey,
  real,
  text,
  unique,
  varchar,
} from "drizzle-orm/pg-core";


export const Media =  pgTable("media", {
  uid: varchar("uid", { length: 26 }).primaryKey(),
  path: text("path").notNull(),
  mimeType: text("mime_type").notNull(),
  status: varchar("status", { length: 14 }).notNull().default("PENDING"), // PENDING, SAVED
  createdAt: date("create_at").notNull().default(sql`now()`),
  updatedAt: date("updated_at").notNull().default(sql`now()`),
})

export const users = pgTable("user", {
  uid: varchar("uid", { length: 26 }).primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: varchar("role", { length: 50 }).notNull().default("USER"), // USER, ADMIN
  createdAt: date("create_at").notNull(),
  updatedAt: date("updated_at").notNull(),
});

export const permissions = pgTable("permissions", {
  pid: varchar("pid", { length: 26 }).primaryKey(),
  permission: varchar("permission", { length: 255 }).notNull().unique(),
});

export const usersPermissions = pgTable(
  "users_permissions",
  {
    userId: varchar("user_id", { length: 26 })
      .notNull()
      .references(() => users.uid, { onDelete: "cascade" }),
    pid: varchar("pid", { length: 26 })
      .notNull()
      .references(() => permissions.pid, { onDelete: "cascade" }),
    createdAt: date("create_at").notNull(),
    updatedAt: date("updated_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.pid, table.userId] })],
);

export const tags = pgTable("tag", {
  tid: varchar("tid", { length: 26 }).primaryKey(),
  tagName: text("tag_name").notNull().unique(),
});

export const courses = pgTable("course", {
  cid: varchar("cid", { length: 26 }).primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull(),
  courseName: varchar("course_name", { length: 255 }).notNull(),
  coverUrl: text("cover_url"),
  description: text("description"),
  price: real("price").notNull(),
  tagId: varchar("tag_id", { length: 26 })
    .notNull()
    .references(() => tags.tid, { onDelete: "restrict" }),
  enrolled: integer("enrolled").notNull().default(0),
  createdAt: date("create_at").notNull(),
  updatedAt: date("updated_at").notNull(),
  
}, (table) => [
  unique("course_course_name_unique").on(table.courseName, table.slug),
]);

export const modules = pgTable(
  "module",
  {
    mhid: varchar("mhid", { length: 26 }).primaryKey(),
    order: integer("order" ).notNull(),
    cid: varchar("cid", { length: 26 })
      .notNull()
      .references(() => courses.cid, { onDelete: "cascade" }),
    title: text("title").notNull(),
    createdAt: date("create_at").notNull(),
    updatedAt: date("updated_at").notNull(),
  },
  (table) => [
    unique("module_cid_title_order_unique").on(table.cid, table.title, table.order),
  ],
);

export const lessons = pgTable(
  "lesson",
  {
    leid: varchar("leid", { length: 26 }).primaryKey(),
    chid: varchar("chid", { length: 26 })
      .notNull()
      .references(() => modules.mhid, { onDelete: "cascade" }),
    order: integer("order").notNull(),
    title: text("title").notNull(),
    videoUrl: text("video_url"),
    orderIndex: integer("order_index").notNull(),
    createdAt: date("create_at").notNull(),
    updatedAt: date("updated_at").notNull(),
  },
  (table) => [
    unique("lesson_chid_title_order_unique").on(table.chid, table.title, table.order),
  ],
);

export const enrollments = pgTable(
  "enroll",
  {
    cid: varchar("cid", { length: 26 })
      .notNull()
      .references(() => courses.cid, { onDelete: "cascade" }),
    uid: varchar("uid", { length: 26 })
      .notNull()
      .references(() => users.uid, { onDelete: "cascade" }),
    progressPercent: integer("progress_percent").notNull(),
    enrolledAt: date("enrolled_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.cid, table.uid] })],
);

export const watchedLessons = pgTable("watched_lessons", {
  wlid: varchar("wlid", { length: 26 }).primaryKey(),
  uid: varchar("uid", { length: 26 })
    .notNull()
    .references(() => users.uid, { onDelete: "cascade" }),
  leid: varchar("leid", { length: 26 })
    .notNull()
    .references(() => lessons.leid, { onDelete: "cascade" }),
  watchedAt: date("watched_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  permissions: many(usersPermissions),
  enrollments: many(enrollments),
  watchedLessons: many(watchedLessons),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  users: many(usersPermissions),
}));

export const usersPermissionsRelations = relations(usersPermissions, ({ one }) => ({
  user: one(users, {
    fields: [usersPermissions.userId],
    references: [users.uid],
  }),
  permission: one(permissions, {
    fields: [usersPermissions.pid],
    references: [permissions.pid],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  tag: one(tags, {
    fields: [courses.tagId],
    references: [tags.tid],
  }),
  modules: many(modules),
  enrollments: many(enrollments),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.cid],
    references: [courses.cid],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.chid],
    references: [modules.mhid],
  }),
  watchedBy: many(watchedLessons),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  course: one(courses, {
    fields: [enrollments.cid],
    references: [courses.cid],
  }),
  user: one(users, {
    fields: [enrollments.uid],
    references: [users.uid],
  }),
}));

export const watchedLessonsRelations = relations(watchedLessons, ({ one }) => ({
  user: one(users, {
    fields: [watchedLessons.uid],
    references: [users.uid],
  }),
  lesson: one(lessons, {
    fields: [watchedLessons.leid],
    references: [lessons.leid],
  }),
}));

