import { ArrowRight, Download, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { getForms } from "@/lib/api";

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Consent, assessment and evaluation forms for The Oak Families and Wellness. Fill them in online or download a PDF.",
};

export default async function FormsPage() {
  const data = await getForms();
  if (!data) return <Unavailable />;

  return (
    <>
      <PageHeader
        title="Forms"
        intro="Fill in a form online and send it to us straight away, or download a PDF to print."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {data.forms.map((form) => (
            <li
              key={form.slug}
              className="flex flex-col rounded-3xl border border-indigo/10 bg-white p-7 shadow-sm shadow-indigo/5 sm:p-8"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lilac text-violet">
                <FileText aria-hidden="true" className="h-6 w-6" />
              </span>
              <p className="mt-5 text-sm font-bold tracking-[0.2em] text-violet uppercase">
                {form.audience}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-black text-indigo">{form.title}</h2>
              <p className="mt-3 flex-1 leading-relaxed text-midnight/75">{form.summary}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={`/forms/${form.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3 font-semibold text-paper transition-colors hover:bg-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                >
                  Fill in online
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <a
                  href={form.pdf}
                  download
                  className="inline-flex items-center gap-1.5 font-semibold text-violet hover:text-indigo"
                >
                  <Download aria-hidden="true" className="h-4 w-4" />
                  PDF
                  <span className="sr-only"> of {form.title}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
