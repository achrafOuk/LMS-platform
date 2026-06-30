import { requireAuth } from '#/features/auth/utils/requireAuth'
import { UserSidebar } from '#/shared/navbar/components/Sidebar'
import { useNavbarState } from '#/shared/navbar/state/navbar.state'
import { cn } from '#/utils/cn'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

export const Route = createFileRoute('/_protected')({
  beforeLoad: requireAuth,
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const toggleMenu = useNavbarState((state) => state.toggleMenu)
  const closeMenu = useNavbarState((state) => state.closeMenu)
  const isMenuOpen = useNavbarState((state) => state.isMenuOpen)

  return (
    <div className="flex min-h-dvh">
      {/* Mobile backdrop */}
      {isMenuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      ) : null}

      {/* Sidebar: static on desktop, slide-in drawer on mobile */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 max-w-[80%] transform transition-transform duration-200 ease-in-out',
          'md:static md:z-auto md:w-64 md:translate-x-0 md:transition-none',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <UserSidebar onNavigate={closeMenu} />
      </aside>

      {/* Main content */}
      <main className="flex min-h-dvh w-full flex-1 flex-col">
        <header className="flex items-center gap-3 border-b p-4 md:hidden">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="rounded-md p-1 hover:bg-muted"
          >
            <Menu />
          </button>
        </header>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
