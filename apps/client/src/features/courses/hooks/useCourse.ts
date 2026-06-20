import { orpc } from "#/utils/orpc";
import {  queryOptions, useQuery } from "@tanstack/react-query";

export const useCourse = (slug: string) => {
    return useQuery(useCourseOptions(slug));
}

export const useCourseOptions = (slug: string) => {
    return queryOptions({
        queryKey: ['course', slug],
        queryFn: () => orpc.courses.getCourse({ slug }),
    })

}