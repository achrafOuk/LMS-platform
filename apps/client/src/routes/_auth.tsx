import { AuthVisualPanel } from '#/features/auth/components/AuthVisualPanel'
import { requireGuest } from '#/features/auth/utils/requireGuest'
import { NavBarGuest } from '#/shared/navbar/components/NavBarGuest'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: requireGuest,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <NavBarGuest />
      <div className="grid min-h-[calc(100dvh)] lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-12 sm:px-8 lg:py-16">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
        <AuthVisualPanel />
      </div>
    </>
  )
}
