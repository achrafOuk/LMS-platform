import type { CourseLesson } from "../types/course.types";

export function LessonList({ lessons }: { lessons: CourseLesson[] }) {
    return (
        <ol className="divide-y divide-border">
            {lessons.map((lesson, index) => (
                <li key={lesson.leid} className="flex items-center gap-4 py-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                        {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">{lesson.title}</span>
                </li>
            ))}
        </ol>
    );
}
