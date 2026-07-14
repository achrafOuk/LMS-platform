import type { ChangeEvent } from 'react'
import { parseUseUploadImageProps } from './uploadImage';
import { orpc } from '#/utils/orpc';
import { getMediaUrl } from '#/utils/getMedia';
import { useUploadThumbnail } from '../store/uploadThumbnail';
import type { UploadValidatorType } from '@tanstack-start-hono/validators/upload';

const valideFile = (file: File | undefined) => 
{
    const {setUploadError} = useUploadThumbnail();
    try
    {
        if (!file) throw new Error("File is required");
        const validatedFile = parseUseUploadImageProps(file);
        return validatedFile;
    }
    catch (error: unknown)
    {
        setUploadError("Invalid file type");
        return null;
    }
} 

const getPresignedUrl = async (validatedFile: UploadValidatorType) => 
{
    const presignedUrl = await orpc.media.getPresignedUrl({ mimeType: validatedFile.mimeType });
    return presignedUrl;
}

interface PresignedUrl {
    url: string;
    filename: string;
}

const uploadImage = async (presignedUrl: PresignedUrl, file: File) => {
    const {setUploadError} = useUploadThumbnail();
    const uploadResponse = await fetch(presignedUrl.url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    if (!uploadResponse.ok) 
    {
        setUploadError("Failed to upload image. Please try again.");
    }
    return uploadResponse.ok;
}


export const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const {setThumbnail, setUploadError} = useUploadThumbnail();
    
    const file = event.target.files?.[0];
    const validatedFile = valideFile(file);
    if (validatedFile === null) return;
    const presignedUrl = await getPresignedUrl(validatedFile);
    const uploadResponse = await uploadImage(presignedUrl, file!);

    if (uploadResponse && presignedUrl.filename) 
    {
        const mediaUrl = await getMediaUrl(presignedUrl.filename);
        if (mediaUrl) {
            setThumbnail(mediaUrl, presignedUrl.filename);
        }
        else
        {
            setUploadError("Failed to get media url. Please try again.");
        }
    }
    else
    {
      setUploadError("Failed to upload image. Please try again.");
    }
  }