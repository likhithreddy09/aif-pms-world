import { notFound } from "next/navigation";
import { AssetManagerForm } from "@/components/admin/asset-manager-form";
import { getCategories, getManagerById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditManagerPage({ params }: { params: { id: string } }) {
  const [manager, categories] = await Promise.all([
    getManagerById(params.id),
    getCategories(),
  ]);
  if (!manager) notFound();

  return (
    <div>
      <h1 className="font-semibold text-4xl">Edit Asset Manager</h1>
      <p className="mt-1 text-sm text-ink-500">
        Changes appear on the public profile as soon as you save a published listing.
      </p>
      <div className="mt-8">
        <AssetManagerForm manager={manager} categories={categories} />
      </div>
    </div>
  );
}
