import { Link } from "@tanstack/react-router";

export function NavBarLoginRoutes({className}: {className?: string}) {
    return (
        <section className={className}>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1f3d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation active">
                Logout
            </Link>
        </section>
    );
}