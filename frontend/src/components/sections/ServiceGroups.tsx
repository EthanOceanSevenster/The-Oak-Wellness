import { serviceIcon } from "@/components/icons";
import type { ServiceGroup } from "@/lib/api";

// Full list of services, one card per group, for the Services page.
export function ServiceGroups({ services }: { services: ServiceGroup[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <nav aria-label="Jump to a service" className="flex flex-wrap gap-2">
        {services.map((service) => (
          <a
            key={service.slug}
            href={`#${service.slug}`}
            className="rounded-full border border-indigo/15 bg-white px-4 py-2 text-sm font-semibold text-indigo transition-colors hover:border-violet hover:text-violet"
          >
            {service.audience}
          </a>
        ))}
      </nav>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = serviceIcon(service.slug);
          return (
            <li
              key={service.slug}
              id={service.slug}
              className="flex scroll-mt-24 flex-col rounded-2xl border border-indigo/10 bg-white p-7 shadow-sm shadow-indigo/5 sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lilac text-violet">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="font-serif text-2xl font-bold text-indigo">
                  {service.audience}
                </h2>
              </div>
              <span className="mt-6 h-0.5 w-12 bg-gold" />
              <ul className="mt-5 space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug text-midnight/85">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
