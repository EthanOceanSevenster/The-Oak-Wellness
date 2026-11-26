"use client";

import { CircleCheck, LoaderCircle, MessageCircle, Send } from "lucide-react";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  type FormEvent,
} from "react";
import { ButtonLink } from "@/components/ButtonLink";
import type { Contact, FormDefinition, FormField } from "@/lib/api";
import type { SubmitFormState } from "./actions";

const initialState: SubmitFormState = { status: "idle" };

const inputClasses =
  "mt-2 block w-full rounded-xl border border-indigo/20 bg-white px-4 py-3 text-midnight shadow-sm shadow-indigo/5 transition placeholder:text-midnight/40 focus:border-violet focus:ring-2 focus:ring-violet/25 focus:outline-none aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/15";

const pillClasses =
  "block rounded-full border border-indigo/20 bg-white px-4 py-2 font-semibold text-midnight/80 transition peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet";

const autoCompleteDefault = "off";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700">
      {errors[0]}
    </p>
  );
}

function Optional({ show }: { show: boolean }) {
  return show ? <span className="font-normal text-midnight/55"> (optional)</span> : null;
}

function Field({
  field,
  errors,
  today,
}: {
  field: FormField;
  errors?: string[];
  today: string;
}) {
  const id = `field-${field.name}`;
  const invalid = errors?.length ? true : undefined;
  const describedBy = invalid ? `${id}-error` : undefined;
  const required = Boolean(field.required);

  switch (field.type) {
    case "agree":
      return (
        <div>
          <label className="flex cursor-pointer gap-3">
            <input
              id={id}
              name={field.name}
              type="checkbox"
              required={required}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className="mt-1 h-5 w-5 shrink-0 accent-indigo"
            />
            <span className="leading-relaxed font-semibold text-indigo">{field.label}</span>
          </label>
          <FieldError id={id} errors={errors} />
        </div>
      );

    case "choice":
    case "multi":
      return (
        <fieldset aria-describedby={describedBy}>
          <legend className="font-semibold text-indigo">
            {field.label}
            <Optional show={!required && field.type === "choice"} />
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {field.options.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type={field.type === "choice" ? "radio" : "checkbox"}
                  name={field.name}
                  value={option.value}
                  required={field.type === "choice" && required}
                  className="peer sr-only"
                />
                <span className={pillClasses}>{option.label}</span>
              </label>
            ))}
          </div>
          {field.type === "multi" && field.other && (
            <label className="mt-3 block">
              <span className="text-midnight/75">Other</span>
              <input
                name={`${field.name}.other`}
                type="text"
                maxLength={200}
                className={inputClasses}
              />
            </label>
          )}
          <FieldError id={id} errors={errors} />
        </fieldset>
      );

    case "scale":
      return (
        <div>
          <ol className="space-y-5">
            {field.statements.map((statement, i) => (
              <li key={statement}>
                <fieldset className="rounded-2xl border border-indigo/10 bg-lilac/40 p-4 sm:p-5">
                  <legend className="sr-only">{statement}</legend>
                  <p aria-hidden="true" className="font-semibold text-indigo">
                    <span className="text-violet">{i + 1}.</span> {statement}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {field.scale.map((option) => (
                      <label key={option.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name={`${field.name}.${i}`}
                          value={option.value}
                          required={required}
                          className="peer sr-only"
                        />
                        <span className={`${pillClasses} text-sm`}>
                          {option.value} · {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
          <FieldError id={id} errors={errors} />
        </div>
      );

    default: {
      const common = {
        id,
        name: field.name,
        required,
        "aria-invalid": invalid,
        "aria-describedby": describedBy,
        autoComplete: field.autocomplete ?? autoCompleteDefault,
        className: inputClasses,
      };
      return (
        <div>
          <label htmlFor={id} className="font-semibold text-indigo">
            {field.label}
            <Optional show={!required} />
          </label>
          {field.type === "textarea" ? (
            <textarea {...common} rows={4} maxLength={2000} />
          ) : (
            <input
              {...common}
              type={field.type}
              inputMode={field.inputmode}
              maxLength={field.type === "date" ? undefined : 200}
              max={field.type === "date" && field.past ? today : undefined}
            />
          )}
          <FieldError id={id} errors={errors} />
        </div>
      );
    }
  }
}

function Prose({ paragraphs }: { paragraphs?: string[] }) {
  return paragraphs?.map((text) => (
    <p key={text} className="leading-relaxed text-midnight/80">
      {text}
    </p>
  ));
}

export function ClientForm({
  form,
  contact,
  today,
  action,
}: {
  form: FormDefinition;
  contact: Contact;
  today: string;
  action: (state: SubmitFormState, formData: FormData) => Promise<SubmitFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so keyboard and screen reader users hear it.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ block: "start" });
    } else if (state.status === "error") {
      const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (invalid ?? alertRef.current)?.focus();
    }
  }, [state]);

  // Submitting through onSubmit (rather than the form's `action`) keeps what
  // people typed if the server sends the form back with errors.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  if (state.status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="scroll-mt-28 rounded-3xl border border-indigo/10 bg-white p-8 text-center shadow-sm shadow-indigo/5 focus:outline-none sm:p-12"
      >
        <CircleCheck aria-hidden="true" className="mx-auto h-14 w-14 text-violet" />
        <h2 className="mt-5 font-serif text-3xl font-black text-indigo">Thank you</h2>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-midnight/75">
          Your {form.title.toLowerCase()} has been sent to The Oak Families and Wellness.
        </p>

        {state.score && (
          <div className="mx-auto mt-8 max-w-lg rounded-2xl bg-lilac p-6 text-left">
            <p className="text-sm font-bold tracking-[0.2em] text-violet uppercase">
              Your score
            </p>
            <p className="mt-1 font-serif text-4xl font-black text-indigo">
              {state.score.total}
              <span className="text-xl text-midnight/60"> / {state.score.max}</span>
            </p>
            {state.score.band && (
              <p className="mt-3 leading-relaxed text-midnight/80">{state.score.band}</p>
            )}
          </div>
        )}

        {state.whatsappUrl && (
          <div className="mx-auto mt-8 max-w-lg">
            <p className="text-midnight/75">
              To make sure we see it quickly, please also send a copy to us on WhatsApp.
              It opens with your answers already typed in; just press send.
            </p>
            <ButtonLink
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 px-8 py-4 text-lg"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              Send on WhatsApp
            </ButtonLink>
          </div>
        )}

        <ButtonLink href="/forms" variant="secondary" className="mt-8">
          Back to forms
        </ButtonLink>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative space-y-10 rounded-3xl border border-indigo/10 bg-white p-6 shadow-sm shadow-indigo/5 sm:p-10"
    >
      <p className="text-midnight/70">
        Questions are required unless marked optional. Your answers are private and
        confidential.
      </p>

      {state.status === "error" && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 focus:outline-none"
        >
          <p className="font-semibold">{state.message}</p>
          <p className="mt-1">
            You can also call us on{" "}
            <a href={contact.phone_href} className="font-semibold underline">
              {contact.phone}
            </a>
            .
          </p>
        </div>
      )}

      {form.sections.map((section, i) => (
        <section key={section.title} className="space-y-5">
          <h2 className="font-serif text-xl font-black text-indigo sm:text-2xl">
            <span className="text-violet">{i + 1}.</span> {section.title}
          </h2>
          <Prose paragraphs={section.text} />
          {section.bullets && (
            <ul className="list-disc space-y-1.5 pl-6 leading-relaxed text-midnight/80 marker:text-violet">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
          <Prose paragraphs={section.after} />
          {section.fields?.map((field) => (
            <Field key={field.name} field={field} errors={errors[field.name]} today={today} />
          ))}
        </section>
      ))}

      {form.footnote && <p className="text-sm text-midnight/60">{form.footnote}</p>}

      {/* Spam trap: hidden from people, but bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo px-8 py-4 text-lg font-semibold text-paper transition-colors hover:bg-plum focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet disabled:cursor-wait disabled:opacity-75 sm:w-auto"
      >
        {pending ? (
          <>
            <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-5 w-5" />
            Submit form
          </>
        )}
      </button>
    </form>
  );
}
