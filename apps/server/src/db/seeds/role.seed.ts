import { permissions as permissionsArray, permissionsMap, type PermissionTypes } from "@tanstack-start-hono/shared/rbac";
import { ulid } from "ulid";
import { db } from ".././drizzle.client";
import { permissions, usersPermissions } from "../schemas";
import { eq } from "drizzle-orm";

function createPermissions(permission: PermissionTypes) {
    return {
        pid: ulid(),
        permission,
    };
}

export async function seedRolesAndPermissions() {
  const roleNames = Object.keys(permissionsMap);
  const permissionValues = permissionsArray.map(createPermissions);

  await db
    .insert(permissions)
    .values(permissionValues)
    .onConflictDoNothing({ target: permissions.permission });

  console.log(`Seeded permissions for roles: ${roleNames.join(", ")}`);
  console.log(`Total permissions: ${permissionValues.length}`);

  for (const [role, rolePermissions] of Object.entries(permissionsMap)) {
    console.log(`  ${role}: ${rolePermissions.length} permissions`);
  }
}

async function findPermission(permission: PermissionTypes)
{
    const permissionRecord = await db.select({
        pid: permissions.pid,
    })
    .from(permissions)
    .where(eq(permissions.permission, permission));

    if (!permissionRecord || permissionRecord.length === 0 || !permissionRecord[0]) {
        return null;
    }

    return permissionRecord[0].pid;
}

// todo: split this function into smaller functions
export async function seedRoleForUser(userId: string, role: 'admin' | 'user')
{
    try
    {
        const adminPermissions = permissionsMap[role];
        const pids = (
        await Promise.all(
            adminPermissions.map((name) => findPermission(name)),
        )
        ).filter((pid): pid is string => pid != null);

        const userPermissionsRecords = pids.map((pid) => ({
            userId: userId,
            pid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }));
        await db.insert(usersPermissions).values(userPermissionsRecords);
    }
    catch (error)
    {
        console.error("Seeding role for user failed:", error);
        return null;
    }

}

export async function seedRoles() {
  await seedRolesAndPermissions();
}
