const CoursePermissions = [
    "course:view", "course:enroll"
] as const;


const courseManagementPermissions = [
    "course:manage:view", "course:manage:create", "course:manage:update", "course:manage:delete"
] as const;

const usersManagementPermissions = [
    "users:manage:view", "users:manage:create", "users:manage:update", "users:manage:delete"
] as const;


const profilePermissions = [
    "profile:view", "profile:update", "profile:create", "profile:delete", "profile:stats"
] as const;

const statisticsPermissions = [
    "statistics:view"
] as const;

export const permissions = [
    ...CoursePermissions,
    ...courseManagementPermissions,
    ...usersManagementPermissions,
      ...statisticsPermissions,
       ...profilePermissions
] as const;


// default permissions map
export const permissionsMap = {
    admin: permissions,
    user: [
        ...profilePermissions, 
        ...CoursePermissions.filter((permission) => permission === "course:view" || permission === "course:enroll" ),
    ],
} as const;


export type PermissionTypes = typeof permissions[number];