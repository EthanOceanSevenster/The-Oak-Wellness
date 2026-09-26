import { SectionHeading } from "@/components/SectionHeading";

export function ValueList({
  values,
  columns = "grid-cols-2",
}: {
  values: string[];
  columns?: string;
}) {
  return (
    <ul className={`grid gap-3 ${columns}`}>
      {values.map((value) => (
        <li
          key={value}
          className="flex items-center gap-3 rounded-xl border border-indigo/10 bg-white px-4 py-4 font-semibold text-indigo shadow-sm shadow-indigo/5 sm:px-5"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
          {value}
        </li>
      ))}
    </ul>
  );
}

export function Values({ values }: { values: string[] }) {
  return (
    <section className="bg-lilac">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <SectionHeading title="Our Core Values" />
        <div className="mt-10">
          <ValueList values={values} columns="grid-cols-2 sm:grid-cols-4" />
        </div>
      </div>
    </section>
  );
}
