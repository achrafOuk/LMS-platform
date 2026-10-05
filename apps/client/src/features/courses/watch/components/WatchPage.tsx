import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useState } from "react";
import { useGetCourseModules } from "../hooks/useGetCourseModules";
import { LessonRail, type WatchLesson } from "./LessonRail";
import { YouTubePlayer } from "./YouTubePlayer";

interface WatchPageProps {
	slug: string;
}

export function WatchPage({ slug }: WatchPageProps) {
	const { data: lessons } = useSuspenseQuery(useGetCourseModules(slug));
	const modules = lessons.modules;
	const firstLesson = modules[0]?.lessons[0];
	const [selectedLesson, setSelectedLesson] = useState<WatchLesson | undefined>(
		firstLesson,
	);

	return (
		<div className="-m-4 flex min-h-[calc(100dvh-57px)] flex-col bg-background text-foreground lg:min-h-dvh lg:flex-row">
			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex min-h-16 items-center justify-between gap-4 border-border/30 border-b px-4 py-3 sm:px-6">
					<Link
						to="/dashboard/courses/$slug"
						params={{ slug }}
						className="inline-flex items-center gap-2 font-medium text-foreground/70 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						<span className="hidden sm:inline">Back to course</span>
						<span className="sm:hidden">Back</span>
					</Link>
					<div className="flex items-center gap-2 font-medium text-muted-foreground text-xs">
						<BookOpen className="size-4" aria-hidden="true" />
						<span>{modules.length} modules</span>
					</div>
				</header>

				<div className="flex flex-1 flex-col justify-center">
					<YouTubePlayer
						lessonTitle={selectedLesson?.title}
						videoUrl={selectedLesson?.videoUrl}
					/>
					{selectedLesson ? (
						<div className="px-4 py-5 sm:px-6 sm:py-6">
							<p className="font-semibold text-primary text-xs uppercase tracking-[0.18em]">
								Now watching
							</p>
							<h1 className="mt-2 max-w-3xl font-semibold text-foreground text-xl tracking-tight sm:text-2xl">
								{selectedLesson.title}
							</h1>
						</div>
					) : null}
				</div>
			</div>

			<LessonRail
				slug={slug}
				selectedLessonId={selectedLesson?.leid ?? ""}
				onSelectLesson={setSelectedLesson}
			/>
		</div>
	);
}
