import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { getBookingOptions, getSiteContent } from "@/lib/api";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a Session",
  description: "Request a session with The Oak Wellness.",
};

export default async function BookPage() {
  const [content, options] = await Promise.all([
    getSiteContent(),
    getBookingOptions(),
  ]);
  if (!content || !options) return <Unavailable />;

  const { contact } = content;
  // Earliest date the form offers, in the practice's time zone.
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
  }).format(new Date());

  return (
    <>
      <PageHeader
        title={content.page_titles.book}
        intro="Request a session using the form below."
      />
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-[1fr_22rem] lg:gap-10">
        <BookingForm options={options} contact={contact} today={today} />

        <aside className="rounded-3xl bg-lilac p-7">
          <h2 className="font-serif text-xl font-black text-indigo">
            Contact Details
          </h2>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={contact.phone_href}
                className="flex items-center gap-3 font-semibold text-indigo hover:text-violet"
              >
                <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-violet" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={contact.whatsapp_href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-semibold text-indigo hover:text-violet"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0 text-violet" />
                WhatsApp {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 font-semibold break-all text-indigo hover:text-violet"
              >
                <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-violet" />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3 font-semibold text-indigo">
              <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-violet" />
              <span>
                {contact.address_lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
