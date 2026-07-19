import { useMe } from "#/features/auth/hooks/useMe";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useUserIsEnrolledInCourse } from "../queries/useUserIsEnrolledInCourse";

export function useCourseEnrollment(slug: string) {
    const { data: me } = useSuspenseQuery(useMe());
    const isLoggedIn = me !== null;
    const { data: isEnrolled } = useQuery(useUserIsEnrolledInCourse(slug, isLoggedIn));

    return {
        isLoggedIn,
        isEnrolled: isEnrolled ?? false,
    };
}
