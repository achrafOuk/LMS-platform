import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { authAlternateLinkClassName } from '../constants/authStyles'

export type AuthFormContent = {
  headingId: string
  title: string
  description: string
  alternatePrompt: string
  alternateLinkLabel: string
  alternateTo: '/login' | '/register'
}

type AuthFormShellProps = {
  content: AuthFormContent
  children: ReactNode
}

export function AuthFormShell({ content, children }: AuthFormShellProps) {
  const {
    headingId,
    title,
    description,
    alternatePrompt,
    alternateLinkLabel,
    alternateTo,
  } = content

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1
          id={headingId}
          className="text-balance font-serif text-3xl font-medium tracking-[-0.02em] text-foreground sm:text-4xl"
        >
          {title}
        </h1>
        <p className="text-pretty text-muted-foreground">{description}</p>
      </header>

      {children}

      <p className="text-center text-sm text-muted-foreground">
        {alternatePrompt}{' '}
        <Link to={alternateTo} className={authAlternateLinkClassName}>
          {alternateLinkLabel}
        </Link>
      </p>
    </div>
  )
}
