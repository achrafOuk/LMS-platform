import { REVIEWS_HEADING_ID } from '../constants/featuredReviews'
import { ReviewWall } from './ReviewWall'
import { ReviewsSectionHeader } from './ReviewsSectionHeader'

export function ReviewsSection() {
  return (
    <section
      aria-labelledby={REVIEWS_HEADING_ID}
      className="py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:gap-12 sm:px-6 lg:px-8">
        <ReviewsSectionHeader />
        <ReviewWall />
      </div>
    </section>
  )
}
