import type { UserSidebarLinks } from "../types/SideBarTypes";

const COURSES_URLS: UserSidebarLinks[] = 
[
    {
        link: '/dashboard',
        label: 'Dashboard',
        permissions: ['course:view'],
    },
    {
        link: '/dashboard',
        label: 'Courses',
        permissions: ['course:view'],
    },
    {
        link: '/dashboard',
        label: 'My courses',
        permissions: ['course:view'],
    },
];

const MANAGEMENT_URLS: UserSidebarLinks[] = 
[
    {
        link: '/admin',
        label: 'Dashboard',
        permissions: ['statistics:view'],
    },
    {
        link: '/admin/dashboard/courses',
        label: 'Manage courses',
        permissions: ['course:manage:view'],
    },
    
];

export const URLS: UserSidebarLinks[] = [
    ...COURSES_URLS,
    ...MANAGEMENT_URLS,
];