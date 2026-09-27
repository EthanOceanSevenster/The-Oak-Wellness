import { Mail, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Swoosh } from "@/components/Swoosh";
import type { Contact } from "@/lib/api";

export function BookingCta({ contact }: { contact: Contact }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-indigo px-6 py-14 text-center sm:px-12 md:py-16">
        <Swoosh className="absolute right-0 bottom-0 w-28 rotate-180 sm:w-44" />
        <div className="relative">
          <h2 className="font-serif text-3xl font-black text-balance text-paper sm:text-4xl">
            Book a session
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-paper/80">
            Book online, call or WhatsApp {contact.phone}, or email {contact.email}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book" variant="gold">
              Book a session
            </ButtonLink>
            <ButtonLink href={contact.phone_href} variant="light">
              <Phone aria-hidden="true" className="h-4 w-4" />
              Call
            </ButtonLink>
            <ButtonLink
              href={contact.whatsapp_href}
              target="_blank"
              rel="noopener noreferrer"
              variant="light"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} variant="light">
              <Mail aria-hidden="true" className="h-4 w-4" />
              Email
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
