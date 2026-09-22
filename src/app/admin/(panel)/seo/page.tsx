import { SeoSettingsForm } from "@/components/admin/seo-settings-form";
import { getSeoSettings } from "@/lib/content-queries";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  const settings = await getSeoSettings();
  return (
    <div>
      <h1 className="font-semibold text-4xl">SEO settings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Global defaults for titles, descriptions, Open Graph and indexing.
      </p>
      <div className="mt-8">
        <SeoSettingsForm settings={settings} />
      </div>
    </div>
  );
}
