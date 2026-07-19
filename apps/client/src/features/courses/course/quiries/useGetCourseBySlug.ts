import { orpc } from "#/utils/orpc"
import { queryOptions } from "@tanstack/react-query"

export const useGetCourseBySlug = (slug: string) => {
    return queryOptions({
        queryKey: ['course', slug],
        queryFn: () => orpc.courses.getCourse({ slug }),
    })
}