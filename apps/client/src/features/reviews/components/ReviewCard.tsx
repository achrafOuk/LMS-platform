import type { ReviewType } from '../types/Review'
import {
  formatReviewDate,
  reviewAvatarClassName,
  reviewCardClassName,
  reviewHandleClassName,
  reviewQuoteClassName,
} from '../constants/reviewStyles'

export function ReviewCard({ review }: { review: ReviewType }) {
  return (
    <article className={reviewCardClassName}>
      <header className="flex min-w-0 gap-3">
        <img
          src={review.avatar}
          alt={`Portrait of ${review.authorName}`}
          width={review.avatarWidth}
          height={review.avatarHeight}
          loading="lazy"
          className={reviewAvatarClassName}
        />

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <p className="truncate font-semibold text-foreground">{review.authorName}</p>
            <span className="text-muted-foreground" aria-hidden="true">
              ·
            </span>
            <time
              dateTime={review.postedAt}
              className="shrink-0 text-sm text-muted-foreground"
            >
              {formatReviewDate(review.postedAt)}
            </time>
          </div>
          <p className={reviewHandleClassName}>
            <span translate="no">@{review.handle}</span>
          </p>
        </div>
      </header>

      <blockquote className={reviewQuoteClassName}>
        <p>{review.quote}</p>
        <footer className="sr-only">{review.authorName}</footer>
      </blockquote>
    </article>
  )
}
