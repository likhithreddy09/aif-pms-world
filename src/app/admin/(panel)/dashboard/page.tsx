import Link from "next/link";
import { getDashboardStats } from "@/lib/queries";
import { Badge } from "@/components/ui/badge";
import { formatRelative, typeLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="font-semibold text-4xl">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-500">Asset manager publishing overview</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total", stats.total],
          ["PMS", stats.pms],
          ["AIF", stats.aif],
          ["Published", stats.published],
        ].map(([label, value]) => (
          <div key={String(label)} className="border border-ink/10 bg-white p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink-400">{label}</p>
            <p className="mt-2 font-semibold text-4xl">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-2xl">Recent Asset Managers</h2>
          <Link href="/admin/asset-managers/new" className="text-sm text-gold-dark underline">
            Add Manager
          </Link>
        </div>
        <div className="mt-4 divide-y divide-ink/10 border border-ink/10 bg-white">
          {stats.recent.map((manager) => (
            <Link
              key={manager.id}
              href={`/admin/asset-managers/${manager.id}/edit`}
              className="flex items-center justify-between px-4 py-3 hover:bg-cream/60"
            >
              <div>
                <p className="font-medium">{manager.name}</p>
                <p className="text-xs text-ink-400">
                  {typeLabel(manager.type)} · {formatRelative(manager.updatedAt)}
                </p>
              </div>
              <Badge tone={manager.status as "draft" | "published" | "archived"}>
                {manager.status}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
