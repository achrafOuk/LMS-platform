import { NavBarRoutes } from "./NavBarRoutes";
import { useState } from "react";
import type { NavBarRoute } from "../types/NavBarTypes";
import { MobileNavBarRoutes } from "./MobileNavBarRoutes";
import { NavBarAuthLinks } from "./NavBarAuthLinks";
import { Link } from "@tanstack/react-router";

export function NavBar()
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const routes: NavBarRoute[] = [
        {
            link: '/',
            label: 'Home',
        },
        {
            link: '/',
            label: 'About',
        },
        {
            link: '/',
            label: 'Courses',
        }
    ];

    return (
        <nav className="bg-background border-b p-1 flex flex-col">
            <section className="p-4 flex justify-between items-center">
                    <section>
                        <Link to="/" className="text-2xl font-bold">
                            LMS platform
                        </Link>
                    </section>
                    <NavBarRoutes routes={routes} />
                    <NavBarAuthLinks
                        className="md:flex hidden gap-4"
                    />
                <section className="md:hidden flex gap-4 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <img src="https://www.svgrepo.com/show/506800/burger-menu.svg" alt="menu" className="w-6 h-6" />
                </section>
            </section>

            {isMenuOpen && ( <MobileNavBarRoutes routes={routes} /> ) }
            
            {isMenuOpen && (
                <NavBarAuthLinks
                    className="md:hidden flex flex-row gap-4 justify-center items-center"
                />
            )}
        </nav>
    )
}