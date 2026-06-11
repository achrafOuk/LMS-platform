import { Link } from "@tanstack/react-router";
import type { NavBarRoute } from "../types/NavBarTypes";

export function MobileNavBarRoutes({routes}: {routes: NavBarRoute[]})
{
    return (
        <section className="md:hidden flex flex-col gap-4 justify-center items-center">
            {routes.map((route) => (
                <Link key={route.link} to={route.link} >
                    {route.label}
                </Link>
            ))}
        </section>
    )
}