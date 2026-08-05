import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "#/utils/orpc";

export function useConfirmCheckoutSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) =>
      orpc.checkout.confirmCheckoutSession({ sessionId }),
    onSuccess: (result) => {
      if (result.courseSlug) {
        void queryClient.invalidateQueries({
          queryKey: ["user-is-enrolled-in-course", result.courseSlug],
        });
      }
      void queryClient.invalidateQueries({
        queryKey: ["my-enrollments"],
      });
    },
  });
}
