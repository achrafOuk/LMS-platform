import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NotifyMediaUploadedValidatorType, RemoveMediaValidatorType } from "@tanstack-start-hono/validators/upload";
import type { Db } from "../../db/drizzle.client";
import { Media } from "../../db/schemas";
import {  s3 } from "../../media/s3";
import { eq } from "drizzle-orm";

export function formatFilename(mimeType: string, filename: string)
{
    switch (mimeType)
    {
        case "image/jpeg":
            return `thumbnails/${filename}.jpg`;
        case "image/png":
            return `thumbnails/${filename}.png`;
        case "image/gif":
            return `thumbnails/${filename}.gif`;
        case "image/webp":
            return `thumbnails/${filename}.webp`;
        case "video/mp4":
            return `courses/${filename}.mp4`;
        default:
            throw new Error(`Unsupported mime type: ${mimeType}`);
    }
}

export async function generatePresignedUrl(bucket: string, filename: string, expiresIn: number, contentType: string)
{
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3, command, { expiresIn });
    return url;
}


export async function getMediaUrl(bucket: string, filename: string)
{
    try
    {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: filename,
        });
        const url = await getSignedUrl(s3, command);
        return url;
    }
    catch(error: any)
    {
        if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404 || error.Code === 'NoSuchKey')
        {
            return {error: 'File not found'};
        }
        return {error: 'Internal server error'};
    }
}

function getMediaUid(filename: string) {
    const file = filename.split("/").pop() ?? filename;
    return file.split(".")[0] ?? file;
}

export async function notifyMediaUploaded(db: Db, input: NotifyMediaUploadedValidatorType) {
    const uid = getMediaUid(input.filename);

    const [media] = await db
        .insert(Media)
        .values({
            uid,
            path: input.filename,
            mimeType: input.mimeType,
            status: "SAVED",
        })
        .onConflictDoUpdate({
            target: Media.uid,
            set: {
                path: input.filename,
                mimeType: input.mimeType,
                status: "SAVED",
                updatedAt: new Date().toISOString(),
            },
        })
        .returning();

    return media;
}

async function removeMediaFromS3(filename: string) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.RUSTFS_BUCKET_NAME!,
        Key: filename,
    });
    await s3.send(command);
}



export async function removeMedia(db: Db, input: RemoveMediaValidatorType) {
    const deleted = await db.delete(Media).where(eq(Media.uid, input.filename)).returning();
    if (deleted.length === 0) {
        return { error: "Media not found", status: "NOT_FOUND" };
    }
    await removeMediaFromS3(input.filename);
}
