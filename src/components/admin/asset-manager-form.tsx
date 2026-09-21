"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/admin/file-upload";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { REGISTRATION_TYPES, RISK_PROFILES } from "@/lib/constants";
import { saveAssetManager, type ActionResult } from "@/lib/actions";
import { ManagerWithCategories } from "@/lib/queries";

type Category = { id: string; name: string; slug: string };

function isoDate(value?: Date | string | null) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export function AssetManagerForm({
  manager,
  categories,
}: {
  manager?: ManagerWithCategories | null;
  categories: Category[];
}) {
  const router = useRouter();
  const intentRef = useRef<"draft" | "publish">("publish");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [featured, setFeatured] = useState(manager?.featured ?? false);
  const [type, setType] = useState(manager?.type ?? "PMS");
  const [status, setStatus] = useState(manager?.status ?? "draft");
  const [logoUrl, setLogoUrl] = useState(manager?.logoUrl ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(manager?.coverImageUrl ?? "");
  const [licenseDocumentUrl, setLicenseDocumentUrl] = useState(manager?.licenseDocumentUrl ?? "");
  const [categoryIds, setCategoryIds] = useState(
    manager?.categories.map((c) => c.categoryId) ?? []
  );

  function toggleCategory(id: string) {
    setCategoryIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function onSubmit(intent: "draft" | "publish") {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const payload = {
        name: String(form.get("name") ?? ""),
        displayName: String(form.get("displayName") ?? ""),
        description: String(form.get("description") ?? ""),
        type,
        websiteUrl: String(form.get("websiteUrl") ?? ""),
        logoUrl,
        coverImageUrl,
        categoryIds,
        contactPerson: String(form.get("contactPerson") ?? ""),
        contactEmail: String(form.get("contactEmail") ?? ""),
        contactPhone: String(form.get("contactPhone") ?? ""),
        address: String(form.get("address") ?? ""),
        sebiRegistrationNumber: String(form.get("sebiRegistrationNumber") ?? ""),
        registrationType: String(form.get("registrationType") ?? ""),
        licenseDocumentUrl,
        licenseValidity: String(form.get("licenseValidity") ?? ""),
        strategyName: String(form.get("strategyName") ?? ""),
        investmentPhilosophy: String(form.get("investmentPhilosophy") ?? ""),
        investmentApproach: String(form.get("investmentApproach") ?? ""),
        riskProfile: String(form.get("riskProfile") ?? ""),
        minimumInvestment: String(form.get("minimumInvestment") ?? ""),
        lockInPeriod: String(form.get("lockInPeriod") ?? ""),
        inceptionDate: String(form.get("inceptionDate") ?? ""),
        aum: String(form.get("aum") ?? ""),
        clientCount: String(form.get("clientCount") ?? ""),
        oneYearReturn: String(form.get("oneYearReturn") ?? ""),
        threeYearReturn: String(form.get("threeYearReturn") ?? ""),
        fiveYearReturn: String(form.get("fiveYearReturn") ?? ""),
        sinceInceptionReturn: String(form.get("sinceInceptionReturn") ?? ""),
        status: intent === "publish" ? "published" : status,
        featured,
      };

      startTransition(async () => {
        const response = await saveAssetManager(manager?.id ?? null, payload, intent);
        setResult(response);
        if (response.ok) {
          router.push("/admin/asset-managers");
          router.refresh();
        }
      });
    };
  }

  const errors = result?.fieldErrors ?? {};

  return (
    <form onSubmit={(event) => onSubmit(intentRef.current)(event)} className="space-y-8">
      {result?.error ? (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {result.error}
        </div>
      ) : null}

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Basic Information</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="name" required>
              Asset Manager Name
            </Label>
            <Input id="name" name="name" defaultValue={manager?.name} required />
            <FieldError message={errors.name} />
          </div>
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" name="displayName" defaultValue={manager?.displayName ?? ""} />
          </div>
          <div>
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              placeholder="https://"
              defaultValue={manager?.websiteUrl ?? ""}
            />
            <FieldError message={errors.websiteUrl} />
          </div>
          <div>
            <FileUpload
              label="Logo"
              accept=".png,.jpg,.jpeg,.webp,.svg"
              kind="logo"
              value={logoUrl}
              required
              error={errors.logoUrl}
              onChange={setLogoUrl}
            />
          </div>
          <div>
            <FileUpload
              label="Cover Image"
              accept=".png,.jpg,.jpeg,.webp,.svg"
              kind="cover"
              value={coverImageUrl}
              onChange={setCoverImageUrl}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description" required>
              Description
            </Label>
            <Textarea id="description" name="description" defaultValue={manager?.description} />
            <FieldError message={errors.description} />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Classification</h2>
        <div className="mt-6">
          <p className="label-field">
            Type <span className="text-red-700">*</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {["PMS", "AIF", "BOTH"].map((item) => (
              <label key={item} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="type"
                  checked={type === item}
                  onChange={() => setType(item)}
                />
                {item === "BOTH" ? "Both" : item}
              </label>
            ))}
          </div>
          <FieldError message={errors.type} />
        </div>
        <div className="mt-6">
          <p className="label-field">Categories</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <label key={category.id} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={categoryIds.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Regulatory Information</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="sebiRegistrationNumber">SEBI Registration Number</Label>
            <Input
              id="sebiRegistrationNumber"
              name="sebiRegistrationNumber"
              defaultValue={manager?.sebiRegistrationNumber ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="registrationType">Registration Type</Label>
            <select
              id="registrationType"
              name="registrationType"
              className="input-field"
              defaultValue={manager?.registrationType ?? ""}
            >
              <option value="">Select</option>
              {REGISTRATION_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="licenseValidity">License Validity</Label>
            <Input
              id="licenseValidity"
              name="licenseValidity"
              type="date"
              defaultValue={isoDate(manager?.licenseValidity)}
            />
          </div>
          <FileUpload
            label="License Document"
            accept="application/pdf"
            kind="document"
            value={licenseDocumentUrl}
            onChange={setLicenseDocumentUrl}
          />
        </div>
      </section>

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Contact Information</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input id="contactPerson" name="contactPerson" defaultValue={manager?.contactPerson ?? ""} />
          </div>
          <div>
            <Label htmlFor="contactEmail">Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={manager?.contactEmail ?? ""}
            />
            <FieldError message={errors.contactEmail} />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone</Label>
            <Input id="contactPhone" name="contactPhone" defaultValue={manager?.contactPhone ?? ""} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" defaultValue={manager?.address ?? ""} />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Strategy</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="strategyName">Strategy Name</Label>
            <Input id="strategyName" name="strategyName" defaultValue={manager?.strategyName ?? ""} />
          </div>
          <div>
            <Label htmlFor="riskProfile">Risk Profile</Label>
            <select
              id="riskProfile"
              name="riskProfile"
              className="input-field"
              defaultValue={manager?.riskProfile ?? ""}
            >
              <option value="">Select</option>
              {RISK_PROFILES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="investmentPhilosophy">Investment Philosophy</Label>
            <Textarea
              id="investmentPhilosophy"
              name="investmentPhilosophy"
              defaultValue={manager?.investmentPhilosophy ?? ""}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="investmentApproach">Investment Approach</Label>
            <Textarea
              id="investmentApproach"
              name="investmentApproach"
              defaultValue={manager?.investmentApproach ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="minimumInvestment">Minimum Investment</Label>
            <Input
              id="minimumInvestment"
              name="minimumInvestment"
              placeholder="₹50 lakh"
              defaultValue={manager?.minimumInvestment ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="lockInPeriod">Lock-in Period</Label>
            <Input
              id="lockInPeriod"
              name="lockInPeriod"
              placeholder="None / 12 months"
              defaultValue={manager?.lockInPeriod ?? ""}
            />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Track Record</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="inceptionDate">Inception Date</Label>
            <Input
              id="inceptionDate"
              name="inceptionDate"
              type="date"
              defaultValue={isoDate(manager?.inceptionDate)}
            />
          </div>
          <div>
            <Label htmlFor="aum">AUM</Label>
            <Input id="aum" name="aum" placeholder="₹1,200 Cr" defaultValue={manager?.aum ?? ""} />
          </div>
          <div>
            <Label htmlFor="clientCount">Number of Clients</Label>
            <Input
              id="clientCount"
              name="clientCount"
              type="number"
              defaultValue={manager?.clientCount ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="oneYearReturn">1 Year Return (%)</Label>
            <Input
              id="oneYearReturn"
              name="oneYearReturn"
              type="number"
              step="0.1"
              defaultValue={manager?.oneYearReturn ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="threeYearReturn">3 Year Return (%)</Label>
            <Input
              id="threeYearReturn"
              name="threeYearReturn"
              type="number"
              step="0.1"
              defaultValue={manager?.threeYearReturn ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="fiveYearReturn">5 Year Return (%)</Label>
            <Input
              id="fiveYearReturn"
              name="fiveYearReturn"
              type="number"
              step="0.1"
              defaultValue={manager?.fiveYearReturn ?? ""}
            />
          </div>
          <div>
            <Label htmlFor="sinceInceptionReturn">Since Inception Return (%)</Label>
            <Input
              id="sinceInceptionReturn"
              name="sinceInceptionReturn"
              type="number"
              step="0.1"
              defaultValue={manager?.sinceInceptionReturn ?? ""}
            />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white p-6">
        <h2 className="font-semibold text-2xl">Publishing</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="input-field"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured on Homepage
          </label>
        </div>
      </section>

      <div className="sticky bottom-0 z-10 flex flex-wrap gap-3 border border-ink/10 bg-paper/95 p-4 backdrop-blur">
        <Button
          type="submit"
          variant="gold"
          disabled={pending}
          onClick={() => {
            intentRef.current = "publish";
          }}
        >
          {pending ? "Saving…" : "Publish"}
        </Button>
        <Button
          type="submit"
          variant="outline"
          disabled={pending}
          onClick={() => {
            intentRef.current = "draft";
          }}
        >
          Save Draft
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/asset-managers")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
