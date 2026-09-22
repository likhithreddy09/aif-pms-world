"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FIVE_P, SERVICES, SITE_IMAGES } from "@/data/site";
import { Reveal, Stagger, StaggerItem } from "@/components/lux/motion";

export function ServiceWidgets() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2" delay={0.06}>
      {SERVICES.map((item, i) => (
        <StaggerItem key={item.href}>
          <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.28 }}>
            <Link href={item.href} className="group media-frame block h-full overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
                <Image
                  unoptimized
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:640px) 100vw, 50vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-[1.06]"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/15" />
                <div className="absolute inset-0 bg-gold/[0.04] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gold/75">0{i + 1}</p>
                  <p className="mt-2 text-lg font-semibold text-cream sm:text-xl">{item.title}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/70">{item.copy}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-gold/85 transition group-hover:translate-x-1 group-hover:text-gold">
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function FounderWidgets() {
  const people = [
    {
      img: SITE_IMAGES.kamal,
      name: "Kamal Manocha",
      role: "Founder and CEO",
      quote:
        "We are a new-age investment services company, committed to delivering an analytics-driven, high-quality investing experience. With us, you invest in the best.",
    },
    {
      img: SITE_IMAGES.ritika,
      name: "Ritika Farma",
      role: "Director & EVP",
      quote:
        "Suitability over sales. We serve what your portfolio needs — even when it challenges your existing biases.",
    },
  ];

  return (
    <Stagger className="grid gap-4 lg:grid-cols-2">
      {people.map((p) => (
        <StaggerItem key={p.name}>
          <motion.article
            className="widget-card p-5 sm:p-6"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-gold/25 sm:h-36 sm:w-36">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover object-[center_12%]"
                />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold/75">{p.role}</p>
                <h3 className="mt-1.5 text-lg font-semibold leading-snug text-cream sm:text-xl">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">“{p.quote}”</p>
              </div>
            </div>
          </motion.article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function OrbitWidget() {
  return (
    <div className="w-full">
      <div className="lg:hidden">
        <Reveal>
          <div className="widget-card flex items-center gap-4 p-5">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10">
              <div className="text-center">
                <p className="text-[8px] uppercase tracking-[0.14em] text-gold/80">First</p>
                <p className="text-xl font-semibold text-cream">5P</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-cream">Industry-first framework</p>
              <p className="mt-1 text-sm text-cream/55">People · Philosophy · Performance · Portfolio · Price</p>
            </div>
          </div>
        </Reveal>
        <Stagger className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" delay={0.06}>
          {FIVE_P.map((p) => (
            <StaggerItem key={p.key}>
              <motion.div
                className="widget-card h-full p-3.5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/80">{p.key}</p>
                <p className="mt-2 text-xs leading-relaxed text-cream/55">{p.copy}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
        <motion.div
          className="absolute inset-[16%] rounded-full border border-gold/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[28%] grid place-items-center rounded-full border border-gold/25 bg-ink-800/70 backdrop-blur-sm">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70">Industry first</p>
            <p className="mt-1 text-3xl font-semibold text-cream">5P</p>
          </div>
        </div>
        {FIVE_P.map((p, i) => {
          const angle = (i / FIVE_P.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          return (
            <motion.div
              key={p.key}
              className="absolute w-[6.5rem] -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.45 }}
            >
              <motion.div
                className="border border-gold/25 bg-ink/90 px-2.5 py-2 text-center backdrop-blur-sm"
                whileHover={{ borderColor: "rgba(168,146,98,0.55)", y: -2 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.6 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-gold/80">{p.key}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function QrcGauges({
  scores = { q: 86, r: 74, c: 81 },
}: {
  scores?: { q: number; r: number; c: number };
}) {
  const items = [
    { k: "Quality", v: scores.q },
    { k: "Risk", v: scores.r },
    { k: "Consistency", v: scores.c },
  ];
  return (
    <Stagger className="grid grid-cols-3 gap-2 sm:gap-4" delay={0.07}>
      {items.map((item) => (
        <StaggerItem key={item.k}>
          <motion.div
            className="widget-card flex flex-col items-center px-2 py-4 sm:p-5"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <svg viewBox="0 0 120 120" className="h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28">
              <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(168,146,98,0.12)" strokeWidth="7" />
              <motion.circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#a89262"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 48}
                initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                whileInView={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - item.v / 100) }}
                viewport={{ once: true }}
                transition={{ duration: 1.15, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                transform="rotate(-90 60 60)"
              />
              <text
                x="60"
                y="66"
                textAnchor="middle"
                fill="#f0efeb"
                fontSize="22"
                fontFamily="sans-serif"
                fontWeight="600"
              >
                {item.v}
              </text>
            </svg>
            <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-cream/55 sm:mt-3 sm:text-[11px] sm:tracking-[0.18em]">
              {item.k}
            </p>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function AwardsGallery() {
  const shots = [
    { src: SITE_IMAGES.award, label: "Brand Impact" },
    { src: SITE_IMAGES.awardAlt, label: "Crystal Gazing" },
    { src: SITE_IMAGES.event1, label: "Summit" },
    { src: SITE_IMAGES.event2, label: "Awards night" },
  ];
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {shots.map((s) => (
        <StaggerItem key={s.src}>
          <div className="media-frame relative aspect-[4/3]">
            <Image unoptimized src={s.src} alt={s.label} fill sizes="25vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cream/80">{s.label}</p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
