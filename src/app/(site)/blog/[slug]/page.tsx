import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/lux/editorial";
import { BlogGrid } from "@/components/lux/widgets";
import { getPublicBlog, listPublicBlogs } from "@/lib/content-queries";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await listPublicBlogs(100);
  return posts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublicBlog(params.slug);
  if (!post) return { title: "Article" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    robots: post.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.ogImageUrl || post.image ? [post.ogImageUrl || post.image!] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPublicBlog(params.slug);
  if (!post) notFound();
  return (
    <div className="bg-ink text-cream">
      <PageHero eyebrow={`${post.kicker} · ${post.date}`} title={post.title} lead={post.excerpt} />
      <article className="container-page max-w-3xl space-y-6 py-16 text-lg leading-relaxed text-cream/75">
        {post.body.map((p) => (
          <p key={p.slice(0, 48)}>{p}</p>
        ))}
      </article>
      <section className="border-t border-gold/15 py-16">
        <div className="container-page">
          <p className="eyebrow">More intelligence</p>
          <div className="mt-8">
            <BlogGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
