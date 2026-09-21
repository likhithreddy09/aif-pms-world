"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { AssetManagerCard } from "@/components/public/asset-manager-card";
import { categoryNames, ManagerWithCategories } from "@/lib/queries";
import { SORT_OPTIONS } from "@/lib/constants";

export function DirectoryView({
  managers,
  title,
  subtitle,
  categories,
  showTypeFilter = true,
}: {
  managers: ManagerWithCategories[];
  title: string;
  subtitle: string;
  categories: { id: string; name: string; slug: string }[];
  showTypeFilter?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const type = params.get("type") ?? "ALL";
  const category = params.get("category") ?? "";
  const sort = params.get("sort") ?? "name";

  function update(next: Record<string, string>) {
    const search = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "ALL") search.delete(key);
      else search.set(key, value);
    });
    router.push(`${pathname}?${search.toString()}`);
  }

  const filtered = useMemo(() => {
    let rows = [...managers];
    const query = (params.get("q") ?? "").toLowerCase();
    if (query) {
      rows = rows.filter((m) =>
        [m.name, m.displayName, m.description, m.strategyName, ...categoryNames(m)]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query)
      );
    }
    const selectedType = params.get("type");
    if (selectedType === "PMS" || selectedType === "AIF") {
      rows = rows.filter((m) => m.type === selectedType || m.type === "BOTH");
    }
    const selectedCategory = params.get("category");
    if (selectedCategory) {
      rows = rows.filter((m) =>
        m.categories.some(
          (c) => c.category.slug === selectedCategory || c.category.name === selectedCategory
        )
      );
    }
    const selectedSort = params.get("sort") ?? "name";
    rows.sort((a, b) => {
      if (selectedSort === "return-3y") return (b.threeYearReturn ?? -999) - (a.threeYearReturn ?? -999);
      if (selectedSort === "return-1y") return (b.oneYearReturn ?? -999) - (a.oneYearReturn ?? -999);
      if (selectedSort === "newest") return +new Date(b.updatedAt) - +new Date(a.updatedAt);
      return a.name.localeCompare(b.name);
    });
    return rows;
  }, [managers, params]);

  return (
    <div>
      <section className="bg-ink py-14 text-cream">
        <div className="container-page">
          <p className="eyebrow text-gold">Directory</p>
          <h1 className="mt-3 font-semibold text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-cream/70">{subtitle}</p>
        </div>
      </section>
      <section className="container-page py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update({ q });
          }}
          className="grid gap-3 border border-ink/10 bg-white p-4 md:grid-cols-4"
        >
          <label className="relative md:col-span-2">
            <span className="sr-only">Search</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search managers"
              className="input-field pl-10"
            />
          </label>
          {showTypeFilter ? (
            <select
              aria-label="Filter by type"
              className="input-field"
              value={type}
              onChange={(e) => update({ type: e.target.value })}
            >
              <option value="ALL">All</option>
              <option value="PMS">PMS</option>
              <option value="AIF">AIF</option>
            </select>
          ) : (
            <select
              aria-label="Filter by category"
              className="input-field"
              value={category}
              onChange={(e) => update({ category: e.target.value })}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          <select
            aria-label="Sort"
            className="input-field"
            value={sort}
            onChange={(e) => update({ sort: e.target.value })}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {showTypeFilter ? (
            <select
              aria-label="Category filter"
              className="input-field md:col-span-4"
              value={category}
              onChange={(e) => update({ category: e.target.value })}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null}
        </form>
        <p className="mt-6 text-sm text-ink-500">{filtered.length} managers</p>
        {filtered.length === 0 ? (
          <div className="mt-8 border border-dashed border-ink/15 bg-white px-6 py-16 text-center">
            <h2 className="font-semibold text-2xl">No Asset Managers Found</h2>
            <p className="mt-2 text-sm text-ink-500">Try a different search or filter.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((manager) => (
              <AssetManagerCard
                key={manager.id}
                id={manager.id}
                name={manager.name}
                slug={manager.slug}
                logoUrl={manager.logoUrl}
                type={manager.type}
                categories={categoryNames(manager)}
                description={manager.description}
                oneYearReturn={manager.oneYearReturn}
                threeYearReturn={manager.threeYearReturn}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
