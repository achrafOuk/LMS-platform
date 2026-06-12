import { orpc } from "#/utils/orpc";
import { useQuery } from "@tanstack/react-query";

export function useMe()
{
    return  useQuery({
        queryKey: ['auth', 'me'],
        queryFn: () => orpc.auth.me(),
    });
    
}