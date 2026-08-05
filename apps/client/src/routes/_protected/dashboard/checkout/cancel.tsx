import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/dashboard/checkout/cancel")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
  }),
  component: CheckoutCancelPage,
});

function CheckoutCancelPage() {
  const { course } = Route.useSearch();

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 py-10">
      <h1 className="text-2xl font-semibold text-foreground">
        Checkout canceled
      </h1>
      <p className="text-sm text-muted-foreground">
        Your payment was not completed. You can return to the course and try
        again whenever you are ready.
      </p>
      {course ? (
        <Link
          to="/dashboard/courses/$slug"
          params={{ slug: course }}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
        >
          Back to course
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
