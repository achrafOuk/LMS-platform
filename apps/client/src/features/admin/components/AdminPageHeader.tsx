import {
  adminPageHeaderClassName,
  adminPageTitleClassName,
} from '../constants/adminStyles'

type AdminPageHeaderProps = {
  title: string
  children?: React.ReactNode
}

export function AdminPageHeader({ title, children }: AdminPageHeaderProps) {
  return (
    <header className={adminPageHeaderClassName}>
      <h1 className={adminPageTitleClassName}>{title}</h1>
      {children}
    </header>
  )
}
