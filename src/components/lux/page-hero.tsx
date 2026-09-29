"use client";

import { motion } from "framer-motion";
import { GoldField } from "@/components/lux/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

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
    <section className="relative overflow-hidden border-b border-gold/20 bg-[#0f0e0c] text-cream">
      <GoldField />
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0.6, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.div
            className="mb-5 h-px w-16 bg-gradient-to-r from-gold to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold/80">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">{lead}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
