import Link from "next/link";
import { GoldField } from "@/components/lux/motion";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-ink py-32 text-center text-cream">
      <GoldField />
      <div className="relative">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">404</p>
        <h1 className="mt-4 font-display text-5xl">This page is not on the map</h1>
        <p className="mt-4 text-cream/60">The original universe is large. Try search, or return home.</p>
        <Link href="/" className="gold-btn mt-10 inline-flex h-12 px-8">
          Back to PMS AIF WORLD
        </Link>
      </div>
    </div>
  );
}
