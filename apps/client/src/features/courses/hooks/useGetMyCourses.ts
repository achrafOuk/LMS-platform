import { orpc } from "#/utils/orpc"
import { queryOptions } from "@tanstack/react-query"

export const useGetMyCourses = (page: number = 1) =>
{
    return queryOptions({
        queryKey: ['my-courses', page],
        queryFn: () => orpc.courses.getMyCourses({ page }),
    });

}