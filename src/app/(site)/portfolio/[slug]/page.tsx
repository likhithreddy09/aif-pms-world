import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/lux/editorial";
import { QrcGauges, ProductTile } from "@/components/lux/widgets";
import { PRODUCTS, getProduct } from "@/data/catalog";
import { Reveal } from "@/components/lux/motion";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Strategy" };
  return { title: product.name, description: `${product.kind} · ${product.category} · ${product.style}` };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = PRODUCTS.filter((p) => p.kind === product.kind && p.slug !== product.slug).slice(0, 6);

  return (
    <div className="bg-ink text-cream">
      <PageHero
        eyebrow={`${product.kind} · ${product.category}`}
        title={product.name}
        lead={`${product.style} · ${product.minTicket} · typical horizon ${product.horizon}. QRC figures on this replica are illustrative snapshots, not live performance.`}
      />
      <section className="container-page grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-cream/70">
              This strategy sits in our public universe because the manager, the book and the fee stack survived a 5P
              read. Suitability is still household-specific — a high-quality compounder is the wrong product in a
              portfolio that already owns three of them.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Ticket", product.minTicket],
              ["Style", product.style],
              ["Horizon", product.horizon],
            ].map(([k, v]) => (
              <div key={k} className="widget-card p-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{k}</p>
                <p className="mt-2 font-display text-2xl">{v}</p>
              </div>
            ))}
          </div>
          <QrcGauges scores={{ q: product.q, r: product.r, c: product.c }} />
        </div>
        <aside className="widget-card h-fit p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Allocate</p>
          <p className="mt-3 font-display text-3xl">Request a 5P note</p>
          <p className="mt-3 text-sm text-cream/60">
            We will not onboard you into this product from a webpage. A specialist call is the next honest step.
          </p>
          <Link href="/book-a-call" className="gold-btn mt-6 inline-flex h-11 px-5">
            Book a call
          </Link>
        </aside>
      </section>
      <section className="border-t border-gold/15 py-16">
        <div className="container-page">
          <p className="eyebrow">Adjacent strategies</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {related.map((p) => (
              <ProductTile key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
