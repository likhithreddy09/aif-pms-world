import type { Metadata } from "next";
import { CatchPage, catchMetadata } from "@/components/lux/catch-page";

type Props = { params: { rest: string[] } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return catchMetadata(["investonomics", ...params.rest].join("/"));
}

export default async function InvestonomicsNested({ params }: Props) {
  return <CatchPage slug={["investonomics", ...params.rest].join("/")} />;
}
