import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { StrategyCharts } from "@/components/public/strategy-charts";
import { categoryNames, getManagerBySlug } from "@/lib/queries";
import { formatDate, formatPercent, typeLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const manager = await getManagerBySlug(params.slug);
  if (!manager) {
    return { title: "Asset Manager Not Found" };
  }
  const title = `${manager.name} | ${typeLabel(manager.type)}`;
  const description = manager.description.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title: `${title} | PMS AIF World`,
      description,
    },
  };
}

export default async function ManagerProfilePage({ params }: Props) {
  const manager = await getManagerBySlug(params.slug);
  if (!manager) notFound();
  const categories = categoryNames(manager);

  return (
    <article>
      <section className="bg-ink py-12 text-cream">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden border border-gold/40 bg-ink-800">
              {manager.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={manager.logoUrl}
                  alt={`${manager.name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-semibold text-3xl text-gold">{manager.name.slice(0, 2)}</span>
              )}
            </div>
            <div>
              <p className="eyebrow text-gold">Asset Manager Profile</p>
              <h1 className="mt-2 font-semibold text-4xl sm:text-5xl">{manager.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge tone="gold">{typeLabel(manager.type)}</Badge>
                {categories.map((c) => (
                  <Badge key={c} tone="muted" className="border-gold/30 text-cream/80">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {manager.websiteUrl ? (
              <a
                href={manager.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center border border-gold px-5 text-[11px] uppercase tracking-[0.16em] text-gold hover:bg-gold hover:text-ink"
              >
                Visit Website
              </a>
            ) : null}
            <a
              href="#contact"
              className="inline-flex h-11 items-center bg-gold px-5 text-[11px] uppercase tracking-[0.16em] text-ink hover:bg-gold-light"
            >
              Contact Manager
            </a>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_280px]">
        <div className="space-y-12">
          <section>
            <h2 className="section-title">Overview</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-7 text-ink-600">
              {manager.description}
            </p>
            {manager.investmentPhilosophy ? (
              <div className="mt-6 border-l-2 border-gold pl-4">
                <p className="text-[11px] uppercase tracking-[0.16em] text-gold-dark">
                  Investment philosophy
                </p>
                <p className="mt-2 leading-7 text-ink-600">{manager.investmentPhilosophy}</p>
              </div>
            ) : null}
          </section>

          <section>
            <h2 className="section-title">Strategy</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <Info label="Strategy name" value={manager.strategyName} />
              <Info label="Investment approach" value={manager.investmentApproach} />
              <Info label="Risk profile" value={manager.riskProfile} />
              <Info label="Minimum investment" value={manager.minimumInvestment} />
              <Info label="Lock-in period" value={manager.lockInPeriod} />
              <Info label="Inception" value={formatDate(manager.inceptionDate)} />
            </dl>
            <StrategyCharts
              name={manager.name}
              type={manager.type}
              categories={categories}
              oneYearReturn={manager.oneYearReturn}
              threeYearReturn={manager.threeYearReturn}
              fiveYearReturn={manager.fiveYearReturn}
              sinceInceptionReturn={manager.sinceInceptionReturn}
            />
          </section>

          <section>
            <h2 className="section-title">Track Record</h2>
            <p className="mt-2 text-xs text-ink-400">
              Sample demonstration figures. Not live or audited performance.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border border-ink/10 bg-white p-6 sm:grid-cols-4">
              <Metric label="1 Year" value={formatPercent(manager.oneYearReturn)} />
              <Metric label="3 Years" value={formatPercent(manager.threeYearReturn)} />
              <Metric label="5 Years" value={formatPercent(manager.fiveYearReturn)} />
              <Metric label="Since Inception" value={formatPercent(manager.sinceInceptionReturn)} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Info label="AUM" value={manager.aum} />
              <Info label="Number of clients" value={manager.clientCount?.toString()} />
            </div>
          </section>

          <section>
            <h2 className="section-title">Regulatory Information</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <Info label="SEBI registration number" value={manager.sebiRegistrationNumber} />
              <Info label="Registration type" value={manager.registrationType} />
              <Info label="License validity" value={formatDate(manager.licenseValidity)} />
            </dl>
            {manager.licenseDocumentUrl ? (
              <a
                href={manager.licenseDocumentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-gold-dark underline"
              >
                View license document
              </a>
            ) : null}
          </section>

          <section id="contact">
            <h2 className="section-title">Contact</h2>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <Info label="Contact person" value={manager.contactPerson} />
              <Info
                label="Email"
                value={
                  manager.contactEmail ? (
                    <a href={`mailto:${manager.contactEmail}`} className="underline">
                      {manager.contactEmail}
                    </a>
                  ) : null
                }
              />
              <Info
                label="Phone"
                value={
                  manager.contactPhone ? (
                    <a href={`tel:${manager.contactPhone}`}>{manager.contactPhone}</a>
                  ) : null
                }
              />
              <Info
                label="Website"
                value={
                  manager.websiteUrl ? (
                    <a href={manager.websiteUrl} target="_blank" rel="noreferrer" className="underline">
                      {manager.websiteUrl}
                    </a>
                  ) : null
                }
              />
              <div className="sm:col-span-2">
                <Info label="Address" value={manager.address} />
              </div>
            </dl>
          </section>
        </div>

        <aside className="h-fit border border-ink/10 bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink-400">At a glance</p>
          <p className="mt-3 font-semibold text-2xl">{manager.displayName || manager.name}</p>
          <p className="mt-1 text-sm text-ink-500">{typeLabel(manager.type)}</p>
          <div className="mt-5 space-y-3 text-sm">
            <p>
              <span className="text-ink-400">3Y return</span>
              <span className="float-right font-medium">{formatPercent(manager.threeYearReturn)}</span>
            </p>
            <p>
              <span className="text-ink-400">AUM</span>
              <span className="float-right font-medium">{manager.aum || "—"}</span>
            </p>
            <p>
              <span className="text-ink-400">Min. investment</span>
              <span className="float-right font-medium">{manager.minimumInvestment || "—"}</span>
            </p>
          </div>
          <Link
            href="/asset-managers"
            className="mt-6 inline-block text-sm text-gold-dark underline"
          >
            Back to directory
          </Link>
        </aside>
      </div>
    </article>
  );
}

function Info({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-400">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-ink">{value || "—"}</dd>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-ink-400">{label}</p>
      <p className="mt-1 font-semibold text-3xl text-ink">{value}</p>
    </div>
  );
}
