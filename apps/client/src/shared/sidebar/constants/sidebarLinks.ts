import type { UserSidebarLinks } from "../types/SideBarTypes";

export const URLS: UserSidebarLinks[] = [
    {
        link: '/admin/dashboard/',
        label: 'Dashboard',
        permissions: ['statistics:view'],
    },
    {
        link: '/admin/dashboard/courses/',
        label: 'Courses',
        permissions: ['course:create', 'course:update', 'course:delete', 'course:view'],
    },
];