import { createFileRoute } from "@tanstack/react-router";
import { WatchPage } from "#/features/courses/watch/components/WatchPage";
import { useGetCourseModules } from "#/features/courses/watch/hooks/useGetCourseModules";

export const Route = createFileRoute(
	"/_protected/dashboard/courses/watch/$slug",
)({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const slug = params.slug;
		context.queryClient.prefetchQuery(useGetCourseModules(slug));
	},
});

function RouteComponent() {
	const { slug } = Route.useParams();

	return <WatchPage slug={slug} />;
}
