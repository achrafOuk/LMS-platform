import { useMe } from '#/features/auth/hooks/useMe';
import { featuredCourses } from '#/features/courses/constants/featuredCourses';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'

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
            <section key={course.slug} className="flex flex-col aspect-[16/10] space-y-2" >
              <img src={course.image} alt={course.title} 
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"

              />
              <Link to={`/dashboard`}>{course.title}</Link>
              <div > 
                <p className="text-sm text-primary">80% completed</p>
              <div className="flex w-full bg-accent">
                <div className="w-[80%] bg-primary px-2 py-1"> </div>
              </div>
              </div>

              <button type="button" className="bg-foreground text-background px-4 py-2  cursor-pointer">
                Resume Learning
              </button>
            </section>
          ))
        }
      </main>

    </div>
  )
}
