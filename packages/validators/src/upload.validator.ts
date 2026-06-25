import z from "zod";

export const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const;

const videoMimeTypes = ['video/mp4'] as const;

export const uploadMediaValidator = z.object({
    mimeType: z.enum([...imageMimeTypes, ...videoMimeTypes]),
});

export const uploadImageValidator = z.object({
    mimeType: z.enum(imageMimeTypes),

});

export type UploadValidatorType = z.infer<typeof uploadMediaValidator>;

export const getMediaUrlValidator = z.object({
    filename: z.string(),
});

export const notifyMediaUploadedValidator = z.object({
    filename: z.string().min(1),
    mimeType: z.enum(['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4']),
});

export const removeMediaValidator = notifyMediaUploadedValidator.pick({ filename: true });

export type GetMediaUrlValidatorType = z.infer<typeof getMediaUrlValidator>;
export type NotifyMediaUploadedValidatorType = z.infer<typeof notifyMediaUploadedValidator>;
export type RemoveMediaValidatorType = z.infer<typeof removeMediaValidator>;
