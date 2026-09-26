import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { BookingCta } from "@/components/sections/BookingCta";
import { ServiceGroups } from "@/components/sections/ServiceGroups";
import { ServicePhotos } from "@/components/sections/ServicePhotos";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { getSiteContent } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Services for children, adolescents and youth, parents and families, mothers and babies, employees and workplaces, and individuals.",
};

export default async function ServicesPage() {
  const content = await getSiteContent();
  if (!content) return <Unavailable />;

  return (
    <>
      <PageHeader title={content.page_titles.services} />
      <ServicePhotos />
      <ServiceGroups services={content.services} />
      <WhoWeServe whoWeServe={content.who_we_serve} />
      <BookingCta contact={content.contact} />
    </>
  );
}
