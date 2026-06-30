import { Link } from "@tanstack/react-router";
import type { UserSidebarLinks } from "../types/SideBarTypes";

export function SidebarLinks({urls, onNavigate}: {urls: UserSidebarLinks[], onNavigate: (() => void) | undefined})
{
    return (
        urls.map((url: UserSidebarLinks) => (
            <Link
                key={url.link}
                to={url.link}
                onClick={onNavigate}
                className="text-white text-bold"
            >
                {url.label}
            </Link>
        ))
    )
    

}