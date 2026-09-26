"use server";

import { apiUrl } from "@/lib/api";

export type BookingFormState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      // Unique per failed submission; the form remounts on it so every field,
      // selects included, is refilled from `values`.
      attempt: string;
      message: string;
      errors: Record<string, string[]>;
      // What was submitted, so the form can be refilled after an error.
      values: Record<string, string>;
    };

const FIELDS = [
  "name",
  "email",
  "phone",
  "service",
  "preferred_date",
  "preferred_time",
  "contact_method",
  "message",
  "consent",
];

const UNAVAILABLE =
  "We couldn’t send your request just now. Please try again in a moment, or contact us directly.";

function failed(
  message: string,
  values: Record<string, string>,
  errors: Record<string, string[]> = {},
): BookingFormState {
  return { status: "error", attempt: crypto.randomUUID(), message, errors, values };
}

export async function requestBooking(
  _previous: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  );

  let response: Response;
  try {
    response = await fetch(apiUrl("/api/bookings/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        preferred_date: values.preferred_date || null,
        consent: values.consent === "on",
        website: String(formData.get("website") ?? ""),
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Could not reach the booking API:", error);
    return failed(UNAVAILABLE, values);
  }

  if (response.ok) {
    return { status: "success", name: values.name };
  }

  if (response.status === 400) {
    const body: { errors?: Record<string, string[]> } = await response
      .json()
      .catch(() => ({}));
    const errors = body.errors ?? {};
    return failed(
      errors.__all__?.[0] ?? "Please check the highlighted fields and try again.",
      values,
      errors,
    );
  }

  console.error(`Booking API responded with ${response.status}`);
  return failed(UNAVAILABLE, values);
}
