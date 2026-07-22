import { CoursesSection } from '#/features/courses/components/CoursesSection'
import { HeroSection } from '#/features/landingpage/HeroSection/HeroSection'
import { Counters } from '#/features/landingpage/KPI/components/counters'
import { counters } from '#/features/landingpage/KPI/constansts/couters'
import { ReviewsSection } from '#/features/reviews/components/ReviewsSection'
import { orpc } from '#/utils/orpc'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export function useFeaturedCourses() {
  return queryOptions({
    queryKey: ['featured-courses'],
    queryFn: async () => await orpc.courses.getFeaturedCourses({page: 1})
  })
}

export const Route = createFileRoute('/_public/')({
  component: Home,
  loader: async ({context}) => {
    context.queryClient.prefetchQuery(useFeaturedCourses());
  }
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


