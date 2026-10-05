import { PlaySquare } from "lucide-react";

interface YouTubePlayerProps {
	lessonTitle?: string;
	videoUrl?: string | null;
}

function getYouTubeVideoId(videoUrl: string) {
	try {
		const url = new URL(videoUrl);

		if (url.hostname === "youtu.be") {
			return url.pathname.slice(1).split("/")[0] || null;
		}

		if (url.hostname.includes("youtube.com")) {
			if (url.pathname === "/watch") {
				return url.searchParams.get("v");
			}

			if (
				url.pathname.startsWith("/embed/") ||
				url.pathname.startsWith("/shorts/")
			) {
				return url.pathname.split("/")[2] || null;
			}
		}
	} catch {
		return null;
	}

	return null;
}

export function YouTubePlayer({ lessonTitle, videoUrl }: YouTubePlayerProps) {
	const videoId = videoUrl ? getYouTubeVideoId(videoUrl) : null;

	if (!videoId) {
		return (
			<div className="flex aspect-video w-full flex-col items-center justify-center gap-3 bg-foreground px-6 text-center text-background">
				<PlaySquare className="size-10 text-primary" aria-hidden="true" />
				<div>
					<p className="font-semibold">This lesson has no video yet</p>
					<p className="mt-1 text-muted-foreground text-sm">
						Check back soon for the next lesson.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="aspect-video h-full w-full bg-foreground">
			<iframe
				className="size-full"
				src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
				title={lessonTitle ? `Video: ${lessonTitle}` : "Course lesson video"}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
			/>
		</div>
	);
}
