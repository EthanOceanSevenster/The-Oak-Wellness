"use server";

import { apiUrl } from "@/lib/api";

export type Score = { total: number; max: number; band: string };

export type SubmitFormState =
  | { status: "idle" }
  | { status: "success"; whatsappUrl: string | null; score: Score | null }
  | {
      status: "error";
      attempt: string;
      message: string;
      errors: Record<string, string[]>;
    };

const UNAVAILABLE =
  "We couldn’t send your form just now. Please try again in a moment, or contact us directly.";

function failed(message: string, errors: Record<string, string[]> = {}): SubmitFormState {
  return { status: "error", attempt: crypto.randomUUID(), message, errors };
}

export async function submitForm(
  slug: string,
  _previous: SubmitFormState,
  formData: FormData,
): Promise<SubmitFormState> {
  // Every field goes to Django as a list, so ticked checkbox groups keep all
  // their values; Django validates against the form definition.
  const answers: Record<string, string[]> = {};
  for (const key of new Set(formData.keys())) {
    if (key === "website" || key.startsWith("$ACTION")) continue;
    answers[key] = formData.getAll(key).map(String);
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(`/api/forms/${encodeURIComponent(slug)}/`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, website: String(formData.get("website") ?? "") }),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Could not reach the forms API:", error);
    return failed(UNAVAILABLE);
  }

  if (response.ok) {
    const body: { whatsapp_url: string | null; score: Score | null } = await response.json();
    return { status: "success", whatsappUrl: body.whatsapp_url, score: body.score };
  }

  if (response.status === 400) {
    const body: { errors?: Record<string, string[]> } = await response
      .json()
      .catch(() => ({}));
    const errors = body.errors ?? {};
    return failed(
      errors.__all__?.[0] ?? "Please check the highlighted questions and try again.",
      errors,
    );
  }

  console.error(`Forms API responded with ${response.status}`);
  return failed(UNAVAILABLE);
}
