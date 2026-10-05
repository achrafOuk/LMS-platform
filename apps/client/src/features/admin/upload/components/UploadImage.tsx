import { parseUseUploadImageProps } from '#/features/admin/upload/hooks/uploadImage'
import { getMediaUrl } from '#/utils/getMedia'
import { orpc } from '#/utils/orpc'
import { imageMimeTypes } from '@tanstack-start-hono/validators/upload'
import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import { useUploadThumbnail } from '../store/uploadThumbnail'
import { getAcceptFormats } from '../hooks/AcceptForm'

function ImagePreview({
  url,
  onReplace,
  onRemove,
}: {
  url: string
  onReplace: () => void
  onRemove: () => void
}) {
  return (
    <section className='relative h-[350px] w-full overflow-hidden rounded-xl border border-border bg-muted/20'>
      <img
        src={url}
        alt='Uploaded image preview'
        loading='lazy'
        width={1200}
        height={700}
        className='h-full w-full object-cover'
      />
      <div className='absolute right-3 top-3 flex items-center gap-2'>
        <button
          type='button'
          onClick={onReplace}
          className='inline-flex items-center rounded-md border border-border bg-background/95 px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          aria-label='Replace uploaded image'
        >
          Change
        </button>
        <button
          type='button'
          onClick={onRemove}
          className='inline-flex items-center rounded-md border border-red-500/60 bg-background/95 px-3 py-1.5 text-sm font-medium text-red-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
          aria-label='Remove uploaded image'
        >
          Remove
        </button>
      </div>
    </section>
  )
}

interface UploadImageProps {
  value: string | null
  onChange: (url: string) => void
  hasError: (error: string) => void
}

function UploadPlaceholder({ acceptedFormats }: { acceptedFormats: string }) {
  return (
    <span className='flex flex-col items-center justify-center gap-3 text-center'>
      <span
        aria-hidden='true'
        className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-primary/50 text-primary'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.8'
          className='h-6 w-6'
        >
          <path d='M12 16V8' />
          <path d='m8.5 11.5 3.5-3.5 3.5 3.5' />
          <rect x='3.5' y='4.5' width='17' height='15' rx='2.5' />
        </svg>
      </span>
      <span className='text-base font-semibold text-foreground'>Upload Course Image</span>
      <span className='max-w-[340px] text-sm text-muted-foreground'>
        Click to select an image. Supported formats: {acceptedFormats}.
      </span>
    </span>
  )
}

export function UploadImage({ value, onChange, hasError }: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { setThumbnail, removeThumbnail } = useUploadThumbnail();
  const acceptedFormats = getAcceptFormats();

  const openImageLoader = () => {
    inputRef.current?.click()
  }

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validatedFile = parseUseUploadImageProps(file);
    const presignedUrl = await orpc.media.getPresignedUrl({ mimeType: validatedFile.mimeType });
    const uploadResponse = await fetch(presignedUrl.url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    const mediaUrl = await getMediaUrl(presignedUrl.filename);
    if (uploadResponse.ok && mediaUrl) 
    {
      onChange(mediaUrl);
    }
    else
    {
      hasError("Failed to upload image. Please try again.");
    }
  }

  const handleRemoveImage = () => {
    onChange('')
  }

  return (
    <section className='w-full'>
      <input
        type='file'
        hidden
        accept={imageMimeTypes.join(',')}
        ref={inputRef}
        onChange={handleImageChange}
        aria-label='Upload course image'
        name='course-image'
      />

      {value ? (
        <ImagePreview url={value} onReplace={openImageLoader} onRemove={handleRemoveImage} />
      ) : (
        <button
          type='button'
          onClick={openImageLoader}
          className='flex h-[350px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [touch-action:manipulation]'
          aria-label='Open image uploader'
        >
          <UploadPlaceholder acceptedFormats={acceptedFormats} />
        </button>
      )}
    </section>
  )
}
