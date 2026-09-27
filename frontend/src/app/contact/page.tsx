import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { BookingCta } from "@/components/sections/BookingCta";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { getSiteContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact Details",
  description:
    "The Oak Wellness, 134 Kempston Road, Gqeberha. Telephone: 079 260 4577. Email: zenanitab@gmail.com",
};

export default async function ContactPage() {
  const content = await getSiteContent();
  if (!content) return <Unavailable />;

  return (
    <>
      <PageHeader
        title={content.page_titles.contact}
        intro={`${content.practice.registration} · ${content.practice.practice_number}`}
      />
      <ContactDetails contact={content.contact} />
      <BookingCta contact={content.contact} />
    </>
  );
}
