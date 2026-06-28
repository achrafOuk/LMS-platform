import { AdminCoursesTable } from '#/features/courses/components/AdminCoursesTable'
import { Pagination } from '#/features/courses/components/Pagination'
import { useGetFeaturedCourses } from '#/features/courses/hooks/useFeaturedCourses'
import { paginationQueryValidator } from '@tanstack-start-hono/validators/pagination'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/dashboard/courses/')({
  validateSearch: (search) => paginationQueryValidator.parse(search),
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(useGetFeaturedCourses(deps.page))
  },
})

function RouteComponent() {
  const { page } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data } = useSuspenseQuery(useGetFeaturedCourses(page))

  function handlePageChange(nextPage: number) {
    void navigate({ search: { page: nextPage } })
  }

  return (
    <section className="flex flex-col gap-6">
      <AdminCoursesTable courses={data.data} />
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  )
}
