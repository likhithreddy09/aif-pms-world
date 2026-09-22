import type { Metadata } from "next";
import { CatchPage, catchMetadata } from "@/components/lux/catch-page";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return catchMetadata(`team-member/${params.slug}`);
}

export default async function TeamMemberPage({ params }: Props) {
  return <CatchPage slug={`team-member/${params.slug}`} />;
}
