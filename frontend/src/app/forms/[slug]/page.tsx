import { Download } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Unavailable } from "@/components/Unavailable";
import { getForm, getSiteContent } from "@/lib/api";
import { submitForm } from "./actions";
import { ClientForm } from "./ClientForm";

export async function generateMetadata({
  params,
}: PageProps<"/forms/[slug]">): Promise<Metadata> {
  const form = await getForm((await params).slug);
  if (!form || form === "missing") return { title: "Forms" };
  return { title: form.title, description: form.summary };
}

export default async function FormPage({ params }: PageProps<"/forms/[slug]">) {
  const { slug } = await params;
  const [content, form] = await Promise.all([getSiteContent(), getForm(slug)]);
  if (form === "missing") notFound();
  if (!content || !form) return <Unavailable />;

  // Latest date the form accepts for a date of birth, in the practice's time zone.
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Johannesburg",
  }).format(new Date());

  return (
    <>
      <PageHeader title={form.title} intro={form.summary} />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-20">
        <p className="mb-6 text-midnight/70">
          Prefer paper?{" "}
          <a
            href={form.pdf}
            download
            className="inline-flex items-center gap-1.5 font-semibold text-violet underline"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Download the PDF
          </a>
        </p>
        <ClientForm
          form={form}
          contact={content.contact}
          today={today}
          action={submitForm.bind(null, form.slug)}
        />
      </div>
    </>
  );
}
