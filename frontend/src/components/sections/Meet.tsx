import * as motion from "motion/react-client";
import Image from "next/image";
import portrait from "@/assets/photos/tabita-kwatsha.jpg";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/api";

// Rises into place the first time it scrolls into view.
const rise = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};
const ease = [0.22, 1, 0.36, 1] as const;

// The social worker's introduction with her photo. `brief` shows the opening
// paragraphs with a link to the full version on the About page.
export function Meet({
  meet,
  brief = false,
}: {
  meet: SiteContent["meet"];
  brief?: boolean;
}) {
  const paragraphs = brief ? meet.paragraphs.slice(0, 2) : meet.paragraphs;

  return (
    <section
      id="meet"
      className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-14 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1fr] lg:gap-16"
    >
      <motion.figure
        {...rise}
        transition={{ duration: 0.8, ease }}
        className="mx-auto w-full max-w-sm lg:max-w-md"
      >
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-lilac"
          />
          <div
            aria-hidden="true"
            className="absolute -top-3 -left-3 h-24 w-24 rounded-tl-[2rem] border-t-4 border-l-4 border-gold"
          />
          <Image
            src={portrait}
            alt={`${meet.name}, ${meet.role}`}
            placeholder="blur"
            sizes="(min-width: 1024px) 448px, 384px"
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl shadow-indigo/15"
          />
        </div>
        <figcaption className="relative mx-6 -mt-10 rounded-2xl bg-white px-5 py-4 text-center shadow-lg shadow-indigo/10">
          <span className="block font-serif text-lg font-bold text-indigo">{meet.name}</span>
          <span className="block text-sm font-semibold text-violet">{meet.role}</span>
          <span className="block text-sm text-midnight/60">{meet.registration}</span>
        </figcaption>
      </motion.figure>

      <motion.div {...rise} transition={{ duration: 0.8, ease, delay: 0.15 }}>
        <SectionHeading title={meet.title} />
        <div className="mt-7 space-y-5 text-lg leading-relaxed text-midnight/80">
          {paragraphs.map((paragraph, i) => (
            <p
              key={paragraph}
              className={i === 0 ? "font-serif text-xl font-bold text-indigo" : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {brief && (
          <ButtonLink href="/about/#meet" variant="secondary" className="mt-8">
            Read more
          </ButtonLink>
        )}
      </motion.div>
    </section>
  );
}
