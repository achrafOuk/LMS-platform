import { getMediaUrlOptions } from "#/features/media/queries/getMediaUrl";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CourseCover({ filename, title }: { filename: string; title: string }) {
    const { data } = useSuspenseQuery(getMediaUrlOptions(filename));

    return (
        <img
            src={data.url}
            alt={`Cover image for ${title}`}
            className="h-full w-full "
        />
    );
}
