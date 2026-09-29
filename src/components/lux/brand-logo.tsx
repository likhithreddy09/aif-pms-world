import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority = false,
  href = "/",
  height = 40,
}: {
  className?: string;
  priority?: boolean;
  href?: string | null;
  /** Visual height in px; width scales from the wordmark aspect (~4.2:1) */
  height?: number;
}) {
  const width = Math.round(height * 4.2);
  const img = (
    <Image
      src={SITE.logo}
      alt={SITE.name}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("h-auto w-auto max-w-full object-contain object-left", className)}
      style={{ height, width: "auto" }}
    />
  );

  if (href === null) return <span className="inline-flex">{img}</span>;

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label={SITE.name}>
      {img}
    </Link>
  );
}
