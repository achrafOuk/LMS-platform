import {
  adminNavLinkClassName,
} from '../constants/adminStyles'
import { Link } from '@tanstack/react-router'

const navItems = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/dashboard/courses', label: 'Courses' },
] as const

export function AdminNav() {
  return (
    <nav aria-label="Admin" className="mb-8 border-b border-border pb-4">
      <ul className="flex flex-wrap gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={adminNavLinkClassName}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
