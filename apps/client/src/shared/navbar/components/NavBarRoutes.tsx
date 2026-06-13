import { Link } from "@tanstack/react-router";
import type { NavBarRoute } from "../types/NavBarTypes";

export function NavBarRoutes({routes}: {routes: NavBarRoute[]})
{
    return (
            <section className="md:flex hidden gap-4">
                {routes.map((route) => (
                    <Link key={route.label} to={route.link} >
                        {route.label}
                    </Link>
                ))}

            </section>
    );
}