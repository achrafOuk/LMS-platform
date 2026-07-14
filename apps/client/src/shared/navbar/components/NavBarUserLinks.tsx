import { cn } from "#/utils/cn";
import { orpc } from "#/utils/orpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function NavBarUserLinks({ className }: { className?: string }) {
    const navigation = useNavigate();
    const logout = useMutation({ mutationFn: () => orpc.auth.logout() });
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await logout.mutateAsync();
        queryClient.invalidateQueries({
            predicate: () => true,
        });
        queryClient.invalidateQueries({
            queryKey: ["auth", "me"],
        });
        await navigation({ to: "/login" });
    };

    return (
        <button
            type="button"
            className={cn(
                "active inline-flex touch-manipulation items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-sm text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1f3d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg",
                className,
            )}
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
