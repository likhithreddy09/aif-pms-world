import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPercent, typeLabel } from "@/lib/utils";

export type AssetManagerCardProps = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  type: "PMS" | "AIF" | "BOTH" | string;
  categories: string[];
  description?: string | null;
  oneYearReturn?: number | null;
  threeYearReturn?: number | null;
};

export function AssetManagerCard({
  name,
  slug,
  logoUrl,
  type,
  categories,
  description,
  threeYearReturn,
  oneYearReturn,
}: AssetManagerCardProps) {
  const metric = threeYearReturn ?? oneYearReturn;
  const metricLabel = threeYearReturn != null ? "3Y Return" : "1Y Return";

  return (
    <article className="group flex h-full flex-col border border-ink/10 bg-white p-6 shadow-card transition hover:border-gold/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden border border-ink/10 bg-paper">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={`${name} logo`} className="h-full w-full object-cover" />
          ) : (
            <span className="font-semibold text-xl text-gold">{name.slice(0, 2)}</span>
          )}
        </div>
        <Badge>{typeLabel(type)}</Badge>
      </div>
      <h3 className="mt-5 font-semibold text-2xl text-ink">{name}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-400">
        {categories.slice(0, 3).join(" · ") || "Uncategorised"}
      </p>
      {description ? (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500">{description}</p>
      ) : null}
      <div className="mt-auto flex items-end justify-between pt-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-ink-400">{metricLabel}</p>
          <p className="font-semibold text-2xl text-ink">{formatPercent(metric)}</p>
        </div>
        <Link
          href={`/asset-managers/${slug}`}
          className="inline-flex items-center gap-1 text-sm text-gold-dark group-hover:text-ink"
        >
          View Profile <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
