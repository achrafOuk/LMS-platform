import { useConfirmCheckoutSession } from "#/features/checkout/queries/useConfirmCheckoutSession";
import { Button } from "#/features/shared/button/components/Button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/_protected/dashboard/checkout/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id:
      typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const { session_id: sessionId } = Route.useSearch();
  const { mutate, isPending, isError, error, data, isSuccess } =
    useConfirmCheckoutSession();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || startedRef.current) return;
    startedRef.current = true;
    mutate(sessionId);
  }, [sessionId, mutate]);

  if (!sessionId) {
    return (
      <div className="mx-auto flex max-w-lg flex-col gap-4 py-10">
        <h1 className="text-2xl font-semibold text-foreground">
          Missing checkout session
        </h1>
        <p className="text-sm text-muted-foreground">
          We could not find a payment session to confirm.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (isPending || (!isSuccess && !isError)) {
    return (
      <div className="mx-auto flex max-w-lg flex-col gap-4 py-10">
        <h1 className="text-2xl font-semibold text-foreground">
          Confirming your payment…
        </h1>
        <p className="text-sm text-muted-foreground">
          Hang tight while we enroll you in the course.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-lg flex-col gap-4 py-10">
        <h1 className="text-2xl font-semibold text-foreground">
          Payment confirmation failed
        </h1>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <Button variant="primary" onClick={() => mutate(sessionId)}>
          Try again
        </Button>
      </div>
    );
  }

  const courseSlug = data?.courseSlug;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">
        Payment successful
      </h1>
      <p className="text-sm text-muted-foreground">
        You are enrolled. Continue learning whenever you are ready.
      </p>
      {courseSlug ? (
        <Link
          to="/dashboard/courses/$slug"
          params={{ slug: courseSlug }}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Continue Learning
        </Link>
      ) : (
        <Link
          to="/dashboard"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Back to dashboard
        </Link>
      )}
    </div>
  );
}
