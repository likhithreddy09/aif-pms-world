import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="font-semibold text-4xl">Page not found</h1>
      <p className="mt-3 text-ink-500">The page you requested does not exist.</p>
      <Link href="/" className="mt-8 inline-flex h-11 items-center bg-ink px-5 text-sm text-cream">
        Go home
      </Link>
    </div>
  );
}
