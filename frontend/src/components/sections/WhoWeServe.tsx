import { Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/api";

export function WhoWeServe({
  whoWeServe,
}: {
  whoWeServe: SiteContent["who_we_serve"];
}) {
  return (
    <section className="bg-lilac">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading title="Who We Serve" />
          <p className="mt-5 text-lg text-midnight/75">{whoWeServe.intro}</p>
        </div>
        <ul className="grid content-center gap-4 sm:grid-cols-2">
          {whoWeServe.groups.map((group) => (
            <li key={group} className="flex gap-3 text-lg leading-snug text-midnight/85">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet text-paper">
                <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              {group}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
