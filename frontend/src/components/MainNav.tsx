"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/navigation";
import { ButtonLink } from "./ButtonLink";

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav aria-label="Main" className="flex items-center gap-3 lg:gap-8">
      <ul className="hidden items-center gap-7 font-semibold text-midnight/75 lg:flex">
        {navLinks.map((link) => {
          const current = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`relative py-1 transition-colors hover:text-violet ${current ? "text-indigo after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-gold" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <ButtonLink
        href="/book"
        onClick={close}
        className="px-5 py-2.5 text-sm"
        aria-current={pathname === "/book" ? "page" : undefined}
      >
        <span className="sm:hidden">Book</span>
        <span className="hidden sm:inline">Book a session</span>
      </ButtonLink>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-11 w-11 items-center justify-center rounded-full text-indigo hover:bg-indigo/5 lg:hidden"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <Menu aria-hidden="true" className="h-6 w-6" />
        )}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-indigo/10 bg-paper shadow-lg shadow-indigo/10 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-8">
            {navLinks.map((link) => {
              const current = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-lg font-semibold ${current ? "bg-lilac text-indigo" : "text-midnight/80 hover:bg-lilac/60"}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${current ? "bg-gold" : "bg-transparent"}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
