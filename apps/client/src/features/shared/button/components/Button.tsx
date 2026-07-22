import { cn } from "#/utils/cn";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
	className?: string;
}

const buttonBaseClassName =
	"inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold touch-manipulation transition-[background-color,box-shadow,transform,border-color,color] duration-200 motion-safe:hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none";

function getVariantClass(variant: ButtonProps["variant"]): string {
	switch (variant) {
		case "primary":
			return "min-h-11 bg-primary text-primary-foreground shadow-md motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg";

		case "secondary":
			return "min-h-11 border border-border bg-background text-foreground motion-safe:hover:border-primary/40 motion-safe:hover:bg-muted";

		case "outline":
			return "min-h-11 border border-border bg-transparent text-foreground motion-safe:hover:bg-muted";

		case "ghost":
			return "min-h-11 bg-transparent text-primary motion-safe:hover:bg-muted";

		case "glow":
			return "min-h-11 bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg motion-safe:hover:ring-primary/35";

		default:
			return "min-h-11 bg-primary text-primary-foreground shadow-md motion-safe:hover:bg-primary/90 motion-safe:hover:shadow-lg";
	}
}

export function Button({
	children,
	type = "button",
	className,
	disabled = false,
	variant = "primary",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(buttonBaseClassName, getVariantClass(variant), className)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
}
