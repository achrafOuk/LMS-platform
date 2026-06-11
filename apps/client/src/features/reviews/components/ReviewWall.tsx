import { featuredReviews } from '../constants/featuredReviews'
import { ReviewCard } from './ReviewCard'

export function ReviewWall() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {featuredReviews.map((review) => (
        <div key={review.id} className="min-w-0">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  )
}
