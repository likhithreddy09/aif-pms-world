import { notFound } from "next/navigation";
import { LandingForm } from "@/components/admin/landing-form";
import { getAdminPage } from "@/lib/content-queries";

export const dynamic = "force-dynamic";

export default async function EditLandingPage({ params }: { params: { id: string } }) {
  const page = await getAdminPage(params.id);
  if (!page) notFound();
  return (
    <div>
      <h1 className="font-semibold text-4xl">Edit landing page</h1>
      <p className="mt-1 text-sm text-ink-500">/{page.slug}</p>
      <div className="mt-8">
        <LandingForm page={page} />
      </div>
    </div>
  );
}
