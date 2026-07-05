import { orpc } from "./orpc";

export async function getMediaUrl(key: string)
{
    if (!key) return null;

    try
    {
        const url = await orpc.media.getMediaUrl({ filename: key });
        return url.url;
    }
    catch {}
    
    return null;
}