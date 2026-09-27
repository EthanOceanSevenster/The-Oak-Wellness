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
      {/* grid-flow-dense fills the gap a full-width card would otherwise leave. */}
      <ul className="mt-10 grid gap-6 md:grid-flow-dense md:grid-cols-2">
        {services.map((service) => {
          const Icon = serviceIcon(service.slug);
          // Groups with their own intro text get a full-width card.
          const detailed = Boolean(service.intro);
          return (
            <li
              key={service.slug}
              id={service.slug}
              className={`flex scroll-mt-24 flex-col rounded-2xl border border-indigo/10 bg-white p-7 shadow-sm shadow-indigo/5 sm:p-8 ${detailed ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lilac text-violet">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="font-serif text-2xl font-bold text-indigo">
                  {service.audience}
                </h2>
              </div>
              {service.intro && (
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-midnight/80">
                  {service.intro}
                </p>
              )}
              <span className="mt-6 h-0.5 w-12 bg-gold" />
              {detailed && (
                <p className="mt-5 font-semibold text-indigo">Our services include:</p>
              )}
              <ul
                className={`mt-5 gap-x-10 space-y-3 ${detailed ? "md:grid md:grid-cols-2 md:space-y-0 md:gap-y-3" : ""}`}
              >
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-snug text-midnight/85">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              {service.outro && (
                <p className="mt-7 max-w-3xl border-l-4 border-gold pl-4 text-lg leading-relaxed text-midnight/80">
                  {service.outro}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
