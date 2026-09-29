"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { EditorialPage } from "@/data/pages";
import type { ProductKind } from "@/data/catalog";
import { TEAM } from "@/data/site";
import { PageHero } from "@/components/lux/page-hero";
import { Reveal, Stagger, StaggerItem, Marquee } from "@/components/lux/motion";
import { OrbitWidget, QrcGauges } from "@/components/lux/process";
import {
  AwardsRibbon,
  BookCallForm,
  CompareBoard,
  EventsStrip,
  NewsList,
  ProductBrowser,
  StatWidgets,
  TeamGrid,
  ToolWidget,
  Voices,
  BlogGrid,
} from "@/components/lux/widgets";

const EASE = [0.22, 1, 0.36, 1] as const;

const HOUSES = [
  "Marcellus",
  "Abakkus",
  "White Oak",
  "360 ONE",
  "Unifi",
  "Ambit",
  "SageOne",
  "ASK",
  "Carnelian",
  "Alchemy",
];

const RENDERABLE = new Set([
  "stats",
  "fivep",
  "orbit",
  "qrc",
  "team",
  "voices",
  "events",
  "awards",
  "news",
  "products",
  "blog",
  "compare",
  "form",
  "marquee",
]);

function WidgetBand({ page, kindHint }: { page: EditorialPage; kindHint?: ProductKind }) {
  const widgets = page.widgets.filter((w) => RENDERABLE.has(w));
  if (widgets.length === 0) return null;

  return (
    <div className="border-t border-white/10 bg-[#141312]/70">
      <div className="container-page space-y-14 py-14 sm:space-y-16 sm:py-16">
        {widgets.includes("stats") ? (
          <Reveal>
            <StatWidgets />
          </Reveal>
        ) : null}

        {widgets.includes("fivep") || widgets.includes("orbit") ? (
          <Reveal>
            <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <div>
                <p className="eyebrow">5P analysis</p>
                <h2 className="section-title mt-2 text-cream">The orbit we never skip</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/60">
                  People, Philosophy, Performance, Portfolio, Price — scored before any conversation about taste.
                </p>
              </div>
              <OrbitWidget />
            </div>
          </Reveal>
        ) : null}

        {widgets.includes("qrc") ? (
          <Reveal>
            <div>
              <p className="eyebrow">QRC screen</p>
              <h2 className="section-title mt-2 mb-8 text-cream">Quality · Risk · Consistency</h2>
              <QrcGauges />
            </div>
          </Reveal>
        ) : null}

        {widgets.includes("marquee") ? (
          <Reveal>
            <Marquee className="border-y border-white/10 py-4" items={HOUSES} />
          </Reveal>
        ) : null}

        {widgets.includes("products") ? (
          <Reveal>
            <ProductBrowser kind={kindHint} title="Related strategies" />
          </Reveal>
        ) : null}

        {widgets.includes("blog") ? (
          <Reveal>
            <BlogGrid />
          </Reveal>
        ) : null}

        {widgets.includes("team") ? (
          <Reveal>
            <TeamGrid />
          </Reveal>
        ) : null}

        {widgets.includes("voices") ? (
          <Reveal>
            <Voices />
          </Reveal>
        ) : null}

        {widgets.includes("events") ? (
          <Reveal>
            <EventsStrip />
          </Reveal>
        ) : null}

        {widgets.includes("awards") ? (
          <Reveal>
            <AwardsRibbon />
          </Reveal>
        ) : null}

        {widgets.includes("news") ? (
          <Reveal>
            <NewsList />
          </Reveal>
        ) : null}

        {widgets.includes("compare") ? (
          <Reveal>
            <CompareBoard />
          </Reveal>
        ) : null}

        {widgets.includes("form") ? (
          <Reveal>
            <div className="mx-auto max-w-xl">
              <BookCallForm />
            </div>
          </Reveal>
        ) : null}
      </div>
    </div>
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

  const sections = (page.sections ?? []).filter((s) => s.heading?.trim() || s.body?.trim());
  const faqs = page.faqs ?? [];
  const isLegal =
    page.kind === "legal" || ["disclaimer", "privacy-policy", "terms-and-conditions"].includes(page.slug);
  const showAside = !isLegal;
  const hasMainColumn =
    Boolean(member) ||
    sections.length > 0 ||
    faqs.length > 0 ||
    page.kind === "form" ||
    page.kind === "tool" ||
    page.slug === "latestpmsreturns" ||
    page.slug === "aif-return-comparison";

  return (
    <div className="bg-[#0f0e0c] text-cream">
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      {hasMainColumn ? (
        <div
          className={
            showAside
              ? "container-page grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_260px] lg:gap-12"
              : "container-page py-10 sm:py-12"
          }
        >
          <div className="space-y-8">
            {member ? (
              <Reveal>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="relative h-36 w-36 shrink-0 overflow-hidden border border-gold/30 sm:h-44 sm:w-44">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-[center_12%]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{member.role}</p>
                    <p className="mt-3 text-2xl font-semibold leading-relaxed text-cream/85">
                      {member.quote}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-cream/60">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ) : null}

            <Stagger className="space-y-8" delay={0.1}>
              {sections.map((s) => (
                <StaggerItem key={s.heading || s.body}>
                  {s.heading ? (
                    <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">{s.heading}</h2>
                  ) : null}
                  {s.body ? (
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-cream/65">{s.body}</p>
                  ) : null}
                </StaggerItem>
              ))}
            </Stagger>

            {faqs.length ? (
              <Reveal delay={0.05}>
                <div className="space-y-3">
                  <p className="eyebrow">FAQs</p>
                  {faqs.map((f, i) => (
                    <motion.details
                      key={f.q}
                      className="widget-card group p-5"
                      initial={{ opacity: 0.7, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4, ease: EASE }}
                    >
                      <summary className="cursor-pointer list-none font-medium text-cream marker:content-none [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center justify-between gap-4">
                          {f.q}
                          <span className="text-gold transition group-open:rotate-45">+</span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-cream/65">{f.a}</p>
                    </motion.details>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {page.kind === "form" ? (
              <Reveal>
                <BookCallForm />
              </Reveal>
            ) : null}
            {page.kind === "tool" ? (
              <Reveal>
                <ToolWidget slug={page.slug} />
              </Reveal>
            ) : null}
            {page.slug === "latestpmsreturns" || page.slug === "aif-return-comparison" ? (
              <Reveal>
                <CompareBoard />
              </Reveal>
            ) : null}
          </div>

          {showAside ? (
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.12}>
                <motion.div
                  className="widget-card p-5"
                  whileHover={{ borderColor: "rgba(168,146,98,0.45)" }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Next step</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">Speak with a specialist</p>
                  <Link href="/book-a-call" className="gold-btn mt-5 inline-flex h-11 px-5">
                    Book a call
                  </Link>
                </motion.div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="widget-card p-5 text-sm text-cream/60">
                  <p>contact@pmsaifworld.com</p>
                  <p className="mt-1">+91 85275 12552</p>
                </div>
              </Reveal>
            </aside>
          ) : null}
        </div>
      ) : null}

      <WidgetBand page={page} kindHint={kindHint} />
    </div>
  );
}
