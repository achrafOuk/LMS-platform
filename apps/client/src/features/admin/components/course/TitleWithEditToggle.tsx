import type { AnyFieldApi } from '@tanstack/react-form'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

import { cn } from '#/utils/cn'

import { adminActionButtonClassName } from '../../constants/adminStyles'

const inputClassName =
  'min-w-0 flex-1 rounded-xl border border-border bg-background p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

type TitleWithEditToggleProps = {
  field: AnyFieldApi
  editAriaLabel: string
  placeholder: string
  fallbackLabel: string
}

export function TitleWithEditToggle({
  field,
  editAriaLabel,
  placeholder,
  fallbackLabel,
}: TitleWithEditToggleProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(
    () => field.state.value.length === 0,
  )
  const hasError = field.state.meta.errors.length > 0
  const displayTitle = field.state.value.trim() || fallbackLabel

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {isEditingTitle ? (
          <input
            id={field.name}
            name={field.name}
            type="text"
            value={field.state.value}
            onChange={(event) => field.handleChange(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            aria-invalid={hasError ? true : undefined}
            className={cn(inputClassName, hasError && 'border-destructive focus-visible:ring-destructive')}
          />
        ) : (
          <p
            id={field.name}
            className="min-w-0 flex-1 truncate text-sm font-medium text-foreground"
          >
            {displayTitle}
          </p>
        )}
        <button
          type="button"
          aria-label={editAriaLabel}
          aria-pressed={isEditingTitle}
          onClick={() => setIsEditingTitle((current) => !current)}
          className={adminActionButtonClassName}
        >
          <PencilIcon className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
