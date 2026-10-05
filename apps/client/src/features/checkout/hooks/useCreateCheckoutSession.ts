import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { orpc } from "#/utils/orpc";

export function useCreateCheckoutSession() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) =>
      orpc.checkout.createCheckoutSession({ courseId }),
    onSuccess: async (result) => {
      if (result.type === "checkout") {
        window.location.assign(result.checkoutUrl);
        return;
      }

      if (result.type === "enrolled") {
        await queryClient.invalidateQueries({
          queryKey: ["user-is-enrolled-in-course", result.courseSlug],
        });
        await navigate({
          to: "/dashboard/courses/$slug",
          params: { slug: result.courseSlug },
        });
      }
    },
  });
}
