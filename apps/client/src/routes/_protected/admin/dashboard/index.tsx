import { AdminPageHeader } from '#/features/admin/components/AdminPageHeader'
import {
  adminFrameClassName,
  adminStatCardClassName,
} from '#/features/admin/constants/adminStyles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const statistics = [
    {
      name: 'Courses',
      value: 100,
    },
    {
      name: 'Users',
      value: 100,
    },
    {
      name: 'Enrollments',
      value: 100,
    },
    {
      name: 'Revenue',
      value: 100,
    },
  ]

  return (
    <section className="flex flex-col gap-6">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((stat) => (
          <div key={stat.name} className={adminStatCardClassName}>
            <h2 className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </h2>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className={`${adminFrameClassName} px-6 py-12 text-center`}>
        <p className="text-sm text-muted-foreground">
          Analytics and activity charts will appear here.
        </p>
      </div>
    </section>
  )
}
