import Image from "next/image";
import Link from "next/link";
import logoTree from "@/assets/logo-tree.png";

// Text version of the "The Oak / — WELLNESS —" lockup from the business card.
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      className={`flex flex-col items-center leading-none ${tone === "dark" ? "text-indigo" : "text-paper"}`}
    >
      <span className="font-serif text-xl font-black tracking-tight">
        The Oak
      </span>
      <span className="mt-1.5 flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.3em]">
        <span className="h-px w-3 bg-gold" />
        <span className="-mr-[0.3em]">WELLNESS</span>
        <span className="h-px w-3 bg-gold" />
      </span>
    </span>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="The Oak Wellness home"
      className="flex shrink-0 items-center gap-2.5"
    >
      <Image src={logoTree} alt="" priority className="h-11 w-auto" />
      <Wordmark />
    </Link>
  );
}
