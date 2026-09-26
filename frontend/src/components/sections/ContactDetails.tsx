import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Contact } from "@/lib/api";

const cardClasses =
  "flex h-full flex-col items-center rounded-2xl border border-indigo/10 bg-white p-8 text-center shadow-sm shadow-indigo/5";

function CardBody({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}) {
  return (
    <>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo text-paper">
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>
      <span className="mt-5 text-sm font-bold tracking-[0.2em] text-violet uppercase">
        {label}
      </span>
      <span className="mt-2 text-xl font-semibold break-words text-indigo">
        {children}
      </span>
    </>
  );
}

export function ContactDetails({ contact }: { contact: Contact }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
      <ul className="grid gap-5 md:grid-cols-3">
        <li>
          <a
            href={contact.phone_href}
            className={`${cardClasses} transition hover:-translate-y-0.5 hover:border-violet/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet`}
          >
            <CardBody icon={Phone} label="Telephone">
              {contact.phone}
            </CardBody>
          </a>
        </li>
        <li>
          <div className={cardClasses}>
            <CardBody icon={MapPin} label="Address">
              {contact.address_lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </CardBody>
          </div>
        </li>
        <li>
          <a
            href={`mailto:${contact.email}`}
            className={`${cardClasses} transition hover:-translate-y-0.5 hover:border-violet/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet`}
          >
            <CardBody icon={Mail} label="Email">
              {contact.email}
            </CardBody>
          </a>
        </li>
      </ul>
    </section>
  );
}
