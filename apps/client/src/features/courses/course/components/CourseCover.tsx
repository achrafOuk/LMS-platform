import { getMediaUrlOptions } from "#/features/media/queries/getMediaUrl";
import { cn } from "#/utils/cn";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CourseCover({ filename, title, className }: { filename: string; title: string; className?: string }) {
    const { data } = useSuspenseQuery(getMediaUrlOptions(filename));

    return (
        <img
            src={data.url}
            alt={`Cover image for ${title}`}
            className={cn("h-full w-full ", className)}
        />
    );
}
