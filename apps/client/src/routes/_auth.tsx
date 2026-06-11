import { AuthVisualPanel } from '#/features/auth/components/AuthVisualPanel'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid min-h-[calc(100dvh-5.5rem)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-8 lg:py-16">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <AuthVisualPanel />
    </div> 
  )
}
