import type { UserSidebarLinks } from "../types/SideBarTypes";

export const urls: UserSidebarLinks[] = [
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