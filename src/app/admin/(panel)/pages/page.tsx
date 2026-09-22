import Link from "next/link";
import { listAdminPages } from "@/lib/content-queries";
import { PagesTable } from "@/components/admin/pages-table";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  const pages = await listAdminPages();
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-semibold text-4xl">Landing pages</h1>
          <p className="mt-1 text-sm text-ink-500">
            Create marketing / editorial pages that appear on the public site by slug.
          </p>
        </div>
        <Link href="/admin/pages/new" className="bg-ink px-4 py-2.5 text-sm text-cream hover:bg-ink-700">
          New page
        </Link>
      </div>
      <div className="mt-8">
        <PagesTable pages={pages} />
      </div>
    </div>
  );
}
