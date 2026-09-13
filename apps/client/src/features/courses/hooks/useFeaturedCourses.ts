import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";

export function getFeaturedCoursesQueryOptions(page= 1, tags:string[]=[], courseName='') {
  return queryOptions({
    queryKey: ['featured-courses', page],
    // queryFn: () => orpc.courses.getFeaturedCourses({ page }),
    queryFn: () => orpc.courses.searchCourses({page, course:courseName, types:tags}),
  });
}

export function useGetFeaturedCourses(page: number) {
  return getFeaturedCoursesQueryOptions(page);
}
