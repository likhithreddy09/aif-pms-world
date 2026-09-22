"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GoldField, Marquee, Reveal, Stagger, StaggerItem, CountUp } from "@/components/lux/motion";
import { ClientVideos, YouTubeShelf, BookCallForm, Voices } from "@/components/lux/widgets";
import { QrcGauges, OrbitWidget, FounderWidgets, ServiceWidgets } from "@/components/lux/process";
import { SITE, STATS, WHY_US, FIVE_P } from "@/data/site";

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

const DESK_SCORES = [
  { k: "Q", label: "Quality", v: 86 },
  { k: "R", label: "Risk", v: 74 },
  { k: "C", label: "Consistency", v: 81 },
];

function HeroDeskWidget() {
  const [house, setHouse] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setHouse((i) => (i + 1) % HOUSES.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ y: 24, opacity: 0.85 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-gold/[0.07] blur-3xl" />

      <div className="relative overflow-hidden border border-gold/25 bg-ink-800/70 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,146,98,0.14),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold/75">Research desk</p>
              <p className="mt-1 text-sm text-cream/55">Live QRC screen</p>
            </div>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-cream/45">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
                <span className="relative h-2 w-2 rounded-full bg-gold" />
              </span>
              Live
            </span>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3">
            {DESK_SCORES.map((item, i) => {
              const circ = 2 * Math.PI * 36;
              return (
                <div key={item.k} className="flex flex-col items-center">
                  <svg viewBox="0 0 96 96" className="h-20 w-20 sm:h-24 sm:w-24">
                    <circle cx="48" cy="48" r="36" fill="none" stroke="rgba(168,146,98,0.12)" strokeWidth="6" />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="36"
                      fill="none"
                      stroke="#a89262"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circ}
                      initial={{ strokeDashoffset: circ }}
                      animate={{ strokeDashoffset: circ * (1 - item.v / 100) }}
                      transition={{ duration: 1.2, delay: 0.45 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      transform="rotate(-90 48 48)"
                    />
                    <text
                      x="48"
                      y="52"
                      textAnchor="middle"
                      fill="#f0efeb"
                      fontSize="18"
                      fontWeight="600"
                      fontFamily="inherit"
                    >
                      {item.v}
                    </text>
                  </svg>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-cream/50">{item.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-cream/40">Now underwriting</p>
            <div className="relative mt-2 h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={HOUSES[house]}
                  className="absolute inset-x-0 text-lg font-semibold text-cream"
                  initial={{ y: 14, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0.4 }}
                  transition={{ duration: 0.35 }}
                >
                  {HOUSES[house]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
            {[
              { n: "800+", l: "Clients" },
              { n: "2,200 Cr", l: "AUM" },
              { n: "400+", l: "Products" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ y: 10, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.45 }}
              >
                <p className="text-sm font-semibold text-gold sm:text-base">{s.n}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cream/40">{s.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HomeView() {
  return (
    <div className="bg-ink text-cream">
      {/* ── Hero: one composition, brand first ── */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <GoldField />
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-[12%] h-px w-[min(90vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:left-[28%] lg:translate-x-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        <div className="container-page relative flex min-h-[100svh] flex-col justify-center pb-28 pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
            <div>
              <motion.p
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold/80"
                initial={{ y: 12 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
              >
                India’s research-first PMS & AIF platform
              </motion.p>

              <motion.h1
                className="mt-6 max-w-4xl text-[clamp(2.4rem,7vw,4.75rem)] font-semibold leading-[0.95] tracking-tight"
                initial={{ y: 28 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="block text-cream">PMS AIF</span>
                <span className="block text-gold">WORLD</span>
              </motion.h1>

              <motion.p
                className="mt-7 max-w-xl text-lg leading-relaxed text-cream/70 sm:text-xl"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
              >
                Creating real stories of{" "}
                <span className="text-cream">wealth creation</span> through{" "}
                <span className="text-gold">alpha</span>-focused investments.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col gap-3 sm:flex-row"
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
              >
                <Link href="/book-a-call" className="gold-btn h-12 px-8">
                  Book a specialist call
                </Link>
                <Link href="/pms/best-pms-in-india" className="gold-btn-ghost h-12 px-8">
                  Explore top PMS
                </Link>
              </motion.div>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <HeroDeskWidget />
            </div>
          </div>
        </div>

        <Marquee className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink/50 py-3.5 backdrop-blur-sm" items={HOUSES} />
      </section>

      {/* ── Proof strip ── */}
      <section className="border-b border-white/10 py-14 sm:py-16">
        <div className="container-page">
          <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="text-center sm:text-left">
                  <p className="text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-cream/45">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Client films ── */}
      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Hear from our clients</p>
          <h2 className="section-title mt-3 max-w-2xl">Real conversations from principals who stayed</h2>
        </Reveal>
        <div className="mt-12">
          <ClientVideos />
        </div>
      </section>

      {/* ── Method: 5P + QRC ── */}
      <section className="relative overflow-hidden border-y border-white/10 bg-ink-800/40 py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/[0.06] blur-3xl" />
        <div className="container-page relative">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow">How we select</p>
                <h2 className="section-title mt-3">5P framework. QRC scores. No brochure theatre.</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-cream/60">
                  People, Philosophy, Performance, Portfolio, Price — then Quality, Risk and Consistency. Objective
                  screens before any conversation about taste.
                </p>
              </Reveal>

              <Stagger className="mt-10 flex flex-wrap gap-2" delay={0.05}>
                {FIVE_P.map((p, i) => (
                  <StaggerItem key={p.key}>
                    <motion.span
                      className="inline-flex border border-gold/25 bg-ink/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/80"
                      whileHover={{ borderColor: "rgba(168,146,98,0.55)", y: -2 }}
                    >
                      <span className="mr-2 text-gold/70">0{i + 1}</span>
                      {p.key}
                    </motion.span>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className="mt-12">
                <QrcGauges />
              </div>
            </div>

            <Reveal delay={0.1}>
              <OrbitWidget />
            </Reveal>
          </div>

          <div className="mt-16 sm:mt-20">
            <FounderWidgets />
          </div>
        </div>
      </section>

      {/* ── Wealth services as widgets ── */}
      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Wealth services</p>
          <h2 className="section-title mt-3">Four desks. One household view.</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/55">
            Allocation, statements, manager access, and the QRC screen — each as its own desk.
          </p>
        </Reveal>
        <div className="mt-12">
          <ServiceWidgets />
        </div>
      </section>

      {/* ── Why us — compact ── */}
      <section className="border-y border-white/10 bg-ink-800/30 py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Why families stay</p>
            <h2 className="section-title mt-3">Built for concentration, not collection</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" delay={0.06}>
            {WHY_US.map((w, i) => (
              <StaggerItem key={w.title}>
                <article>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-gold/70">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-cream">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{w.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── YouTube ── */}
      <section className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Webinars & panels</p>
          <h2 className="section-title mt-3">From the research desk</h2>
          <p className="mt-3 max-w-xl text-cream/55">Fund-manager sessions — tap to watch.</p>
        </Reveal>
        <div className="mt-12">
          <YouTubeShelf />
        </div>
      </section>

      {/* ── Voices ── */}
      <section className="border-y border-white/10 bg-ink-800/30 py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="section-title mt-3">In their words</h2>
          </Reveal>
          <div className="mt-12">
            <Voices />
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,146,98,0.08),transparent_55%)]" />
        <div className="container-page relative grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Next step</p>
            <h2 className="section-title mt-3">Do not simply invest. Make informed decisions.</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/60">
              Thirty minutes with a specialist. Or write to {SITE.email}. Delhi · Mumbai · Bengaluru.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.phoneHref} className="gold-btn-ghost h-11 px-5">
                {SITE.phone}
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="gold-btn-ghost h-11 px-5">
                WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <BookCallForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
