import { CourseGrid } from '#/features/courses/components/CourseGrid'
import { useGetFeaturedCourses } from '#/features/courses/hooks/useFeaturedCourses';
import { Searchbar } from '#/features/dashboard/courses/components/searchbar';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/courses')({
  component: CoursesPage,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(useGetFeaturedCourses(1));
  }
})

function CoursesPage() {
  const { data: featuredCourses } = useSuspenseQuery(useGetFeaturedCourses(1));
  return (
    <div className="mx-auto  px-4 py-16  flex flex-col gap-10">
      <h1 className="font-serif text-3xl font-medium text-foreground text-center">
        Browse courses
      </h1>
      <div className="flex flex-row gap-10">
        <Searchbar />
        <CourseGrid courses={featuredCourses.data} />
      </div>
    </div>
  )
}
