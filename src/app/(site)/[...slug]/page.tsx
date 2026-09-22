import type { Metadata } from "next";
import { CatchPage, catchMetadata } from "@/components/lux/catch-page";
import { PAGES } from "@/data/pages";

type Props = { params: { slug: string[] } };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return PAGES.filter((p) => !p.slug.includes("/")).map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return catchMetadata(params.slug.join("/"));
}

export default async function CatchAllPage({ params }: Props) {
  return <CatchPage slug={params.slug.join("/")} />;
}
