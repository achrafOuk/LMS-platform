import { queryOptions } from "@tanstack/react-query";
import { orpc } from "#/utils/orpc";

export function useGetCourseModules(slug: string) {
	return queryOptions({
		queryKey: ["lesson", slug],
		queryFn: () => orpc.courses.getCourseLessons({ slug }),
	});
}
