import type { Course } from "../types/course.types";
import { LessonList } from "./LessonList";

export function ModuleList({ modules }: { modules: NonNullable<Course>["modules"] }) {
    return (
        <div className="divide-y divide-border border-y border-border">
            {modules.map((module, index) => (
                <details key={module.mhid} className="group">
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                            {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-base font-semibold text-foreground">{module.title}</span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                                {module.lessons.length} {module.lessons.length === 1 ? "lesson" : "lessons"}
                            </span>
                        </span>
                        <span
                            aria-hidden="true"
                            className="text-xl leading-none text-muted-foreground transition-transform duration-200 motion-reduce:transition-none group-open:rotate-45"
                        >
                            +
                        </span>
                    </summary>
                    <div className="pb-2 pl-0 sm:pl-13">
                        <LessonList lessons={module.lessons} />
                    </div>
                </details>
            ))}
        </div>
    );
}
