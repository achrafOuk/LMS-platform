import { CoursesSection } from '#/features/courses/components/CoursesSection'
import { HeroSection } from '#/features/landingpage/HeroSection/HeroSection'
import { Counters } from '#/features/landingpage/KPI/components/counters'
import { counters } from '#/features/landingpage/KPI/constansts/couters'
import { ReviewsSection } from '#/features/reviews/components/ReviewsSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: Home,
})

function Home() {
  return (
    <>
      <HeroSection />
      <Counters counters={counters} />
      <CoursesSection />
      <ReviewsSection />
    </>
  )
}
