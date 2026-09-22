import { PageHero } from "@/components/lux/editorial";
import { ProductBrowser } from "@/components/lux/widgets";
import { Reveal } from "@/components/lux/motion";

export const metadata = {
  title: "Alternative Investment Funds",
};

export default function AifPage() {
  return (
    <div className="bg-ink text-cream">
      <PageHero
        eyebrow="AIF"
        title="Alternative Investment Funds"
        lead="Privately pooled, SEBI-registered vehicles for sophisticated capital. Category I, II and III — venture, private equity, credit, listed long-only and long-short. Typical ticket: ₹1 crore."
      />
      <section className="container-page grid gap-6 py-16 lg:grid-cols-3">
        {[
          ["Category I", "Startups, infrastructure, social ventures, angel funds. No leverage. Patient capital with a public-good overlay.", "₹25L–₹1 Cr"],
          ["Category II", "Private equity, private credit, special situations, real assets. Structural leverage only. The core family-office sleeve.", "₹1 Cr"],
          ["Category III", "Listed long-only and long-short. Leverage within limits. The hedge-fund and high-octane public-market book.", "₹1 Cr"],
        ].map(([t, b, m], i) => (
          <Reveal key={t} delay={i * 0.08}>
            <article className="widget-card h-full p-7">
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold">SEBI</p>
              <h2 className="mt-3 font-display text-4xl">{t}</h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">{b}</p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-gold">Typical ticket {m}</p>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="border-y border-gold/15 py-16">
        <div className="container-page max-w-3xl space-y-5 text-cream/70 leading-relaxed">
          <p>
            As of March 2025, AIFs had received commitments exceeding ₹13.49 lakh crore, growing at a five-year CAGR of
            over 25%. Families use them for unlisted and pre-IPO alpha, hurdle rates, co-invest rights, and structures
            that PMS and mutual funds cannot offer.
          </p>
          <p>
            Compared with PMS, AIFs are pooled, often locked, and legally a trust or LLP. Liquidity is a feature you
            negotiate in the PPM — not an assumption.
          </p>
        </div>
      </section>
      <section className="container-page py-16">
        <ProductBrowser kind="AIF" title="AIF universe" />
      </section>
    </div>
  );
}
