import { Link } from "@tanstack/react-router";
import type { NavBarRoute } from "../types/NavBarTypes";

export function NavBarAuthLinks({
    className,
}: {
    links: NavBarRoute[];
    className?: string;
}) {
    return (
        <section className={className}>
            <Link to="/" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Login
            </Link>
            <Link to="/" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Register
            </Link>
        </section>
    );
}
