import { cache } from "react";

// On Vercel, API_URL is injected by the service binding in vercel.json; locally
// it defaults to the Django dev server.
const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

export function apiUrl(path: string) {
  const base = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
  return new URL(path.replace(/^\//, ""), base).toString();
}

export type CtaLink = {
  label: string;
  href: string;
};

export type ServiceGroup = {
  slug: string;
  audience: string;
  intro?: string;
  items: string[];
  outro?: string;
};

export type Contact = {
  address_lines: string[];
  phone: string;
  phone_href: string;
  whatsapp_href: string;
  email: string;
};

export type SiteContent = {
  practice: {
    name: string;
    tagline: string;
    registration: string;
    practice_number: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary_cta: CtaLink;
    secondary_cta: CtaLink;
    highlights: string[];
  };
  meet: {
    title: string;
    name: string;
    role: string;
    paragraphs: string[];
  };
  page_titles: Record<"about" | "services" | "approach" | "contact" | "book", string>;
  about: {
    paragraphs: string[];
    vision: string;
    mission: string;
  };
  values: string[];
  services: ServiceGroup[];
  who_we_serve: {
    intro: string;
    groups: string[];
  };
  fees: {
    title: string;
    items: { label: string; amount: string }[];
  };
  approach: string[];
  commitment: string;
  contact: Contact;
};

export type Option = {
  value: string;
  label: string;
};

export type BookingOptions = {
  services: Option[];
  preferred_times: Option[];
  contact_methods: Option[];
};

export type FormSummary = {
  slug: string;
  title: string;
  audience: string;
  summary: string;
  pdf: string;
};

type BaseField = {
  name: string;
  label?: string;
  short?: string;
  required?: boolean;
};

export type FormField =
  | (BaseField & {
      type: "text" | "email" | "tel" | "date" | "textarea";
      autocomplete?: string;
      inputmode?: "numeric";
      past?: boolean;
    })
  | (BaseField & { type: "choice"; options: Option[] })
  | (BaseField & { type: "multi"; options: Option[]; other?: boolean })
  | (BaseField & { type: "scale"; scale: Option[]; statements: string[] })
  | (BaseField & { type: "agree"; label: string });

export type FormSection = {
  title: string;
  text?: string[];
  bullets?: string[];
  after?: string[];
  fields?: FormField[];
};

export type FormDefinition = FormSummary & {
  sections: FormSection[];
  footnote?: string;
};

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(apiUrl(path), { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`API responded with ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`Could not load ${path} from ${API_URL}:`, error);
    return null;
  }
}

// Fetched on every request so edits in Django show up straight away. `cache`
// shares one fetch between the layout and the page within a request.
export const getSiteContent = cache(() => getJson<SiteContent>("/api/content/"));

export const getBookingOptions = cache(() =>
  getJson<BookingOptions>("/api/bookings/options/"),
);

export const getForms = cache(() => getJson<{ forms: FormSummary[] }>("/api/forms/"));

export const getForm = cache(async (slug: string): Promise<FormDefinition | null | "missing"> => {
  try {
    const res = await fetch(apiUrl(`/api/forms/${encodeURIComponent(slug)}/`), {
      cache: "no-store",
    });
    if (res.status === 404) return "missing";
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`Could not load form ${slug} from ${API_URL}:`, error);
    return null;
  }
});
