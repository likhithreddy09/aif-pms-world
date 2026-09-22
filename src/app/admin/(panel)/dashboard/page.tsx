import Link from "next/link";
import { getDashboardStats } from "@/lib/queries";
import { getContentDashboardCounts } from "@/lib/content-queries";
import { Badge } from "@/components/ui/badge";
import { formatRelative, typeLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, content] = await Promise.all([getDashboardStats(), getContentDashboardCounts()]);

  const contentCards = [
    { label: "Blog posts", value: content.blogs },
    { label: "Published blogs", value: content.publishedBlogs },
    { label: "Landing pages", value: content.pages },
    { label: "Published pages", value: content.publishedPages },
  ];

  const managerCards = [
    { label: "Managers", value: stats.total },
    { label: "PMS", value: stats.pms },
    { label: "AIF", value: stats.aif },
    { label: "Published managers", value: stats.published },
  ];

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Content and asset manager overview</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {contentCards.map((card) => (
          <div key={card.label} className="border border-ink/10 bg-white p-5 shadow-card">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
              {card.label}
            </p>
            <p className="mt-2 text-4xl font-semibold tabular-nums text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {[
          { href: "/admin/blogs/new", label: "New blog post" },
          { href: "/admin/pages/new", label: "New landing page" },
          { href: "/admin/seo", label: "SEO settings" },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-gold hover:text-gold-dark"
          >
            {a.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {managerCards.map((card) => (
          <div key={card.label} className="border border-ink/10 bg-white p-5 shadow-card">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-400">
              {card.label}
            </p>
            <p className="mt-2 text-4xl font-semibold tabular-nums text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-ink sm:text-2xl">Recent Asset Managers</h2>
          <Link
            href="/admin/asset-managers/new"
            className="text-sm font-medium text-gold-dark underline-offset-2 hover:underline"
          >
            Add Manager
          </Link>
        </div>
        <div className="mt-4 divide-y divide-ink/10 border border-ink/10 bg-white">
          {stats.recent.length === 0 ? (
            <p className="px-4 py-8 text-sm text-ink-500">No managers yet.</p>
          ) : (
            stats.recent.map((manager) => (
              <Link
                key={manager.id}
                href={`/admin/asset-managers/${manager.id}/edit`}
                className="flex items-center justify-between gap-4 px-4 py-3.5 transition hover:bg-cream"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{manager.name}</p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    {typeLabel(manager.type)} · {formatRelative(manager.updatedAt)}
                  </p>
                </div>
                <Badge tone={manager.status as "draft" | "published" | "archived"}>
                  {manager.status}
                </Badge>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
