"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GoldField, Marquee, Reveal, Stagger, StaggerItem, CountUp } from "@/components/lux/motion";
import { BrandLogo } from "@/components/lux/brand-logo";
import { ClientVideos, YouTubeShelf, BookCallForm, Voices } from "@/components/lux/widgets";
import { OrbitWidget, FounderWidgets, ServiceWidgets } from "@/components/lux/process";
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

const SELECTION_STEPS = [
  {
    step: "01",
    title: "Mandate clarity",
    copy: "We begin with the household — horizon, liquidity, and what the portfolio is actually meant to do.",
  },
  {
    step: "02",
    title: "5P underwriting",
    copy: "People, Philosophy, Performance process, Portfolio construction, and Price — before any product conversation.",
  },
  {
    step: "03",
    title: "Manager access",
    copy: "Direct conversations with the people running the book — not a scripted sales call.",
  },
  {
    step: "04",
    title: "Ongoing review",
    copy: "Consolidated statements, suitability checks, and a specialist who stays on the file.",
  },
];

function HeroStage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % SELECTION_STEPS.length), 3800);
    return () => window.clearInterval(id);
  }, []);

  const item = SELECTION_STEPS[active];

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      initial={{ y: 32, opacity: 0.7 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-gold/[0.06] blur-3xl" />

      {/* Soft orbit ring */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex">
        <motion.div
          className="h-[108%] w-[108%] rounded-full border border-gold/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative overflow-hidden border border-white/10 bg-[#121110]/95">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(168,146,98,0.1),transparent_55%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

        <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold/85">How we select</p>
          <p className="mt-1 text-sm text-cream/50">5P framework · suitability first</p>
        </div>

        {/* 5P process strip */}
        <div className="relative flex flex-wrap gap-2 border-b border-white/10 px-5 py-4 sm:px-6">
          {FIVE_P.map((p, i) => (
            <motion.span
              key={p.key}
              className="border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] text-cream/60"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.07, duration: 0.4 }}
              whileHover={{ borderColor: "rgba(168,146,98,0.45)", color: "#cfc3a8" }}
            >
              {p.key}
            </motion.span>
          ))}
        </div>

        {/* Cycling selection step */}
        <div className="relative px-5 py-6 sm:px-6 sm:py-7">
          <div className="relative min-h-[168px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.step}
                className="absolute inset-x-0 top-0"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    className="grid h-11 w-11 place-items-center border border-gold/35 text-sm font-semibold text-gold"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {item.step}
                  </motion.span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-cream/40">Selection process</p>
                    <p className="mt-0.5 text-xl font-semibold tracking-tight text-cream sm:text-2xl">
                      {item.title}
                    </p>
                  </div>
                </div>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/60 sm:text-[15px]">
                  {item.copy}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {SELECTION_STEPS.map((s, i) => (
                <button
                  key={s.step}
                  type="button"
                  aria-label={`Show step ${s.title}`}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-gold" : "w-1.5 bg-cream/25 hover:bg-cream/40"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-cream/35">
              {item.step} / 0{SELECTION_STEPS.length}
            </p>
          </div>
        </div>

        {/* Manager houses — names only, no returns */}
        <div className="relative border-t border-white/10 px-5 py-4 sm:px-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-cream/35">Manager houses</p>
          <div className="relative mt-3 h-7 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={HOUSES[active % HOUSES.length]}
                className="absolute inset-x-0 text-base font-medium text-cream/80"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {HOUSES[active % HOUSES.length]}
                <span className="text-cream/35"> · </span>
                {HOUSES[(active + 1) % HOUSES.length]}
                <span className="text-cream/35"> · </span>
                {HOUSES[(active + 2) % HOUSES.length]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function HomeView() {
  return (
    <div className="bg-[#0f0e0c] text-cream">
      {/* ── Hero: one composition, brand first ── */}
      <section className="relative overflow-hidden">
        <GoldField />
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-[6%] h-px w-[min(90vw,640px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/45 to-transparent lg:left-[28%] lg:translate-x-0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        <div className="container-page relative flex min-h-0 flex-col justify-start pb-16 pt-5 sm:pt-8 lg:min-h-[calc(100svh-5.5rem)] lg:justify-center lg:pb-24 lg:pt-4">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-16">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-none lg:text-left">
              <motion.p
                className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold/80"
                initial={{ y: 12, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                India’s research-first PMS & AIF platform
              </motion.p>

              <motion.div
                className="mt-5 sm:mt-6"
                initial={{ y: 24, opacity: 0.75 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="sr-only">PMS AIF WORLD</h1>
                <BrandLogo
                  href={null}
                  priority
                  height={80}
                  className="mx-auto max-w-[min(92vw,440px)] lg:mx-0 lg:max-w-[520px]"
                />
              </motion.div>

              <motion.p
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/75 sm:mt-7 sm:text-xl lg:mx-0"
                initial={{ y: 20, opacity: 0.7 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.12 }}
              >
                Creating real stories of{" "}
                <span className="text-cream">wealth creation</span> through{" "}
                <span className="text-gold">alpha</span>-focused investments.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:justify-start"
                initial={{ y: 16 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
              >
                <Link href="/book-a-call" className="gold-btn h-12 w-full px-8 sm:w-auto">
                  Book a specialist call
                </Link>
                <Link href="/pms/best-pms-in-india" className="gold-btn-ghost h-12 w-full px-8 sm:w-auto">
                  Explore top PMS
                </Link>
              </motion.div>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <HeroStage />
            </div>
          </div>
        </div>

        <Marquee className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#0f0e0c]/80 py-3.5 backdrop-blur-sm" items={HOUSES} />
      </section>

      {/* ── Proof strip ── */}
      <section className="border-b border-white/10 py-12 sm:py-14">
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
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">Hear from our clients</p>
          <h2 className="section-title mt-3 max-w-2xl">Real conversations from principals who stayed</h2>
        </Reveal>
        <div className="mt-10">
          <ClientVideos />
        </div>
      </section>

      {/* ── Method: 5P + QRC ── */}
      <section className="relative overflow-hidden border-y border-white/10 bg-[#141312]/70 py-16 sm:py-20">
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-page relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
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
            </div>

            <Reveal delay={0.1}>
              <OrbitWidget />
            </Reveal>
          </div>

          <div className="mt-14 sm:mt-16">
            <FounderWidgets />
          </div>
        </div>
      </section>

      {/* ── Wealth services as widgets ── */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">Wealth services</p>
          <h2 className="section-title mt-3">Four desks. One household view.</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/55">
            Allocation, statements, manager access, and the QRC screen — each as its own desk.
          </p>
        </Reveal>
        <div className="mt-10">
          <ServiceWidgets />
        </div>
      </section>

      {/* ── Why us — compact ── */}
      <section className="border-y border-white/10 bg-[#141312]/60 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Why families stay</p>
            <h2 className="section-title mt-3">Built for concentration, not collection</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" delay={0.06}>
            {WHY_US.map((w, i) => (
              <StaggerItem key={w.title}>
                <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-gold/70">0{i + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-cream">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{w.copy}</p>
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── YouTube ── */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <p className="eyebrow">Webinars & panels</p>
          <h2 className="section-title mt-3">From the research desk</h2>
          <p className="mt-3 max-w-xl text-cream/55">Fund-manager sessions — tap to watch.</p>
        </Reveal>
        <div className="mt-10">
          <YouTubeShelf />
        </div>
      </section>

      {/* ── Voices ── */}
      <section className="border-y border-white/10 bg-[#141312]/60 py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Testimonials</p>
            <h2 className="section-title mt-3">In their words</h2>
          </Reveal>
          <div className="mt-10">
            <Voices />
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,146,98,0.18),transparent_55%)]" />
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
