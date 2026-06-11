export const reviewDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
})

export function formatReviewDate(isoDate: string): string {
  return reviewDateFormatter.format(new Date(isoDate))
}

export const reviewCardClassName =
  'flex min-w-0 flex-col gap-3 border border-border bg-card p-5 transition-[border-color] duration-200 motion-safe:hover:border-primary/40'

export const reviewAvatarClassName =
  'size-12 shrink-0 rounded-full object-cover'

export const reviewHandleClassName = 'text-sm text-muted-foreground'

export const reviewQuoteClassName = 'text-pretty text-base leading-relaxed text-foreground'
