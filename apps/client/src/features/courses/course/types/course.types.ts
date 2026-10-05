export type Course = Awaited<ReturnType<typeof import("#/utils/orpc").orpc.courses.getCourse>>;

export type CourseModule = NonNullable<Course>["modules"][number];

export type CourseLesson = CourseModule["lessons"][number];
