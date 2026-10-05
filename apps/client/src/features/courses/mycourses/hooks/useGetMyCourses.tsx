import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";

export const useGetMyCourses = (page:number = 1) =>
{
    return queryOptions({
        queryKey: ['mycourses', page],
        queryFn: () => orpc.enroll.getMyEnrollments({page}),
    })

}
