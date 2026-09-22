"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Plus,
  Tags,
  Settings,
  LogOut,
  Newspaper,
  FileText,
  Search,
} from "lucide-react";
import { logoutAction } from "@/lib/auth-actions";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blog posts", icon: Newspaper },
  { href: "/admin/pages", label: "Landing pages", icon: FileText },
  { href: "/admin/seo", label: "SEO", icon: Search },
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
    <div className="admin-shell min-h-screen bg-paper text-ink">
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="flex flex-col bg-ink text-cream">
          <div className="border-b border-white/10 px-5 py-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-muted">
              PMS AIF World
            </p>
            <p className="mt-1 text-xl font-semibold text-white">Admin</p>
          </div>
          <nav className="flex-1 p-3">
            {items.map((item) => {
              const active =
                item.href === "/admin/asset-managers"
                  ? pathname === "/admin/asset-managers" ||
                    /\/admin\/asset-managers\/[^/]+\/edit$/.test(pathname)
                  : item.href === "/admin/blogs"
                    ? pathname.startsWith("/admin/blogs")
                    : item.href === "/admin/pages"
                      ? pathname.startsWith("/admin/pages")
                      : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mb-1 flex items-center gap-3 px-3 py-2.5 text-sm transition",
                    active
                      ? "bg-white/12 font-medium text-white"
                      : "text-cream/80 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <form action={logoutAction} className="border-t border-white/10 p-4">
            <p className="truncate text-xs text-cream/55">{user.email}</p>
            <button
              type="submit"
              className="mt-3 inline-flex items-center gap-2 text-sm text-gold-muted transition hover:text-white"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-col bg-paper text-ink">
          <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-4 sm:px-8">
            <p className="text-sm text-ink-500">Welcome, {user.name}</p>
            <Link href="/" className="text-sm font-medium text-gold-dark hover:underline">
              View public site
            </Link>
          </header>
          <main className="flex-1 px-4 py-8 text-ink sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
