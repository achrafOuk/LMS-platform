import { orpc } from "#/utils/orpc";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react"

export function UploadImage()
{
    const imageLoader = useRef<HTMLInputElement>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const uploadImage = useMutation({
        mutationFn: async ({ url, file }: { url: string, file: File }) => {
            setIsDownloading(true);
            await fetch(url, { method: 'PUT', body: file , headers: { 'Content-Type': file.type } });
        },
        onSuccess: (data) => {
            console.log(data);
            setIsDownloading(false);
        },
        onError: (error) => {
            console.error(error);
            setIsDownloading(false);
        },
    });

    // get the presigned url from the backend
    const mutation = useMutation({
        mutationFn: async (type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'video/mp4') => {
            const response = await orpc.media.getPresignedUrl({
                mimeType: type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'video/mp4',
            });
            return response;
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const openImageLoader = () => {
        if (!imageLoader.current) return;
        imageLoader.current?.click();
    }

    const handleImageLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const data = await mutation.mutateAsync(event.target.files?.[0].type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'video/mp4');
        await uploadImage.mutateAsync({ url: data.url, file: event.target.files?.[0] });
        const imageUrl = await orpc.media.getMediaUrl({ filename: data.filename });
        setDownloadUrl(imageUrl.url);
        console.log(data);
    }


    return (
        <>
            {
                !isDownloading && (
                <>
                    <input 
                    type="file" ref={imageLoader} 
                    onChange={handleImageLoad}
                    className="hidden" 
                    accept="image/png, image/jpeg, image/gif, image/webp"/>
                    <label>Course Thumbnail</label>
                    <section 
                    className="w-full h-64 bg-[url('https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_527a5ea6d4_87b2980ed616f779.png')] bg-cover bg-center rounded-lg flex justify-center items-center cursor-pointer" 
                    onClick={openImageLoader}>
                        upload image
                    </section>
                </>
            )}
            {
                downloadUrl && (
                    <img src={downloadUrl} alt="downloaded image" className="w-full h-64 object-cover rounded-lg" />
                )
            }
        </>
    )

}