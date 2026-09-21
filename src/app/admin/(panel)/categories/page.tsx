import { CategoriesManager } from "@/components/admin/categories-manager";
import { getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="font-semibold text-4xl">Categories</h1>
      <p className="mt-1 text-sm text-ink-500">
        Categories can be attached to asset managers and used as public directory filters.
      </p>
      <div className="mt-8">
        <CategoriesManager categories={categories} />
      </div>
    </div>
  );
}
