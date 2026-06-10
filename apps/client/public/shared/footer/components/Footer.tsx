import { FooterBrand } from "./FooterBrand";
import { FooterCopyright } from "./FooterCopyright";
import { FooterSitemapColumns } from "./FooterSitemapColumns";
import type { FooterLinkGroup } from "../types/FooterTypes";

export default function Footer() {

    return (
        <footer className="p-4 text-center">
                <FooterCopyright />
        </footer>
    );
}
