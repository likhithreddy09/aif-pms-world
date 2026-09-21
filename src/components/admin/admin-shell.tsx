"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, Plus, Tags, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/asset-managers", label: "All Managers", icon: Building2 },
  { href: "/admin/asset-managers/new", label: "Add Manager", icon: Plus },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  user,
}: {
  children: ReactNode;
  user: { name: string; email: string };
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-ink">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="bg-ink text-cream">
          <div className="border-b border-gold/20 px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">PMS AIF World</p>
            <p className="mt-1 font-semibold text-xl">Admin</p>
          </div>
          <nav className="p-3">
            {items.map((item) => {
              const active =
                item.href === "/admin/asset-managers"
                  ? pathname === "/admin/asset-managers" ||
                    /\/admin\/asset-managers\/[^/]+\/edit$/.test(pathname)
                  : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mb-1 flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm",
                    active ? "bg-gold/15 text-gold" : "text-cream/75 hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <form action={logoutAction} className="border-t border-gold/20 p-4">
            <p className="truncate text-xs text-cream/60">{user.email}</p>
            <button type="submit" className="mt-3 inline-flex items-center gap-2 text-sm text-gold">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </aside>
        <div className="min-h-screen">
          <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-4 sm:px-8">
            <p className="text-sm text-ink-500">Welcome, {user.name}</p>
            <Link href="/" className="text-sm text-gold-dark hover:underline">
              View public site
            </Link>
          </header>
          <div className="px-4 py-8 sm:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
