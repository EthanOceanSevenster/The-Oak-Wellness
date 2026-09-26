import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { serviceIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import type { ServiceGroup } from "@/lib/api";

const PREVIEW_ITEMS = 3;

// Home page preview of the services; each card links to its full list.
export function ServicesOverview({ services }: { services: ServiceGroup[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading title="Our Services" />
        <ButtonLink href="/services" variant="secondary" className="self-start md:self-auto">
          View all services
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcon(service.slug);
          const more = service.items.length - PREVIEW_ITEMS;
          return (
            <li key={service.slug}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-indigo/10 bg-white p-7 shadow-sm shadow-indigo/5 transition hover:-translate-y-0.5 hover:border-violet/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lilac text-violet">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif text-xl font-bold text-indigo">
                    {service.audience}
                  </h3>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {service.items.slice(0, PREVIEW_ITEMS).map((item) => (
                    <li key={item} className="flex gap-3 leading-snug text-midnight/80">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto flex items-center gap-1.5 pt-6 font-semibold text-violet">
                  {more > 0 ? `See all ${service.items.length}` : "Learn more"}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
