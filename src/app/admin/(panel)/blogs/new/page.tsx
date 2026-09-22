import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-semibold text-4xl">New blog post</h1>
      <p className="mt-1 text-sm text-ink-500">Draft locally, then publish when ready.</p>
      <div className="mt-8">
        <BlogForm />
      </div>
    </div>
  );
}
