import { cache } from "react";

export const API_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

export type CtaLink = {
  label: string;
  href: string;
};

export type ServiceGroup = {
  slug: string;
  audience: string;
  items: string[];
};

export type Contact = {
  address_lines: string[];
  phone: string;
  phone_href: string;
  email: string;
};

export type SiteContent = {
  practice: {
    name: string;
    tagline: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary_cta: CtaLink;
    secondary_cta: CtaLink;
    highlights: string[];
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

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
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
