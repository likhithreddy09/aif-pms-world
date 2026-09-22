import type { Metadata } from "next";
import { CatchPage, catchMetadata } from "@/components/lux/catch-page";

type Props = { params: { rest: string[] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return catchMetadata(["category", ...params.rest].join("/"));
}

export default async function CategoryNested({ params }: Props) {
  return <CatchPage slug={["category", ...params.rest].join("/")} />;
}
