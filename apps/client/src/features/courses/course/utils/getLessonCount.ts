import type { Course } from "../types/course.types";

export function getLessonCount(course: NonNullable<Course>) {
    return course.modules.reduce((count, module) => count + module.lessons.length, 0);
}
