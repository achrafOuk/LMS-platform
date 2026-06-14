import { orpc } from "#/utils/orpc";

export function useMe()
{
    return { 
        queryKey: ['auth', 'me'],
        queryFn: () => orpc.auth.me(), 
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    };
}