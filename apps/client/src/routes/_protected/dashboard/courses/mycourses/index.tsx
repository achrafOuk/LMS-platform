import { CourseGrid } from '#/features/courses/components/CourseGrid'
import { Pagination } from '#/features/courses/components/Pagination'
import { useGetMyCourses } from '#/features/courses/mycourses/hooks/useGetMyCourses'
import { Searchbar } from '#/features/dashboard/courses/components/searchbar'
import { paginationQueryValidator } from '@tanstack-start-hono/validators/pagination'
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/dashboard/courses/mycourses/',
)({
  component: RouteComponent,
  validateSearch: (search) => paginationQueryValidator.parse(search),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) => {
    context.queryClient.prefetchQuery(useGetMyCourses(deps.page))
  }
})

function RouteComponent() {
    const { page } = Route.useSearch()
  const navigate = Route.useNavigate()
    const {data: mycourses} = useSuspenseQuery(useGetMyCourses(page));
    console.log("data:", mycourses);

    return (
      <div className="mx-auto flex flex-col gap-10 px-4 py-16">
        <h1 className="text-center font-medium font-serif text-3xl text-foreground">
          Browse my courses
        </h1>
        <div className="flex flex-row gap-10">
          <Searchbar />
          <div className="flex flex-1 flex-col gap-10">
            <CourseGrid courses={mycourses.data}  linkTo={'/dashboard/courses/watch/$slug'}/>
            <Pagination
              currentPage={mycourses.currentPage}
              totalPages={mycourses.totalPages}
              onPageChange={(page:number) => navigate({ search: { page } })}
            />
          </div>
        </div>
      </div>

    )
}
