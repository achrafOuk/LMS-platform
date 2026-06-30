import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { cn } from "#/utils/cn";

interface UserSidebarLinks {
    link: string;
    label: string;
    // roles to see the link
    permissions?: string[]
}

interface UserSidebarProps {
    onNavigate?: () => void;
}

export function UserSidebar({ onNavigate }: UserSidebarProps) {
    // /admin/dashboard/
    const urls: UserSidebarLinks[] = [
        {
            link: '/admin/dashboard/',
            label: 'Dashboard',
            permissions: ['dashboard:view'],
        },
        {
            link: '/admin/dashboard/courses/',
            label: 'Courses',
            permissions: ['courses:manage:view'],
        },
    ];

    return (
        <aside className={cn("bg-primary text-white h-full flex flex-col gap-4 p-4 overflow-y-auto")}>
            <Link
                to="/admin/dashboard"
                onClick={onNavigate}
                className="flex flex-row items-center gap-2"
            >
                <GraduationCap />
                LMS platform
            </Link>
            {
                urls.map((url) => (
                    <Link
                        key={url.link}
                        to={url.link}
                        onClick={onNavigate}
                        className="text-white text-bold"
                    >
                        {url.label}
                    </Link>
                ))
            }
        </aside>
    )
}
