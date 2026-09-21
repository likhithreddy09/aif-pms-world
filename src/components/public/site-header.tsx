"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/pms", label: "PMS" },
  { href: "/aif", label: "AIF" },
  { href: "/asset-managers", label: "Asset Managers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function onSearch(event: FormEvent) {
    event.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setOpen(false);
    router.push(q ? `/asset-managers?q=${encodeURIComponent(q)}` : "/asset-managers");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-ink text-cream">
      <div className="border-b border-gold/15">
        <div className="container-page flex items-center justify-between py-2 text-[11px] tracking-[0.16em]">
          <p className="text-gold-muted">Demo platform — managers and figures are fictional</p>
          <Link href="/admin/login" className="hidden text-gold hover:text-gold-light sm:inline">
            Admin
          </Link>
        </div>
      </div>
      <div className="container-page flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center border border-gold text-[11px] tracking-[0.12em] text-gold">
            PA
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-semibold text-cream">PMS AIF World</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-gold">
              Investment Managers
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[11px] uppercase tracking-[0.16em] transition",
                pathname === item.href ? "text-gold" : "text-cream/80 hover:text-gold"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            aria-label="Search managers"
            onClick={() => setSearchOpen((v) => !v)}
            className="text-cream/80 hover:text-gold"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/asset-managers"
            className="border border-gold px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-gold hover:bg-gold hover:text-ink"
          >
            Explore
          </Link>
        </nav>
        <div className="flex items-center gap-3 lg:hidden">
          <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {searchOpen ? (
        <div className="border-t border-gold/20 bg-ink-800">
          <form onSubmit={onSearch} className="container-page flex items-center gap-3 py-3">
            <Search className="h-4 w-4 text-gold" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search asset managers"
              className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/40"
            />
            <button type="submit" className="text-[11px] uppercase tracking-[0.16em] text-gold">
              Search
            </button>
          </form>
        </div>
      ) : null}
      {open ? (
        <div className="border-t border-gold/20 bg-ink-800 lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-gold/10 py-3 text-sm uppercase tracking-[0.16em] text-cream"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/admin/login" className="py-3 text-sm uppercase tracking-[0.16em] text-gold">
              Admin login
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
