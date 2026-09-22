import Link from "next/link";
import { FOOTER, OFFICES, SITE } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-ink text-cream">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight">
            PMS AIF <span className="text-gold">WORLD</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">
            A new-age investment services company. Analytics-backed, high-quality investing for wealth creation —
            listed to unlisted, PMS to AIF, pre-IPO to private credit.
          </p>
          <p className="mt-6 text-sm text-gold">{SITE.email}</p>
          <p className="text-sm text-cream/70">{SITE.phone}</p>
        </div>
        <FooterCol title="Introduction" links={FOOTER.intro} />
        <FooterCol title="Content & analysis" links={FOOTER.analysis} />
        <FooterCol title="For investors" links={FOOTER.investors} />
      </div>
      <div className="container-page grid gap-8 border-t border-gold/15 py-12 md:grid-cols-3">
        {OFFICES.map((o) => (
          <div key={o.city}>
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold">PMS AIF World — {o.city}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">{o.address}</p>
          </div>
        ))}
      </div>
      <div className="container-page border-t border-gold/15 py-6 text-xs leading-relaxed text-cream/45">
        <p>
          <strong className="text-cream/70">Risk disclaimer:</strong> Investments are subject to market-related risks.
          Content is general information, not a recommendation. Only investors with the aptitude and attitude for
          alternates should consider PMS and AIFs. Past performance may or may not be sustained. Products are
          market-linked and do not offer guaranteed returns. Principal can be at risk.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} PMS AIF WORLD. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about-us">About Us</Link>
            <Link href="/terms-and-conditions">Terms</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{title}</p>
      <div className="mt-4 flex flex-col gap-2 text-sm text-cream/70">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-gold">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
