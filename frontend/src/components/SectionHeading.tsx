type SectionHeadingProps = {
  title: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  title,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`block h-0.5 w-10 bg-gold ${centered ? "mx-auto" : ""}`}
      />
      <h2
        className={`mt-4 font-serif text-3xl leading-tight font-black tracking-tight text-balance sm:text-4xl ${tone === "dark" ? "text-indigo" : "text-paper"}`}
      >
        {title}
      </h2>
    </div>
  );
}
