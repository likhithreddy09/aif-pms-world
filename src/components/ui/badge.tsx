import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "ink" | "cream" | "success" | "muted" | "draft" | "published" | "archived";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em]",
        tone === "gold" && "bg-gold/15 text-gold-dark",
        tone === "ink" && "bg-ink text-cream",
        tone === "cream" && "bg-cream text-ink-600",
        tone === "success" && "bg-emerald-50 text-emerald-800",
        tone === "muted" && "border border-ink/10 text-ink-500",
        tone === "draft" && "bg-amber-50 text-amber-800",
        tone === "published" && "bg-emerald-50 text-emerald-800",
        tone === "archived" && "bg-slate-100 text-slate-600",
        className
      )}
    >
      {children}
    </span>
  );
}
