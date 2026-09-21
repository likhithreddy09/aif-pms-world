import Link from "next/link";

export default function ManagerNotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-semibold text-4xl">Asset Manager Not Found</h1>
      <p className="mt-3 text-ink-500">
        This profile is unavailable, unpublished, or the link may be incorrect.
      </p>
      <Link
        href="/asset-managers"
        className="mt-8 inline-flex h-11 items-center bg-ink px-5 text-sm text-cream"
      >
        Back to directory
      </Link>
    </div>
  );
}
