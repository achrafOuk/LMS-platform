import { ulid } from "ulid";
import { protectedProcedure } from "../../orpc/middleware/auth.middleware";
import { getMediaUrlValidator, uploadMediaValidator } from "@tanstack-start-hono/validators/upload";
import { formatFilename, generatePresignedUrl, getMediaUrl } from "./media.service";
import { ORPCError } from "@orpc/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../media/s3";

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
