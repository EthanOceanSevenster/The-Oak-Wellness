"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type PointerEvent } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import type { SiteContent } from "@/lib/api";

// Each line rises into place, one after another.
const lines: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const line: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Full-width video banner with depth: the footage drifts slower than the page
// as you scroll and shifts against the text as the mouse moves.
// Video: "Sun beams through the forest trees" from Mixkit (free licence), see
// public/videos/README.md.
export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  // Started from here rather than with autoPlay so that visitors who prefer
  // reduced motion only ever see the still poster frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      return;
    }
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked (e.g. data saver): the poster frame stays instead.
    });
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoScrollY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "20%"]);

  // Pointer position across the banner, from -0.5 to 0.5, eased with a spring.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const easedX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const easedY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const photoX = useTransform(easedX, (v) => v * -28);
  const photoY = useTransform(easedY, (v) => v * -20);
  const textX = useTransform(easedX, (v) => v * 12);
  const textY = useTransform(easedY, (v) => v * 8);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex items-center overflow-hidden bg-midnight"
    >
      <motion.div aria-hidden="true" className="absolute inset-0 -z-20" style={{ y: photoScrollY }}>
        {/* Oversized so the edges never show while it moves. */}
        <motion.div className="absolute -inset-[6%]" style={{ x: photoX, y: photoY }}>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-poster.jpg"
            tabIndex={-1}
            className="h-full w-full object-cover"
          >
            {/* Phones get the small file to go easy on mobile data. */}
            <source src="/videos/hero-small.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>
      {/* Tint so the white text stays readable; strongest behind the text. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-indigo/80 md:bg-transparent md:bg-linear-to-r md:from-midnight/90 md:via-indigo/75 md:to-indigo/30"
      />

      <motion.div
        style={{ x: textX, y: textY }}
        className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 md:py-16"
      >
        <motion.div variants={lines} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={line}
            className="text-sm font-bold tracking-[0.2em] text-gold uppercase"
          >
            {hero.eyebrow}
          </motion.p>
          {/* Sized to keep the headline to 2–3 lines at every screen width. */}
          <motion.h1
            variants={line}
            className="mt-4 font-serif text-[1.625rem] leading-[1.2] font-black tracking-tight text-balance text-paper sm:text-[2rem] lg:text-[2.5rem] xl:text-[2.75rem]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            variants={line}
            className="mt-4 max-w-xl leading-relaxed text-paper/85 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div variants={line} className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={hero.primary_cta.href} variant="gold">
              {hero.primary_cta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary_cta.href} variant="light">
              {hero.secondary_cta.label}
            </ButtonLink>
          </motion.div>
          <motion.ul
            variants={line}
            className="mt-8 space-y-2 border-t border-paper/20 pt-6 text-sm text-paper/85 sm:text-base lg:flex lg:flex-wrap lg:gap-x-8 lg:gap-y-2 lg:space-y-0"
          >
            {hero.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
                {highlight}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
