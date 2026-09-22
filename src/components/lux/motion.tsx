"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  // Never hide content with opacity:0 — only a soft lift after mount
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y, opacity: 1 }}
      whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0.07,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        // Stay visible even before "show" — only nudge upward
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function GoldField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 bg-soft-lines opacity-40" />
      <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl animate-drift" />
      <div className="absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-gold/[0.07] blur-3xl animate-drift-slow" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

export function ParallaxHero({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function TextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return <span className={className}>{text}</span>;
}

export function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  // Show final value before JS mounts so SSR/hydration never looks empty
  const display = mounted ? n : value;

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className="text-[11px] font-medium uppercase tracking-[0.24em] text-cream/45">
            {item}
            <span className="ml-12 text-gold/50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
