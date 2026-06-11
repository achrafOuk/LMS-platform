import type { ReviewType } from '../types/Review'

export const REVIEWS_HEADING_ID = 'learner-reviews-heading'

export const featuredReviewsSubheading =
  'Learners share how structured paths helped them ship faster.'

export const featuredReviews: ReviewType[] = [
  {
    id: 'review-jordan-lee',
    authorName: 'Jordan Lee',
    handle: 'jordan.codes',
    postedAt: '2025-01-14T10:30:00.000Z',
    quote:
      'The React patterns course finally made compound components click. I refactored our form builder in a week and cut prop drilling across three screens.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80',
    avatarWidth: 96,
    avatarHeight: 96,
  },
  {
    id: 'review-maria-santos',
    authorName: 'Maria Santos',
    handle: 'maria.dev',
    postedAt: '2025-02-03T16:45:00.000Z',
    quote:
      'TypeScript fundamentals gave me the vocabulary to review PRs with confidence. Generics stopped feeling like magic after the second module.',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80',
    avatarWidth: 96,
    avatarHeight: 96,
  },
  {
    id: 'review-alex-chen',
    authorName: 'Alex Chen',
    handle: 'alexchen',
    postedAt: '2025-03-22T09:15:00.000Z',
    quote:
      'Career skills for developers helped me lead my first architecture review. Clear progress tracking kept me finishing modules between sprint work.',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&h=96&q=80',
    avatarWidth: 96,
    avatarHeight: 96,
  },
]
