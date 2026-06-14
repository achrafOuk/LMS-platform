import { useMe } from "#/features/auth/hooks/useMe";
import { getContext } from "#/integrations/tanstack-query/root-provider";
import { orpc } from "#/utils/orpc";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";

function NavBarAuthLogoutContent({className}: {className?: string}) {
    const navigation = useNavigate();
    const logout = useMutation({ mutationFn: () => orpc.auth.logout() })
    const {queryClient } = getContext();
    const Logout = async () =>
    {
        await logout.mutateAsync();
        queryClient.clear();
        await navigation({to: "/login"});
    }
    return (
        <section className={className} onClick = {Logout}>
            <button  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1f3d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation active">
                Logout
            </button>
        </section>
    );
}

function NavBarAuthLinksContent({className}: {className?: string}) {
    return (
        <section className={className}>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1f3d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation active">
                Login
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1f3d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation active">
                Register
            </Link>
        </section>
    )
}

export function NavBarAuthLinks({
    className,
}: {
    className?: string;
}) {
    const {data} = useQuery(useMe());

    const isLoggedIn = !!data?.user;
    
    if (!isLoggedIn)
    {
        return <NavBarAuthLinksContent className={className} />;
    }
    return <NavBarAuthLogoutContent className={className} />;
}
