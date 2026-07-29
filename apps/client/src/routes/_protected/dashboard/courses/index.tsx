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
    <div className="mx-auto  px-4 py-16  flex flex-col gap-10">
      <h1 className="font-serif text-3xl font-medium text-foreground text-center">
        Browse courses
      </h1>
      <div className="flex flex-row gap-10">
        <Searchbar />
        <div className="flex flex-1 flex-col gap-10">
          <CourseGrid courses={featuredCourses.data}  linkTo={'/dashboard/courses/$slug'}/>
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
