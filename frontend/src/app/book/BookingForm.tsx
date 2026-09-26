"use client";

import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import type { BookingOptions, Contact } from "@/lib/api";
import { requestBooking, type BookingFormState } from "./actions";

const initialState: BookingFormState = { status: "idle" };

const inputClasses =
  "mt-2 block w-full rounded-xl border border-indigo/20 bg-white px-4 py-3 text-midnight shadow-sm shadow-indigo/5 transition placeholder:text-midnight/40 focus:border-violet focus:ring-2 focus:ring-violet/25 focus:outline-none aria-[invalid=true]:border-red-600 aria-[invalid=true]:ring-red-600/15";

function Label({
  htmlFor,
  optional = false,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-indigo">
      {children}
      {optional && <span className="font-normal text-midnight/55"> (optional)</span>}
    </label>
  );
}

function FieldError({ name, errors }: { name: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={`${name}-error`} className="mt-2 text-sm font-semibold text-red-700">
      {errors[0]}
    </p>
  );
}

export function BookingForm({
  options,
  contact,
  today,
}: {
  options: BookingOptions;
  contact: Contact;
  today: string;
}) {
  const [state, formAction, pending] = useActionState(requestBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus to the result so keyboard and screen reader users hear it.
  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.focus();
    } else if (state.status === "error") {
      const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      (invalid ?? alertRef.current)?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    const firstName = state.name.split(" ")[0];
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-3xl border border-indigo/10 bg-white p-8 text-center shadow-sm shadow-indigo/5 focus:outline-none sm:p-12"
      >
        <CircleCheck aria-hidden="true" className="mx-auto h-14 w-14 text-violet" />
        <h2 className="mt-5 font-serif text-3xl font-black text-indigo">
          Thank you, {firstName}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-midnight/75">
          Your booking request has been sent to The Oak Wellness.
        </p>
        <p className="mt-3 text-midnight/70">
          You can also call{" "}
          <a href={contact.phone_href} className="font-semibold text-violet underline">
            {contact.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-violet underline">
            {contact.email}
          </a>
          .
        </p>
        <ButtonLink href="/" variant="secondary" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};
  const fieldProps = (name: string) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const defaultTime =
    options.preferred_times.find((option) => option.value === "any")?.value ??
    options.preferred_times[0]?.value;

  return (
    <form
      key={state.status === "error" ? state.attempt : "initial"}
      ref={formRef}
      action={formAction}
      className="relative space-y-6 rounded-3xl border border-indigo/10 bg-white p-6 shadow-sm shadow-indigo/5 sm:p-10"
    >
      <p className="text-midnight/70">All fields are required unless marked optional.</p>

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

      <div>
        <Label htmlFor="name">Full name</Label>
        <input
          {...fieldProps("name")}
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          defaultValue={values.name}
          className={inputClasses}
        />
        <FieldError name="name" errors={errors.name} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <input
            {...fieldProps("phone")}
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
            defaultValue={values.phone}
            className={inputClasses}
          />
          <FieldError name="phone" errors={errors.phone} />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            className={inputClasses}
          />
          <FieldError name="email" errors={errors.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="service">Who is the session for?</Label>
        <select
          {...fieldProps("service")}
          required
          defaultValue={values.service ?? ""}
          className={inputClasses}
        >
          <option value="" disabled>
            Choose an option
          </option>
          {options.services.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldError name="service" errors={errors.service} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="preferred_date" optional>
            Preferred date
          </Label>
          <input
            {...fieldProps("preferred_date")}
            type="date"
            min={today}
            defaultValue={values.preferred_date}
            className={inputClasses}
          />
          <FieldError name="preferred_date" errors={errors.preferred_date} />
        </div>
        <div>
          <Label htmlFor="preferred_time">Preferred time of day</Label>
          <select
            {...fieldProps("preferred_time")}
            defaultValue={values.preferred_time || defaultTime}
            className={inputClasses}
          >
            {options.preferred_times.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FieldError name="preferred_time" errors={errors.preferred_time} />
        </div>
      </div>

      <fieldset aria-describedby={errors.contact_method ? "contact_method-error" : undefined}>
        <legend className="font-semibold text-indigo">How should we contact you?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {options.contact_methods.map((option, i) => (
            <label key={option.value} className="cursor-pointer">
              <input
                type="radio"
                name="contact_method"
                value={option.value}
                defaultChecked={
                  values.contact_method ? values.contact_method === option.value : i === 0
                }
                className="peer sr-only"
              />
              <span className="block rounded-full border border-indigo/20 bg-white px-5 py-2.5 font-semibold text-midnight/80 transition peer-checked:border-indigo peer-checked:bg-indigo peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        <FieldError name="contact_method" errors={errors.contact_method} />
      </fieldset>

      <div>
        <Label htmlFor="message" optional>
          What would you like support with?
        </Label>
        <textarea
          {...fieldProps("message")}
          rows={4}
          maxLength={1000}
          defaultValue={values.message}
          className={inputClasses}
        />
        <FieldError name="message" errors={errors.message} />
      </div>

      {/* Spam trap: hidden from people, but bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex cursor-pointer gap-3">
          <input
            {...fieldProps("consent")}
            type="checkbox"
            required
            defaultChecked={values.consent === "on"}
            className="mt-1 h-5 w-5 shrink-0 accent-indigo"
          />
          <span className="leading-relaxed text-midnight/80">
            I agree that The Oak Wellness may keep these details and contact me about
            my booking.
          </span>
        </label>
        <FieldError name="consent" errors={errors.consent} />
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
            Request booking
          </>
        )}
      </button>
    </form>
  );
}
