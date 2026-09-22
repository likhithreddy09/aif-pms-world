import Link from "next/link";
import { SITE } from "@/data/site";

export function FloatingDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-between px-5 sm:px-8">
      <a
        href={SITE.phoneHref}
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-[#c0392b] text-white shadow-lg"
        aria-label="Call"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z" />
        </svg>
      </a>
      <Link
        href="/book-a-call"
        className="pointer-events-auto hidden items-center bg-gold px-5 text-[10px] uppercase tracking-[0.2em] text-ink shadow-lg sm:inline-flex"
      >
        Book a call
      </Link>
      <a
        href={SITE.whatsapp}
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3zm4.9 12.9c-.2.6-1.2 1.1-1.7 1.1-.4 0-.9.2-3.1-.7-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.3-1-2.5s.6-1.8.9-2 .5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.3 2.5 1.4.3.1.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.9.9c.2.1.3.2.4.4 0 .4-.2 1.3-.8 1.6z" />
        </svg>
      </a>
    </div>
  );
}
