import { LandingForm } from "@/components/admin/landing-form";

export default function NewLandingPage() {
  return (
    <div>
      <h1 className="font-semibold text-4xl">New landing page</h1>
      <p className="mt-1 text-sm text-ink-500">Build a page with sections, widgets and SEO.</p>
      <div className="mt-8">
        <LandingForm />
      </div>
    </div>
  );
}
