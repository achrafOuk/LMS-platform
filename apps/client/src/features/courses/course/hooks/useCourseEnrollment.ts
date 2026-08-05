import { useMe } from "#/features/auth/hooks/useMe";
import { useCreateCheckoutSession } from "#/features/checkout/hooks/useCreateCheckoutSession";
import { orpc } from "#/utils/orpc";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useUserIsEnrolledInCourse } from "../queries/useUserIsEnrolledInCourse";

export function useCourseEnrollment(slug: string) {
  const { data: me } = useSuspenseQuery(useMe());
  const isLoggedIn = me !== null;
  const { data: isEnrolled } = useQuery(useUserIsEnrolledInCourse(slug, isLoggedIn));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createCheckoutSession = useCreateCheckoutSession();

  const enrollFree = useMutation({
    mutationFn: () => orpc.enroll.enrollInCourse({ slug }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-is-enrolled-in-course", slug],
      });
      await navigate({
        to: "/dashboard/courses/$slug",
        params: { slug },
      });
    },
  });

  return {
    isLoggedIn,
    isEnrolled: isEnrolled?.isEnrolled,
    enrollFree,
    createCheckoutSession,
    isActionPending: enrollFree.isPending || createCheckoutSession.isPending,
  };
}
