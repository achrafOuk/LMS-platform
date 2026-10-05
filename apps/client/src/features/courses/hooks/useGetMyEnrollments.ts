import { orpc } from "#/utils/orpc"
import { queryOptions } from "@tanstack/react-query"

export const useGetMyEnrollments = (page: number = 1) =>
{
    return queryOptions({
        queryKey: ['my-enrollments', page],
        queryFn: () => orpc.enroll.getMyEnrollments({ page }),
    });

}
