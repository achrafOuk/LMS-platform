import { AdminNav } from '#/features/admin/components/AdminNav'
import { adminPageClassName } from '#/features/admin/constants/adminStyles'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin')({
  component: RouteComponent,
  // beforeLoad: requireAdmin
})

function RouteComponent() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className={adminPageClassName}>
        <AdminNav />
        <Outlet />
      </div>
    </div>
  )
}
