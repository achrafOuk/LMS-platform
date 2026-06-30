const CoursePermissions = [
    "course:view", "course:create", "course:update", "course:delete", "course:enroll"
] as const;


const userPermissions = [
    "user:view", "user:update", "user:create", "user:delete"
] as const;


const profilePermissions = [
    "profile:view", "profile:update", "profile:create", "profile:delete", "profile:stats"
] as const;

const statisticsPermissions = [
    "statistics:view"
] as const;

export const permissions = [...CoursePermissions, ...userPermissions, ...statisticsPermissions, ...profilePermissions] as const;


// default permissions map
export const permissionsMap = {
    admin: permissions,
    user: [
        ...profilePermissions, 
        ...CoursePermissions.filter((permission) => permission === "course:view" || permission === "course:enroll" ),
    ],
} as const;


export type PermissionTypes = typeof permissions[number];