import Image from "next/image";
import calmCorner from "@/assets/photos/calm-corner.jpg";

export function Approach({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <div className="space-y-6 text-lg leading-relaxed text-midnight/80 sm:text-xl">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Image
        src={calmCorner}
        alt="An armchair beside a table with a cup of tea and an open journal"
        placeholder="blur"
        sizes="(min-width: 1024px) 480px, 100vw"
        className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-indigo/10"
      />
    </section>
  );
}
