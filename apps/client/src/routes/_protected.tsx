import { requireAuth } from '#/features/auth/utils/requireAuth'
import { NavBarUser } from '#/shared/navbar/components/NavBarUser'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayout,
})

function ProtectedLayout() {
  return (
    <section className="min-h-[calc(100dvh)] ">
      <NavBarUser />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </section>
  )
}
