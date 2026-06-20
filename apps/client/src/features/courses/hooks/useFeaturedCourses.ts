import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";

export const featuredCoursesQueryOptions  = queryOptions({
  queryKey: ['featured-courses'],
  queryFn: () => orpc.courses.getFeaturedCourses(),
});

export function useGetFeaturedCourses() {
  return featuredCoursesQueryOptions;
}