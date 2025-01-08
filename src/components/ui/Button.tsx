import * as React from "react";
import { cn } from "../../lib/utils";

export type ButtonVariant = "default" | "outline" | "ghost" | "link" | "destructive";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // Default styles
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        // Outline styles
        variant === "outline" && "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:text-gray-100",
        // Ghost styles
        variant === "ghost" && "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:text-gray-100",
        // Link styles
        variant === "link" && "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
        // Destructive styles
        variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
        // Size styles
        size === "default" && "h-9 px-4 py-2",
        size === "sm" && "h-8 px-3 text-xs",
        size === "lg" && "h-10 px-8",
        size === "icon" && "h-9 w-9",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";
