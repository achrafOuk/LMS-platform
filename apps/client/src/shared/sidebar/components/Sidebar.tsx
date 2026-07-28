import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { cn } from "#/utils/cn";
import type {  UserSidebarLinkProps, UserSidebarLinks, UserSidebarProps } from "../types/SideBarTypes";
import { URLS } from "../constants/sidebarLinks";
import { type PermissionTypes } from "@tanstack-start-hono/shared/rbac";
import { useMe } from "#/features/auth/hooks/useMe";
import { useQuery } from "@tanstack/react-query";
import { Button } from "#/features/shared/button/components/Button";

export function UserSidebar({ onNavigate }: UserSidebarProps) 
{
    // get the user permissions
    const { data:user } = useQuery(useMe());
    const userPermissions: PermissionTypes[] = user?.user?.userPermissions?.map((permission) => permission.permission as PermissionTypes) ?? [];
    console.log('user:', user);

    return (
        <UserSidebarComponent>
            <UserSidebarComponent.Body>
                <UserSidebarComponent.Header onNavigate={onNavigate}>
                </UserSidebarComponent.Header>
                <UserSidebarComponent.Links>
                    {
                        URLS.map((url: UserSidebarLinks) =>(
                            <UserSidebarComponent.Link key={url.link + url.label} permissions={url.permissions} userPermissions={userPermissions} >
                                <Link to={url.link} onClick={onNavigate} className="text-white text-bold">
                                    {url.label}
                                </Link>
                            </UserSidebarComponent.Link >
                        ))
                    }
                </UserSidebarComponent.Links>   
            </UserSidebarComponent.Body>
            <UserSidebarComponent.Footer>
                <Button variant="secondary" onClick={() => {}} className="w-full rounded-none">
                Logout
                </Button>
            </UserSidebarComponent.Footer>
        </UserSidebarComponent>
    )
}

const UserSidebarComponent =  ({children}: {children: React.ReactNode}) => 
{
    return (
        <aside className={cn("bg-primary text-white h-full flex flex-col  justify-between gap-4 p-4 overflow-y-auto ")}>
            {children}
        </aside>
    )
}

UserSidebarComponent.Header = ({ onNavigate }: UserSidebarProps) => 
{
    const { data:user } = useQuery(useMe());
    const canSeeStatistics = user?.user?.userPermissions?.filter((permission) => permission.permission === 'statistics:view');
    const url = canSeeStatistics ? '/admin/dashboard' : '/dashboard';
    return (
            <Link
                to={url}
                onClick={onNavigate}
                className="flex flex-row items-center gap-2"
            >
                <GraduationCap />
                LMS platform
            </Link>
    )
}

UserSidebarComponent.Body = ({children}: {children: React.ReactNode}) => 
{
    return (
        <section className="flex flex-col gap-4">
            {children}
        </section>
    )
}


UserSidebarComponent.Links = ({children}: {children: React.ReactNode}) => 
{
    return (
        <section className="flex flex-col gap-2">
            {children}
        </section>
    )
}

UserSidebarComponent.Empty = () => 
{
    return (
        <></>
    )
}

UserSidebarComponent.Link = ({children, permissions, userPermissions} : UserSidebarLinkProps) => 
{
    // check if the user has the permissions to access the link
    let canUserAccess = permissions?.every((permission) => userPermissions.includes(permission)) || false;
    return (
        <>
         { canUserAccess ? <>{children}</> : <UserSidebarComponent.Empty /> }
        </>
    )
}

UserSidebarComponent.Footer = ({children}: {children: React.ReactNode}) => 
{
    return (
        <footer>
            {children}
        </footer>
    )
}