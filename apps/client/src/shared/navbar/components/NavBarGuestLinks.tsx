import { Link } from "@tanstack/react-router";
import { cn } from "#/utils/cn";

const linkClassName =
    "active inline-flex touch-manipulation items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-sm text-white shadow-md transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f1f3d]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg";

export function NavBarGuestLinks({ className }: { className?: string }) {
    return (
        <section className={cn(className)}>
            <Link to="/login" className={linkClassName}>
                Login
            </Link>
            <Link to="/register" className={linkClassName}>
                Register
            </Link>
        </section>
    );
}
