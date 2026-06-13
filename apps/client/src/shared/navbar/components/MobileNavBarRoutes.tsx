import { Link } from "@tanstack/react-router";
import type { NavBarRoute } from "../types/NavBarTypes";

export function MobileNavBarRoutes({ routes }: { routes: NavBarRoute[] }) {
    return (
        <section className="md:hidden flex flex-col gap-4 p-4 border-t">
            {routes.map((route) => (
                <Link key={route.label} to={route.link}>
                    {route.label}
                </Link>
            ))}
        </section>
    );
}
