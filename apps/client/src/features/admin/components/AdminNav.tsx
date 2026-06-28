import {
  adminNavLinkActiveClassName,
  adminNavLinkClassName,
} from '../constants/adminStyles'
import { Link } from '@tanstack/react-router'
import { cn } from '#/utils/cn'

const navItems = [
  { to: '/admin/dashboard' as const, label: 'Overview' },
  { to: '/admin/dashboard/courses' as const, label: 'Courses', search: { page: 1 } },
]

export function AdminNav() {
  return (
    <nav aria-label="Admin" className="mb-8 border-b border-border pb-4">
      <ul className="flex flex-wrap gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              {...('search' in item ? { search: item.search } : {})}
              className={adminNavLinkClassName}
              activeProps={{
                className: cn(adminNavLinkClassName, adminNavLinkActiveClassName),
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
