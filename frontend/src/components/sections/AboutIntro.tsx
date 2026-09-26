import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeading } from "@/components/SectionHeading";
import type { SiteContent } from "@/lib/api";
import { ValueList } from "./Values";

// Short version of the About page for the home page.
export function AboutIntro({
  about,
  values,
}: {
  about: SiteContent["about"];
  values: string[];
}) {
  return (
    <section className="bg-lilac">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading title="About Us" />
          <div className="mt-7 space-y-5 text-lg leading-relaxed text-midnight/80">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            More about us
          </ButtonLink>
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-indigo">Our Core Values</h3>
          <div className="mt-5">
            <ValueList values={values} />
          </div>
        </div>
      </div>
    </section>
  );
}
