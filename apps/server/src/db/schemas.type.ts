import {
  courses,
  enrollments,
  lessons,
  modules,
  permissions,
  tags,
  users,
  usersPermissions,
  watchedLessons,
} from "./schemas";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Permission = typeof permissions.$inferSelect;
export type NewPermission = typeof permissions.$inferInsert;

export type UsersPermission = typeof usersPermissions.$inferSelect;
export type NewUsersPermission = typeof usersPermissions.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;

export type Module = typeof modules.$inferSelect;
export type NewModule = typeof modules.$inferInsert;

export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;

export type WatchedLesson = typeof watchedLessons.$inferSelect;
export type NewWatchedLesson = typeof watchedLessons.$inferInsert;
