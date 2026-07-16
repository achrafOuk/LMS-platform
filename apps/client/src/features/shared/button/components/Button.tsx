import { cn } from "#/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> 
{
    variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
    className?: string;
}

function getVariantClass(variant: string): string {
	switch (variant) {
		case "primary":
			return "bg-primary text-foreground hover:opacity-90";

		case "secondary":
			return "bg-secondary text-foreground hover:opacity-90";

		case "outline":
			return "border-2 border-secondary text-secondary hover:opacity-90";

		case "ghost":
			return "bg-transparent text-primary hover:opacity-90";

		case "glow":
			return "bg-primary text-foreground shadow-lg shadow-primary/60 transition duration-500 hover:shadow-none";

		case "disabled":
			return "opacity-70 hover:opacity-70";

		default:
			return "";
	}
}

export function Button ({ children, type="button", className="", disabled=false, variant="primary", ...props }: ButtonProps)
{
    
    const variantClass = getVariantClass(variant);
    return (
        <button type={type} className={cn(className, "cursor-pointer", variantClass)} disabled={disabled} {...props}>
            {children}
        </button>
    )
}