import Link from "next/link";
import type { EditorialPage } from "@/data/pages";
import { GoldField, Reveal } from "@/components/lux/motion";
import {
  AwardsRibbon,
  BookCallForm,
  CompareBoard,
  EventsStrip,
  NewsList,
  OrbitWidget,
  ProductBrowser,
  QrcGauges,
  StatWidgets,
  TeamGrid,
  ToolWidget,
  Voices,
} from "@/components/lux/widgets";
import type { ProductKind } from "@/data/catalog";
import { TEAM } from "@/data/site";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-gold/15 bg-ink text-cream">
      <GoldField />
      <div className="container-page relative py-20 sm:py-28">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
        {lead ? <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/65 sm:text-lg">{lead}</p> : null}
      </div>
    </section>
  );
}

export function EditorialView({ page }: { page: EditorialPage }) {
  const kindHint: ProductKind | undefined =
    page.kind === "pms" ? "PMS" : page.kind === "aif" ? "AIF" : undefined;
  const member = page.slug.startsWith("team-member/")
    ? TEAM.find((t) => page.slug.endsWith(t.slug))
    : page.slug === "team-member/kamal-manocha"
      ? TEAM[0]
      : undefined;

  return (
    <div className="bg-ink text-cream">
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          {member ? (
            <Reveal>
              <p className="font-display text-2xl leading-relaxed text-cream/80">“{member.quote}”</p>
              <p className="mt-4 text-sm text-cream/60">{member.bio}</p>
            </Reveal>
          ) : null}
          {page.sections.map((s) => (
            <Reveal key={s.heading}>
              <h2 className="font-display text-3xl">{s.heading}</h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/65">{s.body}</p>
            </Reveal>
          ))}
          {page.faqs?.length ? (
            <div className="space-y-3">
              {page.faqs.map((f) => (
                <details key={f.q} className="widget-card p-5">
                  <summary className="cursor-pointer font-medium text-cream">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">{f.a}</p>
                </details>
              ))}
            </div>
          ) : null}
          {page.kind === "form" ? <BookCallForm /> : null}
          {page.kind === "tool" ? <ToolWidget slug={page.slug} /> : null}
          {page.slug === "latestpmsreturns" || page.slug === "aif-return-comparison" ? <CompareBoard /> : null}
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <div className="widget-card p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Next step</p>
            <p className="mt-2 font-display text-2xl">Speak with a specialist</p>
            <Link href="/book-a-call" className="gold-btn mt-5 inline-flex h-11 px-5">
              Book a call
            </Link>
          </div>
          <div className="widget-card p-5 text-sm text-cream/60">
            <p>contact@pmsaifworld.com</p>
            <p className="mt-1">+91 85275 12552</p>
          </div>
        </aside>
      </div>
      <div className="space-y-20 border-t border-gold/15 bg-ink-800/30 py-20">
        <div className="container-page space-y-20">
          {page.widgets.includes("stats") ? <StatWidgets /> : null}
          {page.widgets.includes("fivep") ? (
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow">5P analysis</p>
                <h2 className="section-title mt-3 text-cream">The orbit we never skip</h2>
              </div>
              <OrbitWidget />
            </div>
          ) : null}
          {page.widgets.includes("qrc") ? <QrcGauges /> : null}
          {page.widgets.includes("team") ? <TeamGrid /> : null}
          {page.widgets.includes("voices") ? <Voices /> : null}
          {page.widgets.includes("events") ? <EventsStrip /> : null}
          {page.widgets.includes("awards") ? <AwardsRibbon /> : null}
          {page.widgets.includes("news") ? <NewsList /> : null}
          {page.widgets.includes("products") ? (
            <ProductBrowser kind={kindHint} title="Related strategies" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
