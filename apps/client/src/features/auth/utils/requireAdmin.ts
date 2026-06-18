import {  redirect } from '@tanstack/react-router'

import { requireAuth } from './requireAuth';

export async function requireAdmin() {
    const user = await requireAuth();
    if (user.user.role !== 'ADMIN') {
        throw redirect({ to: '/dashboard' })
    }
    return user;

}
