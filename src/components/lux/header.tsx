"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X, ChevronDown } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { searchProducts } from "@/data/catalog";
import { PAGES } from "@/data/pages";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const hits = query.trim()
    ? [
        ...searchProducts(query).slice(0, 6).map((p) => ({ href: `/portfolio/${p.slug}`, label: p.name, kicker: p.kind })),
        ...PAGES.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 4)
          .map((p) => ({ href: `/${p.slug}`, label: p.title, kicker: p.eyebrow })),
      ]
    : [];

  function onSearch(e: FormEvent) {
    e.preventDefault();
    if (hits[0]) router.push(hits[0].href);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-gold/20 bg-ink/95 backdrop-blur-xl" : "border-transparent bg-ink"
      )}
    >
      <div className="container-page flex items-center justify-end gap-2 py-2">
        <Link href="/latestpmsreturns" className="gold-btn-ghost">
          Compare PMS & AIFs
        </Link>
        <Link href="/book-a-call" className="gold-btn">
          Book a Call
        </Link>
      </div>
      <div className="container-page flex items-center justify-between gap-6 pb-4">
        <Link href="/" className="shrink-0 whitespace-nowrap">
          <span className="block text-[22px] font-semibold leading-none tracking-tight text-cream sm:text-[24px]">
            PMS AIF <span className="text-gold">WORLD</span>
          </span>
          <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.22em] text-cream/45">
            Analytics-backed investing
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[10px] uppercase tracking-[0.14em] text-cream/80 transition hover:text-gold",
                  pathname.startsWith(item.href) && item.href !== "/" && "text-gold"
                )}
              >
                {item.label}
                {item.children ? <ChevronDown className="h-3 w-3 opacity-70" /> : null}
              </Link>
              {item.children ? (
                <div className="invisible absolute left-0 top-full z-50 min-w-64 translate-y-1 border border-gold/20 bg-ink-800/98 py-2 opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-cream/75 hover:bg-gold/10 hover:text-gold"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="ml-2 text-cream/80 hover:text-gold"
          >
            <Search className="h-4 w-4" />
          </button>
        </nav>
        <button type="button" className="text-cream lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {searchOpen ? (
        <div className="border-t border-gold/15 bg-ink-800">
          <form onSubmit={onSearch} className="container-page py-4">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search strategies, pages, managers"
              className="w-full bg-transparent text-2xl font-semibold text-cream outline-none placeholder:text-cream/30"
            />
            {hits.length > 0 ? (
              <ul className="mt-4 divide-y divide-gold/10">
                {hits.map((h) => (
                  <li key={h.href}>
                    <Link href={h.href} className="flex items-center justify-between py-3 text-cream/80 hover:text-gold">
                      <span>{h.label}</span>
                      <span className="text-[10px] uppercase tracking-[0.16em] text-gold/70">{h.kicker}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </form>
        </div>
      ) : null}
      {open ? (
        <div className="max-h-[80vh] overflow-y-auto border-t border-gold/15 bg-ink-800 lg:hidden">
          <div className="container-page py-4">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-gold/10 py-3">
                <Link href={item.href} className="text-[12px] uppercase tracking-[0.18em] text-gold">
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-2 flex flex-col">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="py-1.5 text-sm text-cream/75">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <p className="pt-4 text-xs text-cream/40">{SITE.email} · {SITE.phone}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
