import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EditorialView } from "@/components/lux/editorial-view";
import { getPage, type EditorialPage } from "@/data/pages";
import { TEAM } from "@/data/site";
import { getPublicLanding } from "@/lib/content-queries";

export function resolveEditorial(slug: string): EditorialPage | undefined {
  const direct = getPage(slug);
  if (direct) return direct;
  if (slug === "team-member") {
    return getPage("team-member");
  }
  if (slug.startsWith("team-member/")) {
    const id = slug.split("/")[1];
    const member = TEAM.find((t) => t.slug === id);
    if (!member) return undefined;
    return {
      slug,
      title: member.name,
      eyebrow: member.role,
      lead: member.quote,
      kind: "team",
      sections: [],
      widgets: ["team", "voices"],
    };
  }
  return undefined;
}

function toViewPage(page: EditorialPage): EditorialPage {
  return {
    slug: page.slug,
    title: page.title,
    eyebrow: page.eyebrow ?? "",
    lead: page.lead ?? "",
    kind: page.kind ?? "generic",
    sections: Array.isArray(page.sections) ? page.sections : [],
    widgets: Array.isArray(page.widgets) ? page.widgets : [],
    faqs: Array.isArray(page.faqs) ? page.faqs : [],
  };
}

export async function catchMetadata(slug: string): Promise<Metadata> {
  const dbPage = await getPublicLanding(slug);
  if (dbPage?.source === "db") {
    return {
      title: dbPage.metaTitle || dbPage.title,
      description: dbPage.metaDescription || dbPage.lead,
      alternates: dbPage.canonicalUrl ? { canonical: dbPage.canonicalUrl } : undefined,
      robots: dbPage.noIndex ? { index: false, follow: false } : undefined,
      openGraph: {
        title: dbPage.metaTitle || dbPage.title,
        description: dbPage.metaDescription || dbPage.lead,
        images: dbPage.ogImageUrl ? [dbPage.ogImageUrl] : undefined,
      },
    };
  }
  const page = resolveEditorial(slug);
  if (!page) return { title: "Page" };
  return { title: page.title, description: page.lead };
}

export async function CatchPage({ slug }: { slug: string }) {
  const dbPage = await getPublicLanding(slug);
  if (dbPage?.source === "db") {
    return <EditorialView page={toViewPage(dbPage)} />;
  }
  const page = resolveEditorial(slug);
  if (!page) notFound();
  return <EditorialView page={toViewPage(page)} />;
}
