import type { NavBarRoute } from "../types/NavBarTypes";

export const routes: NavBarRoute[] = [
        {
            link: '/',
            label: 'Home',
        },
        {
            link: '/',
            label: 'About',
        },
        {
            link: '/',
            label: 'Courses',
        }
];

export const authRoutes: NavBarRoute[] = [
        {
            link: '/dashboard',
            label: 'Dashboard',
        },
        {
            link: '/',
            label: 'About',
        },
        {
            link: '/courses',
            label: 'Courses',
        }
];