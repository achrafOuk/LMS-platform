import { useSuspenseQuery } from "@tanstack/react-query";
import { Check, Play } from "lucide-react";
import { useGetCourseModules } from "../hooks/useGetCourseModules";

export interface WatchLesson {
	leid: string | number;
	orderIndex: number;
	title: string;
	videoUrl?: string | null;
}

export interface WatchModule {
	mhid: string | number;
	order: number;
	title: string;
	lessons: WatchLesson[];
}

interface LessonRailProps {
	slug: string;
	selectedLessonId: string | number;
	onSelectLesson: (lesson: WatchLesson) => void;
}

export function LessonRail({
	slug,
	selectedLessonId,
	onSelectLesson,
}: LessonRailProps) {
	const { data: lessons } = useSuspenseQuery(useGetCourseModules(slug));
	const modules = lessons.modules;

	return (
		<aside className="flex min-h-0 w-full flex-col border-border/30 border-t bg-background lg:w-[21rem] lg:border-t-0 lg:border-l">
			<div className="border-border/30 border-b px-5 py-4">
				<p className="font-semibold text-primary text-xs uppercase tracking-[0.18em]">
					Course outline
				</p>
			</div>
			<div className="min-h-0 flex-1 overflow-y-auto">
				{modules.map((module) => (
					<section
						key={module.mhid}
						className="border-border/20 border-b last:border-b-0"
					>
						<div className="px-5 pt-5 pb-2">
							<p className="font-medium text-muted-foreground text-xs">
								Module {module.order}
							</p>
							<h2 className="mt-1 font-semibold text-foreground/90 text-sm">
								{module.title}
							</h2>
						</div>
						<div className="px-3 pb-3">
							{module.lessons.map((lesson) => {
								const isSelected = lesson.leid === selectedLessonId;

								return (
									<button
										key={lesson.leid}
										type="button"
										onClick={() => onSelectLesson(lesson)}
										className={`flex w-full items-start gap-3 px-2 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected ? "bg-primary/15 text-background" : "text-muted-foreground hover:bg-background/5 hover:text-background/90"}`}
										aria-current={isSelected ? "true" : undefined}
									>
										<span
											className={`mt-0.5 flex size-5 shrink-0 items-center justify-center ${isSelected ? "text-primary" : "text-muted-foreground"}`}
										>
											{isSelected ? (
												<Play
													className="size-4 fill-current"
													aria-hidden="true"
												/>
											) : (
												<Check className="size-4" aria-hidden="true" />
											)}
										</span>
										<span className="text-sm leading-5">
											{lesson.orderIndex}. {lesson.title}
										</span>
									</button>
								);
							})}
						</div>
					</section>
				))}
			</div>
		</aside>
	);
}
