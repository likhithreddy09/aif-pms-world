import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AssetManagerCard } from "@/components/public/asset-manager-card";
import { categoryNames, getFeaturedManagers } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const featured = await getFeaturedManagers();

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-cream">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(196,163,90,0.18),transparent_55%)]" />
        <div className="container-page relative flex min-h-[78vh] flex-col items-center justify-center py-24 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">PMS · AIF · Research</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">
            Discover PMS &amp; AIF
            <span className="block text-gold">Investment Managers</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
            Explore investment managers, strategies and track records in one place.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/pms"
              className="inline-flex h-12 items-center justify-center bg-gold px-8 text-[12px] uppercase tracking-[0.16em] text-ink hover:bg-gold-light"
            >
              Explore PMS
            </Link>
            <Link
              href="/aif"
              className="inline-flex h-12 items-center justify-center border border-gold px-8 text-[12px] uppercase tracking-[0.16em] text-gold hover:bg-gold hover:text-ink"
            >
              Explore AIF
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream">
        <div className="container-page grid gap-8 py-10 text-center sm:grid-cols-3">
          {[
            ["Publishing workflow", "Admin updates appear on the public website immediately."],
            ["Structured profiles", "Strategy, track record, SEBI details and contact in one page."],
            ["Investor-ready directory", "Search and filter PMS and AIF managers with credibility, not noise."],
          ].map(([title, copy]) => (
            <div key={title}>
              <p className="font-semibold text-xl text-ink">{title}</p>
              <p className="mt-2 text-sm text-ink-500">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured</p>
            <h2 className="section-title mt-2">Featured Asset Managers</h2>
          </div>
          <Link href="/asset-managers" className="hidden items-center gap-1 text-sm text-gold-dark sm:inline-flex">
            View directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {featured.length === 0 ? (
          <p className="mt-8 text-sm text-ink-500">No featured managers have been published yet.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((manager) => (
              <AssetManagerCard
                key={manager.id}
                id={manager.id}
                name={manager.name}
                slug={manager.slug}
                logoUrl={manager.logoUrl}
                type={manager.type}
                categories={categoryNames(manager)}
                description={manager.description}
                oneYearReturn={manager.oneYearReturn}
                threeYearReturn={manager.threeYearReturn}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
