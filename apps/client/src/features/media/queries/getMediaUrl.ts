import { orpc } from "#/utils/orpc";
import { queryOptions } from "@tanstack/react-query";

export function getMediaUrlOptions(filename: string) {
    return queryOptions({
        queryKey: ["media", filename],
        queryFn: () => orpc.media.getMediaUrl({ filename }),
        staleTime: 5 * 60 * 1000,
    });
}
