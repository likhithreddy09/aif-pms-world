import { AssetManagerForm } from "@/components/admin/asset-manager-form";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function NewManagerPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="font-semibold text-4xl">Add Asset Manager</h1>
      <p className="mt-1 text-sm text-ink-500">
        Complete the sections below, then publish to make the listing live on the public website.
      </p>
      <div className="mt-8">
        <AssetManagerForm categories={categories} />
      </div>
    </div>
  );
}
