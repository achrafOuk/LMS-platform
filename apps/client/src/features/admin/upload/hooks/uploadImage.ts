import { getMediaUrl } from "#/utils/getMedia";
import { orpc } from "#/utils/orpc";
import { uploadImageValidator } from "@tanstack-start-hono/validators/upload";
import { useMutation } from "@tanstack/react-query";

type UploadImageValidatorType = ReturnType<typeof uploadImageValidator.parse>;

// {imageUrl, setImageUrl, onChange, setUploadError}: {imageUrl: string, setImageUrl: (url: string) => void, onChange: (url: string) => void, setUploadError: (error: string | null) => void}

interface UploadImageProps {
    setImageUrl: (url: string | null) => void;
    onChange: (url: string) => void;
    setUploadError: (error: string | null) => void;
}

export function parseUseUploadImageProps(file: File)
{

    const validatedFile = uploadImageValidator.parse({ mimeType: file.type });
    return validatedFile;
}

async function getPresignedUrl(validatedFile: UploadImageValidatorType)
{
    const presigned = await orpc.media.getPresignedUrl({
        mimeType: validatedFile.mimeType,
      })
    return presigned;
}

async function uploadImage(validatedFile: UploadImageValidatorType, file: File)
{
    const presigned = await getPresignedUrl(validatedFile);
    const uploadResponse = await fetch(presigned.url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
    })
    if (!uploadResponse.ok) 
    {
        throw new Error('Image upload failed. Try another image or upload again.')
    }
}

export function useUploadImage({ setImageUrl, onChange, setUploadError }: UploadImageProps) {
  return useMutation({
    mutationFn: async (file: File) => {
      const validatedFile = parseUseUploadImageProps(file);
      const presigned = await orpc.media.getPresignedUrl({
        mimeType: validatedFile.mimeType,
      })

     await uploadImage(validatedFile, file);

      await orpc.media.notifyMediaUploaded({
        filename: presigned.filename,
        mimeType: validatedFile.mimeType,
      })

      return presigned.filename;
    },
    onSuccess: async (filename) => {
      setUploadError(null)
      onChange(filename)
      if (filename) {
        const url = await getMediaUrl(filename);
        setImageUrl(url ?? '');
      }
    },
    onError: (error) => {
      setUploadError(error instanceof Error ? error.message : 'Image upload failed. Try again.');
    },
  })
}
