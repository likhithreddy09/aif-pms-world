import { Suspense } from "react";
import { DirectoryView } from "@/components/public/directory-view";
import { getCategories, getPublishedManagers } from "@/lib/queries";
import { Skeleton } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PmsPage() {
  const [managers, categories] = await Promise.all([
    getPublishedManagers({ type: "PMS" }),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<div className="container-page py-16"><Skeleton className="h-40" /></div>}>
      <DirectoryView
        managers={managers}
        categories={categories}
        showTypeFilter={false}
        title="PMS Directory"
        subtitle="Published Portfolio Management Services listed and maintained by PMS AIF World."
      />
    </Suspense>
  );
}
