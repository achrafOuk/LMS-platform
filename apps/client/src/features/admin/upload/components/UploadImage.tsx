import { adminActionButtonClassName, adminDestructiveButtonClassName } from '#/features/admin/constants/adminStyles'
import { useUploadImage } from '#/features/admin/upload/hooks/uploadImage'
import { cn } from '#/utils/cn'
import { getMediaUrl } from '#/utils/getMedia'
import { orpc } from '#/utils/orpc'
import { imageMimeTypes } from '@tanstack-start-hono/validators/upload'
import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'


type UploadImageProps = {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}


export function UploadImage({ value, onChange, hasError }: UploadImageProps) {
  const imageLoader = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const uploadImage = useUploadImage({ setImageUrl, onChange, setUploadError })

  useEffect(() => {
    (async () =>{
      const url = await getMediaUrl(value);
      setImageUrl(url ?? '');
      console.log('url:', value);
    })();
  },[]);

  
  const openImageLoader = () => {
    imageLoader.current?.click()
  }

  const removeImage = async () => {
    setUploadError(null)
    onChange('')
    await orpc.media.removeMedia({ filename: value as string });

    if (imageLoader.current) {
      imageLoader.current.value = ''
    }
  }

  const handleImageLoad = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    uploadImage.mutate(file)
    event.target.value = ''
  }

  const isUploading = uploadImage.isPending

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4">
      <input
        ref={imageLoader}
        type="file"
        name="course-thumbnail-upload"
        onChange={handleImageLoad}
        className="hidden"
        accept={imageMimeTypes.join(',')}
      />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">Course Thumbnail</p>
          <p className="text-sm text-muted-foreground">
            Upload a JPG, PNG, GIF, or WebP image for the course card.
          </p>
        </div>

        {value ? (
          <button
            type="button"
            onClick={removeImage}
            className={cn(adminDestructiveButtonClassName, 'mt-2 sm:mt-0')}
          >
            Remove Image
          </button>
        ) : null}
      </div>

      {value ? (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <img
            src={imageUrl as string}
            alt="Course thumbnail preview"
            width={960}
            height={360}
            className="h-64 w-full"
            loading="lazy"
          />
          <div className="flex flex-col gap-2 border-t border-border p-3 sm:flex-row sm:items-center sm:justify-between">
            {/* <p className="min-w-0 truncate text-sm text-muted-foreground">{value}</p> */}
            <button
              type="button"
              onClick={openImageLoader}
              disabled={isUploading}
              className={adminActionButtonClassName}
            >
              {isUploading ? 'Uploading…' : 'Replace Image'}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openImageLoader}
          disabled={isUploading}
          aria-invalid={hasError ? true : undefined}
          className={cn(
            'flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-background px-6 text-center transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 touch-manipulation',
            hasError && 'border-destructive focus-visible:ring-destructive',
          )}
        >
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {isUploading ? 'Uploading…' : 'Upload Image'}
          </span>
          <span className="max-w-md text-sm text-muted-foreground">
            Select a course thumbnail. The uploaded image URL will be saved with the course form.
          </span>
        </button>
      )}

      <div aria-live="polite" className="min-h-5 text-sm text-destructive">
        {uploadError}
      </div>
    </div>
  )
}
