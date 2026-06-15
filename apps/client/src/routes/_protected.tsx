import { requireAuth } from '#/features/auth/utils/requireAuth'
import { NavBarUser } from '#/shared/navbar/components/NavBarUser'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return (
    <>
      <NavBarUser />
      <Outlet />
    </>
  )
}
