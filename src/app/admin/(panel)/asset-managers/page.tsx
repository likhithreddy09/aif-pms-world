import Link from "next/link";
import { ManagersTable } from "@/components/admin/managers-table";
import { getAllManagers } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminManagersPage() {
  const managers = await getAllManagers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-4xl">Asset Managers</h1>
          <p className="mt-1 text-sm text-ink-500">{managers.length} listings</p>
        </div>
        <Link
          href="/admin/asset-managers/new"
          className="inline-flex h-10 items-center bg-gold px-4 text-xs uppercase tracking-[0.14em] text-ink"
        >
          + Add Asset Manager
        </Link>
      </div>
      <div className="mt-8">
        <ManagersTable managers={managers} />
      </div>
    </div>
  );
}
