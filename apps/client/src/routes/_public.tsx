import { NavBarGuest } from '#/shared/navbar/components/NavBarGuest'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
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
