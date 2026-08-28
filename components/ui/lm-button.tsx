import React from "react";
import { cn } from "@/lib/utils";
import { Loader2, AlertCircle } from "lucide-react";

export interface LmButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isError?: boolean;
  variant?: "primary" | "secondary"; // We'll make primary yellow
}

export const LmButton = React.forwardRef<HTMLButtonElement, LmButtonProps>(
  (
    { 
      className, 
      children, 
      isLoading = false, 
      isError = false, 
      disabled, 
      variant = "primary",
      ...props 
    }, 
    ref
  ) => {
    const isPrimary = variant === "primary";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Brand & Layout Basics
          "font-inter relative inline-flex items-center justify-center font-normal text-base leading-6",
          "px-4 py-2", // space.4 roughly for x, space.2 for y
          "rounded-md", // radius.sm = 8px
          "transition-all duration-200 ease-out", // motion.duration.fast = 200ms
          "select-none outline-none",
          
          // Primary Variant (Yellow based on user request matching image)
          isPrimary && [
            // Default State
            "bg-yellow-400 text-black font-semibold",
            "border-2 border-yellow-300",
            "shadow-[0_0_0_2px_#ca8a04]", // yellow-600 outer ring
            
            // Hover State
            "hover:bg-yellow-300 hover:border-yellow-200 hover:shadow-[0_0_0_2px_#b45309]",
            
            // Active State
            "active:bg-yellow-500 active:scale-[0.98] active:border-yellow-400",
            "active:shadow-[0_0_0_2px_#a16207]",
            
            // Focus Visible State
            "focus-visible:ring-4 focus-visible:ring-yellow-500/50 focus-visible:outline-none",
          ],

          // Secondary Variant
          !isPrimary && [
            "bg-zinc-800 text-white",
            "hover:bg-zinc-700",
            "active:bg-zinc-900 active:scale-[0.98]",
            "focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          ],
          
          // Disabled State
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-yellow-400 disabled:hover:shadow-none",

          // Error State
          isError && "bg-red-500 text-white shadow-none hover:bg-red-600 focus-visible:ring-red-500",
          
          className
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        
        {/* Error Icon */}
        {isError && !isLoading && (
          <AlertCircle className="mr-2 h-4 w-4" aria-hidden="true" />
        )}

        <span className={cn(isLoading ? "opacity-0" : "opacity-100", "flex items-center justify-center gap-2")}>
          {children}
        </span>

        {/* Absolute loader positioning if we want to keep button size stable without shifting content */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          </span>
        )}
      </button>
    );
  }
);
LmButton.displayName = "LmButton";
