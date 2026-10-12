import { SectionHeading } from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/api";

export function Fees({ fees }: { fees: SiteContent["fees"] }) {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <SectionHeading title={fees.title} align="center" />
        <ul className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {fees.items.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-violet/15 bg-lilac px-7 py-8 text-center"
            >
              <p className="text-lg leading-snug text-midnight/75">{item.label}</p>
              <p className="mt-2 font-serif text-3xl font-black tracking-tight text-indigo">
                {item.amount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
