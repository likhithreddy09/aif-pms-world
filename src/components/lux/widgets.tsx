"use client";

import { FormEvent, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  NIFTY_PE,
  STATS,
  TESTIMONIALS,
  TEAM,
  NEWS,
  EVENTS,
  BLOGS,
  CLIENTS,
  WEBINARS,
  SITE,
} from "@/data/site";
import { PRODUCTS, featuredProducts, productsByKind, type Product, type ProductKind } from "@/data/catalog";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/lux/motion";
import { cn } from "@/lib/utils";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86z" />
    </svg>
  );
}

export function StatWidgets() {
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {STATS.map((s) => (
        <StaggerItem key={s.label}>
          <article className="widget-card p-5 sm:p-6">
            <p className="text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-cream/50">{s.label}</p>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function ClientVideos() {
  return (
    <Stagger className="grid gap-4 md:grid-cols-3">
      {CLIENTS.map((c) => (
        <StaggerItem key={c.name}>
          <ClientVideoCard name={c.name} role={c.role} video={c.video} poster={c.poster} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function ClientVideoCard({
  name,
  role,
  video,
  poster,
}: {
  name: string;
  role: string;
  video: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <article className="group media-frame">
      <div className="relative aspect-video bg-ink-800">
        {!playing ? (
          <Image unoptimized
            src={poster}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover object-[center_20%]"
            priority={false}
          />
        ) : null}
        <video
          ref={ref}
          src={video}
          playsInline
          preload="none"
          className={cn("h-full w-full object-cover", playing ? "relative" : "absolute inset-0 opacity-0")}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${name}` : `Play ${name}`}
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center transition",
            playing ? "bg-transparent opacity-0 hover:bg-ink/40 hover:opacity-100" : "bg-ink/25"
          )}
        >
          <motion.span
            className="play-pulse grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-ink/75 text-cream shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            {playing ? (
              <span className="flex gap-1">
                <span className="h-4 w-1 bg-cream" />
                <span className="h-4 w-1 bg-cream" />
              </span>
            ) : (
              <PlayIcon className="ml-0.5 h-5 w-5 text-gold" />
            )}
          </motion.span>
        </button>
      </div>
      <div className="border-t border-white/10 p-4">
        <p className="text-base font-semibold text-cream">{name}</p>
        <p className="mt-1 text-sm leading-snug text-cream/55">{role}</p>
      </div>
    </article>
  );
}

export function YouTubeShelf() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div>
      <Stagger className="grid gap-4 md:grid-cols-3">
        {WEBINARS.map((w) => (
          <StaggerItem key={w.id}>
            <button
              type="button"
              onClick={() => setActive(w.id)}
              className="group media-frame block w-full text-left"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image unoptimized
                  src={w.thumb}
                  alt={w.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute bottom-3 left-3 right-12 text-left text-sm font-medium leading-snug text-cream">
                  {w.title}
                </span>
                <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-ink/60 text-cream backdrop-blur-sm transition group-hover:border-gold group-hover:text-gold">
                  <PlayIcon className="ml-0.5 h-4 w-4" />
                </span>
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-cream/50">Fund-manager conversations from the PMS AIF WORLD desk.</p>
        <a
          href={SITE.youtube}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold hover:text-gold-light"
        >
          Explore YouTube channel →
        </a>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden border border-white/15 bg-ink shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video w-full">
                <iframe
                  title="PMS AIF WORLD webinar"
                  src={`https://www.youtube.com/embed/${active}?autoplay=1&rel=0`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 bg-ink/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cream"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export {
  ServiceWidgets,
  FounderWidgets,
  OrbitWidget,
  QrcGauges,
  AwardsGallery,
} from "@/components/lux/process";

export function ProductBrowser({
  kind,
  title = "Product universe",
}: {
  kind?: ProductKind;
  title?: string;
}) {
  const source = kind ? productsByKind(kind) : PRODUCTS;
  const cats = useMemo(() => {
    const set = new Set(source.map((p) => p.category));
    return ["All", ...Array.from(set).sort()];
  }, [source]);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const rows = source
    .filter((p) => cat === "All" || p.category === cat)
    .filter((p) => !q || p.name.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 36);

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{kind ?? "PMS · AIF"}</p>
          <h2 className="section-title mt-2">{title}</h2>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search a strategy"
          className="input-field max-w-xs bg-white/5 text-cream placeholder:text-cream/35"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition",
              cat === c
                ? "border-gold bg-gold text-ink"
                : "border-gold/30 text-cream/70 hover:border-gold hover:text-gold"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((p, i) => (
          <ProductTile key={p.slug} product={p} delay={Math.min(i, 12) * 0.03} />
        ))}
      </div>
      <p className="mt-4 text-xs text-cream/40">
        Showing {rows.length} of {source.length} hardcoded strategies. QRC figures are illustrative snapshots for this replica.
      </p>
    </section>
  );
}

export function ProductTile({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/portfolio/${product.slug}`}
        className="group block border border-gold/20 bg-ink-800/40 p-4 transition hover:border-gold/60 hover:bg-ink-700/50"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-gold">{product.kind}</span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-cream/40">{product.category}</span>
        </div>
        <p className="mt-3 font-medium leading-snug text-cream group-hover:text-gold">{product.name}</p>
        <div className="mt-4 flex items-center justify-between text-[11px] text-cream/50">
          <span>{product.style}</span>
          <span>Q{product.q} · R{product.r} · C{product.c}</span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Voices() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const count = TESTIMONIALS.length;
  const active = TESTIMONIALS[index];

  function go(next: number, dir: number) {
    setDirection(dir);
    setIndex((next + count) % count);
  }

  useEffect(() => {
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, 5500);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.blockquote
            key={active.name}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d >= 0 ? 56 : -56, opacity: 0.4 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d >= 0 ? -56 : 56, opacity: 0.4 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="widget-card px-6 py-8 sm:px-10 sm:py-10">
              <span className="block text-4xl leading-none text-gold/45 sm:text-5xl" aria-hidden>
                “
              </span>
              <p className="mt-2 text-lg leading-relaxed text-cream/90 sm:text-xl sm:leading-relaxed">
                {active.quote}
              </p>
              <footer className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center border border-gold/35 bg-gold/10 text-sm font-semibold text-gold">
                  {active.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-gold">{active.name}</p>
                  <p className="mt-0.5 text-xs text-cream/50">{active.role}</p>
                </div>
              </footer>
            </div>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={cn(
                "h-1.5 transition-all duration-300",
                i === index ? "w-8 bg-gold" : "w-1.5 bg-cream/25 hover:bg-cream/45",
              )}
            />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1, -1)}
            className="grid h-10 w-10 place-items-center border border-white/15 text-cream/70 transition hover:border-gold/50 hover:text-gold"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1, 1)}
            className="grid h-10 w-10 place-items-center border border-white/15 text-cream/70 transition hover:border-gold/50 hover:text-gold"
          >
            →
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-cream/35">
        {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </p>
    </div>
  );
}

export function TeamGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TEAM.map((m, i) => (
        <Reveal key={m.slug} delay={i * 0.04}>
          <Link href={`/team-member/${m.slug}`} className="widget-card block p-6 hover:border-gold/50">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-lg font-semibold text-gold">
              {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{m.role}</p>
            <h3 className="mt-2 text-xl font-semibold text-cream">{m.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">{m.quote}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function AwardsRibbon() {
  const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  return (
    <div className="grid gap-3 sm:grid-cols-7">
      {years.map((y, i) => (
        <Reveal key={y} delay={i * 0.05}>
          <div className="widget-card px-3 py-6 text-center">
            <p className="text-2xl font-semibold text-gold">{y}</p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-cream/50">Crystal Gazing</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function EventsStrip() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {EVENTS.map((e, i) => (
        <Reveal key={e.href} delay={i * 0.05}>
          <Link href={e.href} className="widget-card flex items-center justify-between gap-4 p-6 hover:border-gold/50">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{e.year}</p>
              <p className="mt-2 text-xl font-semibold text-cream">{e.name}</p>
              <p className="mt-1 text-sm text-cream/50">{e.place}</p>
            </div>
            <span className="text-gold">→</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function NewsList() {
  return (
    <div className="space-y-3">
      {NEWS.map((n, i) => (
        <Reveal key={n.title} delay={i * 0.06}>
          <Link href="/in-the-news" className="widget-card flex items-start justify-between gap-6 p-5 hover:border-gold/50">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{n.source}</p>
              <p className="mt-2 text-lg text-cream">{n.title}</p>
            </div>
            <span className="text-gold">→</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function BlogGrid() {
  return (
    <Stagger className="grid gap-4 md:grid-cols-3">
      {BLOGS.slice(0, 6).map((b) => (
        <StaggerItem key={b.slug}>
          <Link href={`/blog/${b.slug}`} className="group media-frame flex h-full flex-col overflow-hidden">
            {"image" in b && b.image ? (
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image unoptimized
                  src={b.image}
                  alt={b.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                {b.kicker} · {b.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-cream">{b.title}</h3>
              <p className="mt-2 flex-1 text-sm text-cream/55">{b.excerpt}</p>
              <span className="mt-4 text-[11px] uppercase tracking-[0.16em] text-gold">Read →</span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function CompareBoard() {
  const rows = featuredProducts("PMS", 10);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-[10px] uppercase tracking-[0.18em] text-gold/80">
          <tr className="border-b border-gold/20">
            <th className="py-3 pr-4 font-medium">Strategy</th>
            <th className="py-3 pr-4 font-medium">Category</th>
            <th className="py-3 pr-4 font-medium">Style</th>
            <th className="py-3 pr-4 font-medium">Ticket</th>
            <th className="py-3 pr-4 font-medium">Q</th>
            <th className="py-3 pr-4 font-medium">R</th>
            <th className="py-3 font-medium">C</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.slug} className="border-b border-gold/10 text-cream/80">
              <td className="py-3 pr-4">
                <Link href={`/portfolio/${p.slug}`} className="hover:text-gold">
                  {p.name}
                </Link>
              </td>
              <td className="py-3 pr-4">{p.category}</td>
              <td className="py-3 pr-4">{p.style}</td>
              <td className="py-3 pr-4">{p.minTicket}</td>
              <td className="py-3 pr-4 text-gold">{p.q}</td>
              <td className="py-3 pr-4 text-gold">{p.r}</td>
              <td className="py-3 text-gold">{p.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-cream/40">
        Illustrative QRC snapshots for this replica — not live performance and not a recommendation.
      </p>
    </div>
  );
}

export function ToolWidget({ slug }: { slug: string }) {
  if (slug.includes("nifty-pe")) return <PeChart />;
  if (slug.includes("cagr")) return <CagrCalc />;
  if (slug.includes("future-value")) return <FvCalc />;
  if (slug.includes("fee") || slug.includes("selector")) return <FeeCalc />;
  return <CagrCalc />;
}

function PeChart() {
  const max = Math.max(...NIFTY_PE.map((d) => Number(d[1])));
  const min = Math.min(...NIFTY_PE.map((d) => Number(d[1])));
  const pts = NIFTY_PE.map((d, i) => {
    const x = (i / (NIFTY_PE.length - 1)) * 100;
    const y = 100 - ((Number(d[1]) - min) / (max - min)) * 80 - 10;
    return `${x},${y}`;
  }).join(" ");
  return (
    <div className="widget-card p-6">
      <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Nifty PE · illustrative series</p>
      <svg viewBox="0 0 100 100" className="mt-6 h-56 w-full">
        <polyline fill="none" stroke="#c4a35a" strokeWidth="1.2" points={pts} />
        {NIFTY_PE.map((d, i) => {
          const x = (i / (NIFTY_PE.length - 1)) * 100;
          const y = 100 - ((Number(d[1]) - min) / (max - min)) * 80 - 10;
          return <circle key={d[0]} cx={x} cy={y} r="1.2" fill="#f6f1e8" />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.14em] text-cream/40">
        <span>2016</span>
        <span>2026</span>
      </div>
    </div>
  );
}

function CagrCalc() {
  const [pv, setPv] = useState(5000000);
  const [fv, setFv] = useState(12000000);
  const [yrs, setYrs] = useState(7);
  const cagr = pv > 0 && yrs > 0 ? (Math.pow(fv / pv, 1 / yrs) - 1) * 100 : 0;
  return (
    <CalcShell title="CAGR calculator">
      <Field label="Starting value (₹)" value={pv} onChange={setPv} />
      <Field label="Ending value (₹)" value={fv} onChange={setFv} />
      <Field label="Years" value={yrs} onChange={setYrs} />
      <Result label="CAGR" value={`${cagr.toFixed(2)}%`} />
    </CalcShell>
  );
}

function FvCalc() {
  const [pv, setPv] = useState(5000000);
  const [rate, setRate] = useState(14);
  const [yrs, setYrs] = useState(10);
  const fv = pv * Math.pow(1 + rate / 100, yrs);
  return (
    <CalcShell title="Future value calculator">
      <Field label="Present value (₹)" value={pv} onChange={setPv} />
      <Field label="Expected return % p.a." value={rate} onChange={setRate} />
      <Field label="Years" value={yrs} onChange={setYrs} />
      <Result label="Future value" value={fv.toLocaleString("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" })} />
    </CalcShell>
  );
}

function FeeCalc() {
  const [aum, setAum] = useState(10000000);
  const [mgmt, setMgmt] = useState(2);
  const [perf, setPerf] = useState(20);
  const [ret, setRet] = useState(16);
  const hurdle = 0.1;
  const gross = aum * (ret / 100);
  const mgmtFee = aum * (mgmt / 100);
  const excess = Math.max(0, gross - aum * hurdle);
  const perfFee = excess * (perf / 100);
  const net = gross - mgmtFee - perfFee;
  return (
    <CalcShell title="PMS fee drag">
      <Field label="AUM (₹)" value={aum} onChange={setAum} />
      <Field label="Management fee %" value={mgmt} onChange={setMgmt} />
      <Field label="Performance fee %" value={perf} onChange={setPerf} />
      <Field label="Gross return %" value={ret} onChange={setRet} />
      <Result label="Net gain after fees" value={net.toLocaleString("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" })} />
    </CalcShell>
  );
}

function CalcShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="widget-card grid gap-6 p-6 md:grid-cols-2">
      <p className="md:col-span-2 text-[10px] uppercase tracking-[0.22em] text-gold">{title}</p>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block">
      <span className="label-field text-cream/50">{label}</span>
      <input
        type="number"
        className="input-field bg-white/5 text-cream"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="md:col-span-2 border border-gold/30 bg-gold/10 p-5">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-cream">{value}</p>
    </div>
  );
}

export function BookCallForm({ compact = false }: { compact?: boolean }) {
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }
  if (done) {
    return (
      <div className="widget-card p-8 text-center">
        <p className="text-3xl font-semibold text-gold">Request received.</p>
        <p className="mt-3 text-sm text-cream/70">
          This replica stores nothing. A specialist would normally call you within one working day.
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className={cn("widget-card grid gap-4 p-6", compact ? "" : "md:grid-cols-2")}>
      <label className="block">
        <span className="label-field text-cream/50">Full name</span>
        <input required className="input-field bg-white/5 text-cream" name="name" />
      </label>
      <label className="block">
        <span className="label-field text-cream/50">Email</span>
        <input required type="email" className="input-field bg-white/5 text-cream" name="email" />
      </label>
      <label className="block">
        <span className="label-field text-cream/50">Mobile</span>
        <input required className="input-field bg-white/5 text-cream" name="phone" />
      </label>
      <label className="block">
        <span className="label-field text-cream/50">City / country</span>
        <input className="input-field bg-white/5 text-cream" name="city" />
      </label>
      <label className={compact ? "block" : "md:col-span-2"}>
        <span className="label-field text-cream/50">What would you like to discuss?</span>
        <select className="input-field bg-ink text-cream" name="topic" defaultValue="PMS allocation">
          <option>PMS allocation</option>
          <option>AIF allocation</option>
          <option>NRI / GIFT City</option>
          <option>Portfolio QRC review</option>
        </select>
      </label>
      <button
        type="submit"
        className={cn(
          "h-12 bg-gold text-[11px] uppercase tracking-[0.2em] text-ink hover:bg-gold-light",
          compact ? "" : "md:col-span-2"
        )}
      >
        Book a call with a specialist
      </button>
    </form>
  );
}
