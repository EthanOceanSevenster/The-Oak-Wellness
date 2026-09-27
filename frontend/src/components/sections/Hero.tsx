import Image from "next/image";
import logoFull from "@/assets/logo-full.webp";
import { ButtonLink } from "@/components/ButtonLink";
import { Swoosh } from "@/components/Swoosh";
import type { SiteContent } from "@/lib/api";

export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <Swoosh className="absolute top-0 right-0 w-32 -scale-x-100 sm:w-56 md:w-72 xl:w-96" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-24 pb-20 sm:px-8 md:grid-cols-[1.15fr_1fr] md:pt-28 md:pb-24">
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-violet uppercase">
            {hero.eyebrow}
          </p>
          {/* Sized to keep the headline to 2–3 lines at every screen width. */}
          <h1 className="mt-5 font-serif text-[1.625rem] leading-[1.2] font-black tracking-tight text-balance text-indigo sm:text-[2rem] md:text-[1.75rem] lg:text-4xl xl:text-[2.75rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-midnight/75 sm:text-xl">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={hero.primary_cta.href}>
              {hero.primary_cta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary_cta.href} variant="secondary">
              {hero.secondary_cta.label}
            </ButtonLink>
          </div>
          <ul className="mt-10 space-y-3 border-t border-gold/60 pt-8 text-midnight/80">
            {hero.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div
            aria-hidden="true"
            className="absolute inset-x-[4%] top-[6%] aspect-square rounded-full bg-lilac"
          />
          <Image
            src={logoFull}
            alt="The Oak Wellness logo: an oak tree with a heart in its roots"
            priority
            sizes="(min-width: 768px) 448px, 384px"
            className="relative h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
