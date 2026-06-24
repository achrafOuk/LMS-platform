import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {  s3 } from "../../media/s3";

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
        // const response = await s3.send(command);
        // return response;
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
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
