import { HeartHandshake } from "lucide-react";
import Image from "next/image";
import oakLandscape from "@/assets/photos/oak-landscape.jpg";

export function Commitment({
  commitment,
  tagline,
}: {
  commitment: string;
  tagline: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-indigo text-paper">
      <Image
        src={oakLandscape}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover"
      />
      {/* Tint over the photo so the text stays readable. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-indigo/80" />
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 md:py-28">
        <HeartHandshake aria-hidden="true" className="mx-auto h-10 w-10 text-gold" />
        <p className="mt-5 text-sm font-bold tracking-[0.2em] text-paper/85 uppercase">
          Our Commitment
        </p>
        <blockquote className="mt-6 font-serif text-2xl leading-snug font-bold text-balance sm:text-3xl md:text-4xl md:leading-snug">
          {commitment}
        </blockquote>
        <p className="mt-10 text-sm font-bold tracking-[0.3em] text-gold uppercase">
          {tagline}
        </p>
      </div>
    </section>
  );
}
