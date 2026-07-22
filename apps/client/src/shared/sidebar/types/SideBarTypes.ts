import type { PermissionTypes } from "@tanstack-start-hono/shared/rbac";

export interface UserSidebarLinks {
    link: string;
    label: string;
    // roles to see the link
    permissions: PermissionTypes[]
}

export interface UserSidebarProps {
    onNavigate?: () => void;
}

export interface UserSidebarLinkProps extends   Pick<UserSidebarLinks, "permissions"> {
    children: React.ReactNode;
    userPermissions: PermissionTypes[];

}