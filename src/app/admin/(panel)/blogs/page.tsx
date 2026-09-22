import Link from "next/link";
import { listAdminBlogs } from "@/lib/content-queries";
import { BlogsTable } from "@/components/admin/blogs-table";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const posts = await listAdminBlogs();
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-semibold text-4xl">Blog posts</h1>
          <p className="mt-1 text-sm text-ink-500">Write, draft and publish articles for the public site.</p>
        </div>
        <Link href="/admin/blogs/new" className="bg-ink px-4 py-2.5 text-sm text-cream hover:bg-ink-700">
          New post
        </Link>
      </div>
      <div className="mt-8">
        <BlogsTable posts={posts} />
      </div>
    </div>
  );
}
