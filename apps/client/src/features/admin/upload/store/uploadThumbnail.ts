import { orpc } from "#/utils/orpc";
import { removeMediaValidator } from "@tanstack-start-hono/validators/upload";
import { create } from "zustand";

interface UploadThumbnailState {
    thumbnail: string | null;
    thumbnailKey: string | null;
    error: string | null;
    setThumbnail: (thumbnail: string, thumbnailKey: string) => void;
    removeThumbnail: () => Promise<void>;
    setUploadError: (error: string) => void;
    clearUploadError: () => void;
}

export const useUploadThumbnail = create<UploadThumbnailState>((set, get)=>({
    thumbnail: null,
    thumbnailKey: null,
    error: null,
    setThumbnail: async (thumbnail: string, thumbnailKey: string) => {
        if (get().thumbnailKey !== null) {
            await get().removeThumbnail();
        }
        set({ thumbnail, thumbnailKey })
    },
    removeThumbnail: async () => {
        const filename = get().thumbnailKey;
        if (!filename) return;

        const parsed = removeMediaValidator.safeParse({ filename });
        if (parsed.success) {
            await orpc.media.removeMedia(parsed.data);
            set({ thumbnail: null, thumbnailKey: null });
        }
    },
    setUploadError: (error: string) => set({ error }),
    clearUploadError: () => set({ error: null }),
}));