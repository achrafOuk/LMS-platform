import { orpc } from "./orpc";

export async function getMediaUrl(key: string)
{
    try
    {
        const url = await orpc.media.getMediaUrl({ filename: key });
        return url.url;
    }
    catch {}
    
    return null;
}