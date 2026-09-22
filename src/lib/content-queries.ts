import { db } from "@/lib/db";
import { BLOGS } from "@/data/site";
import { getPage, type EditorialPage } from "@/data/pages";

export type PublicBlog = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  kicker: string;
  image?: string;
  excerpt: string;
  body: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  source: "db" | "static";
};

function formatDate(d?: Date | null) {
  if (!d) return "";
  return d.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

function bodyToParagraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function listPublicBlogs(limit = 24): Promise<PublicBlog[]> {
  const posts = await db.blogPost.findMany({
    where: { status: "published" },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    take: limit,
  });

  const fromDb: PublicBlog[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    date: formatDate(p.publishedAt) || formatDate(p.createdAt),
    kicker: p.kicker,
    image: p.coverImageUrl ?? undefined,
    excerpt: p.excerpt,
    body: bodyToParagraphs(p.body),
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    ogImageUrl: p.ogImageUrl,
    canonicalUrl: p.canonicalUrl,
    noIndex: p.noIndex,
    source: "db" as const,
  }));

  const used = new Set(fromDb.map((p) => p.slug));
  const fromStatic = BLOGS.filter((b) => !used.has(b.slug)).map((b) => ({
    ...b,
    source: "static" as const,
  }));

  return [...fromDb, ...fromStatic].slice(0, limit);
}

export async function getPublicBlog(slug: string): Promise<PublicBlog | null> {
  const post = await db.blogPost.findFirst({
    where: { slug, status: "published" },
  });
  if (post) {
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      date: formatDate(post.publishedAt) || formatDate(post.createdAt),
      kicker: post.kicker,
      image: post.coverImageUrl ?? undefined,
      excerpt: post.excerpt,
      body: bodyToParagraphs(post.body),
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      ogImageUrl: post.ogImageUrl,
      canonicalUrl: post.canonicalUrl,
      noIndex: post.noIndex,
      source: "db",
    };
  }
  const staticPost = BLOGS.find((b) => b.slug === slug);
  if (!staticPost) return null;
  return { ...staticPost, source: "static" };
}

export async function listAdminBlogs() {
  return db.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getAdminBlog(id: string) {
  return db.blogPost.findUnique({ where: { id } });
}

export type PublicLanding = EditorialPage & {
  id?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  source: "db" | "static";
};

export async function getPublicLanding(slug: string): Promise<PublicLanding | null> {
  const page = await db.landingPage.findFirst({
    where: { slug, status: "published" },
  });
  if (page) {
    let sections: EditorialPage["sections"] = [];
    let widgets: EditorialPage["widgets"] = [];
    let faqs: EditorialPage["faqs"] = [];
    try {
      sections = JSON.parse(page.sectionsJson || "[]");
    } catch {
      sections = [];
    }
    try {
      widgets = JSON.parse(page.widgetsJson || "[]");
    } catch {
      widgets = [];
    }
    try {
      faqs = JSON.parse(page.faqsJson || "[]");
    } catch {
      faqs = [];
    }
    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      eyebrow: page.eyebrow,
      lead: page.lead,
      kind: page.kind as EditorialPage["kind"],
      sections,
      widgets,
      faqs,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      ogImageUrl: page.ogImageUrl,
      canonicalUrl: page.canonicalUrl,
      noIndex: page.noIndex,
      source: "db",
    };
  }
  const staticPage = getPage(slug);
  if (!staticPage) return null;
  return { ...staticPage, source: "static" };
}

export async function listAdminPages() {
  return db.landingPage.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getAdminPage(id: string) {
  return db.landingPage.findUnique({ where: { id } });
}

export async function getSeoSettings() {
  const existing = await db.seoSettings.findUnique({ where: { id: "site" } });
  if (existing) return existing;
  return db.seoSettings.create({
    data: { id: "site" },
  });
}

export async function getContentDashboardCounts() {
  const [blogs, publishedBlogs, pages, publishedPages] = await Promise.all([
    db.blogPost.count(),
    db.blogPost.count({ where: { status: "published" } }),
    db.landingPage.count(),
    db.landingPage.count({ where: { status: "published" } }),
  ]);
  return { blogs, publishedBlogs, pages, publishedPages };
}
