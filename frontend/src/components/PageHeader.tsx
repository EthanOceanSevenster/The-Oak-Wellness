import { Swoosh } from "./Swoosh";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-lilac">
      <Swoosh className="absolute top-0 right-0 w-28 -scale-x-100 sm:w-48 md:w-64" />
      <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-14 sm:px-8 md:pt-24 md:pb-18">
        <span className="block h-0.5 w-10 bg-gold" />
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-black tracking-tight text-balance text-indigo sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-midnight/75 sm:text-xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
