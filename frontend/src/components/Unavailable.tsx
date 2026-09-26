// Shown when the Django API can't be reached.
export function Unavailable() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="font-serif text-3xl font-black text-indigo">
        We&apos;ll be right back
      </h1>
      <p className="mt-4 text-lg text-midnight/70">
        We couldn&apos;t load this page just now. Please try again in a moment.
      </p>
    </div>
  );
}
