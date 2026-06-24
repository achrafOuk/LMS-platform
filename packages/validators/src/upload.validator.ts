import z from "zod";

export const uploadMediaValidator = z.object({
    mimeType: z.enum(['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4']),
});

export type UploadValidatorType = z.infer<typeof uploadMediaValidator>;

export const getMediaUrlValidator = z.object({
    filename: z.string(),
});

export type GetMediaUrlValidatorType = z.infer<typeof getMediaUrlValidator>;