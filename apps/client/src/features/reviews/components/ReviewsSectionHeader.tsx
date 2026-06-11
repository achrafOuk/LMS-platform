import {
  featuredReviewsSubheading,
  REVIEWS_HEADING_ID,
} from '../constants/featuredReviews'

export function ReviewsSectionHeader() {
  return (
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
      <h2
        id={REVIEWS_HEADING_ID}
        className="text-balance font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-foreground"
      >
        What learners are saying
      </h2>
      <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
        {featuredReviewsSubheading}
      </p>
    </header>
  )
}
