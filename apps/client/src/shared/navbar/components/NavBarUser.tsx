import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { authRoutes } from "../constants/Routes.constant";
import { MobileNavBarRoutes } from "./MobileNavBarRoutes";
import { NavBarRoutes } from "./NavBarRoutes";
import { NavBarUserLinks } from "./NavBarUserLinks";

export function NavBarUser() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex flex-col border-b bg-background p-1">
            <section className="flex items-center justify-between p-4">
                <section>
                    <Link to="/" className="font-bold text-2xl">
                        LMS platform
                    </Link>
                </section>
                <NavBarRoutes routes={authRoutes} />
                <NavBarUserLinks className="hidden md:flex" />
                <button
                    type="button"
                    className="flex cursor-pointer gap-4 md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <img
                        src="https://www.svgrepo.com/show/506800/burger-menu.svg"
                        alt="menu"
                        className="h-6 w-6"
                    />
                </button>
            </section>

            {isMenuOpen && <MobileNavBarRoutes routes={authRoutes} />}

            {isMenuOpen && (
                <NavBarUserLinks className="flex flex-row items-center justify-center md:hidden" />
            )}
        </nav>
    );
}
