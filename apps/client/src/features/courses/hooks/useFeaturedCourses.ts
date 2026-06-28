import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";

export function getFeaturedCoursesQueryOptions(page: number) {
  return queryOptions({
    queryKey: ['featured-courses', page],
    queryFn: () => orpc.courses.getFeaturedCourses({ page }),
  });
}

export function useGetFeaturedCourses(page: number) {
  return getFeaturedCoursesQueryOptions(page);
}
