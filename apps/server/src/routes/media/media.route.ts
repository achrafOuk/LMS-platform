import { ulid } from "ulid";
import { protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { getMediaUrlValidator, notifyMediaUploadedValidator, removeMediaValidator, uploadMediaValidator } from "@tanstack-start-hono/validators/upload";
import { db } from "../../db/drizzle.client";
import { formatFilename, generatePresignedUrl, getMediaUrl, notifyMediaUploaded, removeMedia } from "./media.service";
import { ORPCError } from "@orpc/server";

export const getPresignedUrlRoute = protectedProcedure
.input(uploadMediaValidator)
.handler(async ({ input }) => {
    const bucket = process.env.RUSTFS_BUCKET_NAME!;
    const key = ulid();
    const expiresInBySeconds = 5; // 60 seconds
    const filename = formatFilename(input.mimeType, key);
    const url = await generatePresignedUrl(bucket, filename, expiresInBySeconds, input.mimeType);
    return { url, filename };
});

export const getMediaUrlRoute = protectedProcedure
.input(getMediaUrlValidator)
.handler(async ({ input }) => {
    const bucket = process.env.RUSTFS_BUCKET_NAME!;
    const response = await getMediaUrl(bucket, input.filename);
    if (response instanceof Object && 'error' in response) 
    {
        if (response.error === 'File not found')
        {
            throw new ORPCError("NOT_FOUND", { message: response.error });
        }
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: response.error });
    }
    return { url: response };
});

export const notifyMediaUploadedRoute = protectedProcedure
.input(notifyMediaUploadedValidator)
.handler(async ({ input }) => {
    try
    {
        const media = await notifyMediaUploaded(db, input);
        return { media };
    }
    catch (error)
    {
        console.error('error in notifyMediaUploadedRoute:',error);
        throw new ORPCError("INTERNAL_SERVER_ERROR", { message: "Failed to save uploaded media" });
    }
});

export const removeMediaRoute = protectedProcedure
.input(removeMediaValidator)
.handler(async ({ input }) => {
    
    const media = await removeMedia(db, input);
    if (media instanceof Object && 'error' in media)
    {
        throw new ORPCError("NOT_FOUND", { message: media.error });
    }
    return { success: true };
});
