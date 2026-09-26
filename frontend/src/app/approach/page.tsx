import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { Approach } from "@/components/sections/Approach";
import { BookingCta } from "@/components/sections/BookingCta";
import { getSiteContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "The Oak Wellness follows a person-centred and strengths-based approach.",
};

export default async function ApproachPage() {
  const content = await getSiteContent();
  if (!content) return <Unavailable />;

  return (
    <>
      <PageHeader title={content.page_titles.approach} />
      <Approach paragraphs={content.approach} />
      <BookingCta contact={content.contact} />
    </>
  );
}
