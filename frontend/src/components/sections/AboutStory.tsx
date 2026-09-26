import { Compass, Eye, type LucideIcon } from "lucide-react";
import type { SiteContent } from "@/lib/api";

function Statement({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border-l-4 border-gold bg-white p-7 shadow-sm shadow-indigo/5">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo text-paper">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h2 className="font-serif text-xl font-bold text-indigo">{title}</h2>
      </div>
      <p className="mt-4 text-lg leading-relaxed text-midnight/75">{text}</p>
    </div>
  );
}

export function AboutStory({ about }: { about: SiteContent["about"] }) {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="space-y-5 text-lg leading-relaxed text-midnight/80 sm:text-xl">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="grid content-start gap-5">
        <Statement icon={Eye} title="Our Vision" text={about.vision} />
        <Statement icon={Compass} title="Our Mission" text={about.mission} />
      </div>
    </section>
  );
}
