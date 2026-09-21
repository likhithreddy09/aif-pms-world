import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-ink text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-semibold text-2xl">PMS AIF World</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">
            A demonstration publishing platform for PMS and AIF asset-manager information.
            Listings, track records and regulatory details in this demo are fictional.
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/75">
            <Link href="/pms">PMS Directory</Link>
            <Link href="/aif">AIF Directory</Link>
            <Link href="/asset-managers">All Asset Managers</Link>
          </div>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-gold">Platform</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-cream/75">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin/login">Admin Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/15">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-cream/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} PMS AIF World · Demo / POC</p>
          <p>Not an offer to invest. Sample data only.</p>
        </div>
      </div>
    </footer>
  );
}
