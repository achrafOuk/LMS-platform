import { CourseGrid } from '#/features/courses/components/CourseGrid';
import { Pagination } from '#/features/courses/components/Pagination';
import { useGetFeaturedCourses } from '#/features/courses/hooks/useFeaturedCourses';
import { useGetTags } from '#/features/courses/hooks/useGetTags';
import { CourseError } from '#/features/dashboard/courses/components/CourseError';
import { Searchbar } from '#/features/dashboard/courses/components/searchbar';
import { searchCourseValidator } from '@tanstack-start-hono/validators/course';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected/dashboard/courses/')({
  validateSearch: (search) => searchCourseValidator.parse(search),
  component: RouteComponent,
  loaderDeps: ({ search }) => ({
    page: search.page,
    course: search.course,
    types: search.types,
  }),
  loader: async ({ context, deps }) => {

    await context.queryClient.prefetchQuery(useGetFeaturedCourses(deps.page, deps.types, deps.course));
    await context.queryClient.prefetchQuery(useGetTags());
  },
  errorComponent: CourseError,
})

function RouteComponent() {
  const { page, course, types } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { data: featuredCourses } = useSuspenseQuery(useGetFeaturedCourses(page));
  // useEffect(() =>{

  // });

    return (
    <div className="mx-auto flex flex-col gap-10 px-4 py-16">
      <h1 className="text-center font-medium font-serif text-3xl text-foreground">
        Browse courses
      </h1>
      <div className="flex flex-row gap-10">
        <Searchbar />
        <div className="flex flex-1 flex-col gap-10">
          <CourseGrid courses={featuredCourses.data}  linkTo={'/dashboard/courses/$slug'}/>
          <Pagination
            currentPage={featuredCourses.currentPage}
            totalPages={featuredCourses.totalPages}
            onPageChange={(page:number) => navigate({ search: { page, course, types } })}
          />
        </div>
      </div>
    </div>
  )

}
