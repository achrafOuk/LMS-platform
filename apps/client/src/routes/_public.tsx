import { requireGuest } from '#/features/auth/utils/requireGuest'
import { NavBarGuest } from '#/shared/navbar/components/NavBarGuest'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  beforeLoad: requireGuest,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NavBarGuest />
      <Outlet />
    </>
  )
}
