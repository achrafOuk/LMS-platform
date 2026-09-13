import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";


export const useGetTags = () => {
    return queryOptions({
        queryKey: ['tags'],
        queryFn: () => orpc.courses.getCourseTag(),
    })
}