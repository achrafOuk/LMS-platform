import { orpc } from "#/utils/orpc"
import { queryOptions } from "@tanstack/react-query"

export const useUserIsEnrolledInCourse = (slug: string, isLoggedIn: boolean) => {
    console.log("isLoggedIn", isLoggedIn);
    return queryOptions({
        queryKey: ['user-is-enrolled-in-course', slug],
        queryFn: () => orpc.enroll.isUserEnrolledInCourse({ slug }),
        enabled: isLoggedIn,
    })
}