import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { AboutStory } from "@/components/sections/AboutStory";
import { BookingCta } from "@/components/sections/BookingCta";
import { Commitment } from "@/components/sections/Commitment";
import { Meet } from "@/components/sections/Meet";
import { Values } from "@/components/sections/Values";
import { getSiteContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Like an oak tree, the practice represents strength, growth, stability and hope.",
};

export default async function AboutPage() {
  const content = await getSiteContent();
  if (!content) return <Unavailable />;

  return (
    <>
      <PageHeader title={content.page_titles.about} />
      <Meet meet={content.meet} practice={content.practice} />
      <AboutStory about={content.about} />
      <Values values={content.values} />
      <Commitment commitment={content.commitment} tagline={content.practice.tagline} />
      <BookingCta contact={content.contact} />
    </>
  );
}
