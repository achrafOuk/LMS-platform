import { CourseGrid } from '#/features/courses/components/CourseGrid';
import { Pagination } from '#/features/courses/components/Pagination';
import { useGetFeaturedCourses } from '#/features/courses/hooks/useFeaturedCourses';
import { CourseError } from '#/features/dashboard/courses/components/CourseError';
import { Searchbar } from '#/features/dashboard/courses/components/searchbar';
import { paginationQueryValidator } from '@tanstack-start-hono/validators/pagination';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/dashboard/courses/')({
  validateSearch: (search) => paginationQueryValidator.parse(search),
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ context, deps }) => {
    await context.queryClient.prefetchQuery(useGetFeaturedCourses(deps.page));
  },
  errorComponent: CourseError,
  

})

function RouteComponent() {
  const { page } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: featuredCourses } = useSuspenseQuery(useGetFeaturedCourses(page));

    return (
    <div className="mx-auto flex flex-col gap-10 px-4 py-16">
      <h1 className="text-center font-medium font-serif text-3xl text-foreground">
        Browse courses
      </h1>
      <div className="flex flex-row gap-10">
        <Searchbar />
        <div className="flex flex-1 flex-col gap-10">
          <CourseGrid courses={featuredCourses.data}  linkTo={'/dashboard/courses/watch/$slug'}/>
          <Pagination
            currentPage={featuredCourses.currentPage}
            totalPages={featuredCourses.totalPages}
            onPageChange={(page:number) => navigate({ search: { page } })}
          />
        </div>
      </div>
    </div>
  )

}
