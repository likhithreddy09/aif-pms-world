import { Suspense } from "react";
import { DirectoryView } from "@/components/public/directory-view";
import { getCategories, getPublishedManagers } from "@/lib/queries";
import { Skeleton } from "@/components/ui/card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AifPage() {
  const [managers, categories] = await Promise.all([
    getPublishedManagers({ type: "AIF" }),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<div className="container-page py-16"><Skeleton className="h-40" /></div>}>
      <DirectoryView
        managers={managers}
        categories={categories}
        showTypeFilter={false}
        title="AIF Directory"
        subtitle="Published Alternative Investment Funds listed and maintained by PMS AIF World."
      />
    </Suspense>
  );
}
