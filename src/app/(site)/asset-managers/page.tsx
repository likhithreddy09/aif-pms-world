import { Suspense } from "react";
import { DirectoryView } from "@/components/public/directory-view";
import { getCategories, getPublishedManagers } from "@/lib/queries";
import { Skeleton } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AssetManagersPage() {
  const [managers, categories] = await Promise.all([
    getPublishedManagers(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<div className="container-page py-16"><Skeleton className="h-40" /></div>}>
      <DirectoryView
        managers={managers}
        categories={categories}
        title="Asset Managers"
        subtitle="Browse published PMS and AIF managers. Data is maintained from the PMS AIF World admin dashboard."
      />
    </Suspense>
  );
}
