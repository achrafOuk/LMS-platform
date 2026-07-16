import { cn } from "#/utils/cn";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>
{
    placeholder: string;
    className: string;
}

export function Input({ placeholder, className, ...props }: InputProps)
{
    return (
        <input type={props.type} placeholder={placeholder} 
        className={cn(className, "border border-foreground rounded-md px-4 py-2")} 
        {...props}
        />
    )
}