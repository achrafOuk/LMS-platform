import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { cn } from "#/utils/cn";
import type {  UserSidebarProps } from "../types/SideBarTypes";
import { urls } from "../constants/sidebarLinks";
import { SidebarLinks } from "./SidebarLinks";

export function UserSidebar({ onNavigate }: UserSidebarProps) {
    // /admin/dashboard/

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
            <SidebarLinks urls={urls} onNavigate={onNavigate} />
            {/* {
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
            } */}
        </aside>
    )
}
