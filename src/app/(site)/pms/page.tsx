import { PageHero } from "@/components/lux/editorial";
import { ProductBrowser, QrcGauges } from "@/components/lux/widgets";
import { Reveal } from "@/components/lux/motion";

export const metadata = {
  title: "Portfolio Management Services",
};

export default function PmsPage() {
  return (
    <div className="bg-ink text-cream">
      <PageHero
        eyebrow="PMS"
        title="Portfolio Management Services"
        lead="SEBI-regulated, separately managed accounts for HNIs, NRIs and institutions. Direct stock ownership, a named manager, and a ₹50 lakh minimum — selected through QRC and 5P, not a brochure."
      />
      <section className="container-page grid gap-10 py-16 lg:grid-cols-3">
        {[
          ["Discretionary", "The manager acts with speed. Most families choose this when they want expertise without a daily veto."],
          ["Non-discretionary", "Advice with your signature on every ticket. For principals who want the last word."],
          ["Advisory", "Research and a point of view. Execution stays in your own brokerage account."],
        ].map(([t, b], i) => (
          <Reveal key={t} delay={i * 0.06}>
            <article className="widget-card h-full p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">0{i + 1}</p>
              <h2 className="mt-3 font-display text-3xl">{t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">{b}</p>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="border-y border-gold/15 bg-ink-800/30 py-16">
        <div className="container-page">
          <p className="eyebrow">Objective screen</p>
          <h2 className="section-title mt-3">QRC before any conversation about taste</h2>
          <div className="mt-10">
            <QrcGauges />
          </div>
        </div>
      </section>
      <section className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {[
            ["Equity PMS", "Concentrated listed equity across large, mid and small caps."],
            ["Multi-asset PMS", "Equity, debt and alternatives in one book — volatility with a purpose."],
            ["Thematic PMS", "Manufacturing, digital, healthcare, ESG — when the household wants a sleeve, not a slogan."],
            ["Versus mutual funds", "Direct ownership, customisation, real-time holdings. Higher concentration. Not safer — just clearer."],
          ].map(([t, b]) => (
            <article key={t}>
              <h3 className="font-display text-3xl">{t}</h3>
              <p className="mt-3 text-cream/65">{b}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-gold/15 py-16">
        <div className="container-page">
          <ProductBrowser kind="PMS" title="PMS universe" />
        </div>
      </section>
    </div>
  );
}
