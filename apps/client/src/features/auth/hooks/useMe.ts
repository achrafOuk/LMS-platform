import { orpc } from "#/utils/orpc";

export function useMe()
{
    return { queryKey: ['auth', 'me'], queryFn: () => orpc.auth.me(), };
}