import { useMe } from '#/features/auth/hooks/useMe';
import { CourseCard } from '#/features/courses/components/CourseCard';
import { featuredCourses } from '#/features/courses/constants/featuredCourses';
import { CourseProgress } from '#/features/courses/dashboard/components/CoursePorgress';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
  loader: async ({context}) => {
    await context.queryClient.prefetchQuery(useMe());
  },
})

function DashboardPage() {
  const { data:user } = useSuspenseQuery(useMe());
  // course-card bg-white rounded-[2.5rem] overflow-hidden border border-cloud-100 flex flex-col group h-full

  return (
    <div className="mx-auto w-full p-4 w-[90%] mx-auto w-[90%] mx-auto space-y-4 ">

      <section className="flex flex-col  bg-foreground text-background p-4">
        <p className="text-2xl font-semibold">My Learning Dashboard</p>
        <p>Welcome to your learning journey, {user.user.email}</p>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          featuredCourses.map((course) => (
            <CourseProgress key={course.slug} course={course} />
          ))
        }
      </main>
    </div>
  )
}
