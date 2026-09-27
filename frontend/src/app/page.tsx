import { Unavailable } from "@/components/Unavailable";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { BookingCta } from "@/components/sections/BookingCta";
import { Commitment } from "@/components/sections/Commitment";
import { Hero } from "@/components/sections/Hero";
import { Meet } from "@/components/sections/Meet";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { getSiteContent } from "@/lib/api";

export default async function HomePage() {
  const content = await getSiteContent();
  if (!content) return <Unavailable />;

  return (
    <>
      <Hero hero={content.hero} />
      <Meet meet={content.meet} practice={content.practice} brief />
      <AboutIntro about={content.about} values={content.values} />
      <ServicesOverview services={content.services} />
      <Commitment commitment={content.commitment} tagline={content.practice.tagline} />
      <BookingCta contact={content.contact} />
    </>
  );
}
