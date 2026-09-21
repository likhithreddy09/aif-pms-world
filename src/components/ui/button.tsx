import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "gold" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
        size === "sm" && "h-8 px-3 text-xs",
        size === "md" && "h-10 px-4 text-sm",
        size === "lg" && "h-12 px-6 text-sm tracking-[0.12em]",
        variant === "primary" && "bg-ink text-cream hover:bg-ink-700",
        variant === "gold" &&
          "bg-gold text-ink hover:bg-gold-light tracking-[0.14em] uppercase",
        variant === "secondary" && "bg-cream text-ink hover:bg-cream-dark",
        variant === "outline" && "border border-ink/20 bg-white text-ink hover:border-ink/40",
        variant === "ghost" && "text-ink/80 hover:bg-ink/5",
        variant === "danger" && "bg-red-700 text-white hover:bg-red-800",
        className
      )}
      {...props}
    />
  );
}
