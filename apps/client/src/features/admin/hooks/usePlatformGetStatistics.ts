import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";

export function usePlatformGetStatistics()
{
    return queryOptions({
        queryKey: ['statistics'],
        queryFn: () => orpc.statistics.getCourseStatic(),
    })
}