import Link from "next/link";
import type { SiteContent } from "@/lib/api";
import { navLinks } from "@/lib/navigation";
import { Wordmark } from "./Logo";

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xs font-bold tracking-[0.2em] text-gold uppercase">
      {children}
    </h2>
  );
}

export function SiteFooter({ content }: { content: SiteContent | null }) {
  return (
    <footer className="bg-midnight text-paper/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
        <div>
          <div className="inline-flex">
            <Wordmark tone="light" />
          </div>
          {content && (
            <p className="mt-5 text-xs font-bold tracking-[0.25em] text-gold uppercase">
              {content.practice.tagline}
            </p>
          )}
        </div>

        <div>
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {[...navLinks, { label: "Book a session", href: "/book" }].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {content && (
          <>
            <div>
              <FooterHeading>Services</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                {content.services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services#${service.slug}`} className="hover:text-paper">
                      {service.audience}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <FooterHeading>Contact</FooterHeading>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a href={content.contact.phone_href} className="hover:text-paper">
                    {content.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={content.contact.whatsapp_href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-paper"
                  >
                    WhatsApp {content.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${content.contact.email}`} className="break-words hover:text-paper">
                    {content.contact.email}
                  </a>
                </li>
                <li>{content.contact.address_lines.join(", ")}</li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-6xl px-5 py-6 text-sm text-paper/55 sm:px-8">
          &copy; {new Date().getFullYear()} The Oak Wellness. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
