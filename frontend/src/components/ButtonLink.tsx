import Link from "next/link";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-indigo text-paper hover:bg-plum",
  secondary:
    "border border-indigo/25 text-indigo hover:border-indigo hover:bg-indigo/5",
  gold: "bg-gold text-midnight hover:bg-gold/85",
  light: "border border-paper/35 text-paper hover:border-paper hover:bg-paper/10",
};

type ButtonLinkProps = ComponentProps<"a"> & {
  href: string;
  variant?: keyof typeof variants;
};

// Site pages go through next/link; tel:, mailto: and external links stay plain anchors.
export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${variants[variant]} ${className}`;

  return href.startsWith("/") ? (
    <Link href={href} className={classes} {...props} />
  ) : (
    <a href={href} className={classes} {...props} />
  );
}
