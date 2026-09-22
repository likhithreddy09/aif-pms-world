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
    <div
      className="admin-shell min-h-screen"
      style={{ background: "#f7f6f2", color: "#0b0b0c" }}
    >
      <div className="grid min-h-screen lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside
          className="flex flex-col"
          style={{ background: "#0b0b0c", color: "#f0efeb" }}
        >
          <div className="border-b border-white/10 px-5 py-5">
            <p
              className="text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{ color: "#cfc3a8" }}
            >
              PMS AIF World
            </p>
            <p className="mt-1 text-xl font-semibold" style={{ color: "#ffffff" }}>
              Admin
            </p>
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
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "admin-nav-item mb-1 flex items-center gap-3 px-3 py-2.5 text-sm transition",
                    active && "admin-nav-active"
                  )}
                  style={{
                    color: active ? "#ffffff" : "rgba(240,239,235,0.85)",
                    background: active ? "rgba(255,255,255,0.12)" : "transparent",
                  }}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span style={{ color: "inherit" }}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <form action={logoutAction} className="border-t border-white/10 p-4">
            <p className="truncate text-xs" style={{ color: "rgba(240,239,235,0.55)" }}>
              {user.email}
            </p>
            <button
              type="submit"
              className="mt-3 inline-flex items-center gap-2 text-sm"
              style={{ color: "#cfc3a8", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-col" style={{ background: "#f7f6f2", color: "#0b0b0c" }}>
          <header
            className="flex items-center justify-between border-b px-4 py-4 sm:px-8"
            style={{ background: "#ffffff", color: "#0b0b0c", borderColor: "rgba(11,11,12,0.1)" }}
          >
            <p className="text-sm" style={{ color: "#4a473f" }}>
              Welcome, {user.name}
            </p>
            <Link href="/" className="text-sm font-medium" style={{ color: "#7d6b45" }}>
              View public site
            </Link>
          </header>
          <main className="flex-1 px-4 py-8 sm:px-8" style={{ background: "#f7f6f2", color: "#0b0b0c" }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
