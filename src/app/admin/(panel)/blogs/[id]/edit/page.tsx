import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { getAdminBlog } from "@/lib/content-queries";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await getAdminBlog(params.id);
  if (!post) notFound();
  return (
    <div>
      <h1 className="font-semibold text-4xl">Edit post</h1>
      <p className="mt-1 text-sm text-ink-500">/{post.slug}</p>
      <div className="mt-8">
        <BlogForm post={post} />
      </div>
    </div>
  );
}
