import { cn } from "#/utils/cn";
import type { ReactNode } from "react";

interface CourseCardProps {
    children: ReactNode;
    className?: string;
};

export const CourseCardRoot = ({ children, className }: CourseCardProps) => {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {children}
        </div>
    )
}

CourseCardRoot.header = ({ children, className }: CourseCardProps) => {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {children}
        </div>
    )
}

CourseCardRoot.context = ({ children, className }: CourseCardProps) => {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {children}
        </div>
    )
}

CourseCardRoot.action = ({ children, className }: CourseCardProps) => {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {children}
        </div>
    )
}

CourseCardRoot.progress = ({ children, className }: CourseCardProps) => {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {children}
        </div>
    )
}
