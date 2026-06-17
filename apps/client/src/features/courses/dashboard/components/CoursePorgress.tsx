import { CourseCard } from "../../components/CourseCard";
import type { CourseType } from "../../types/Course";

export function CourseProgress({course}: {course:CourseType}) {
    return (
        <CourseCard key={course.slug} course={course} >
            <div className="flex flex-col gap-2">
                <p className="text-sm text-primary">80% completed</p>
                <div className="flex w-full bg-accent">
                    <div className="w-[80%] bg-primary px-2 py-1"> </div>
                </div>
            </div>
            <button type="button" className="bg-foreground text-background px-4 py-2  cursor-pointer w-full">
            Resume Learning
            </button>
        </CourseCard>
        

    )
}