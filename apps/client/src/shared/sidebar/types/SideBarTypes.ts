
export interface UserSidebarLinks {
    link: string;
    label: string;
    // roles to see the link
    permissions?: string[]
}

export interface UserSidebarProps {
    onNavigate?: () => void;
}