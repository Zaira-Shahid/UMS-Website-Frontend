"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { submitForm } from "@/lib/forms/client";
import { contactSchema, type ContactInput, type ContactValues } from "@/lib/forms/schemas";
import { Field, FormAlert, Honeypot, TextArea, TextInput } from "./fields";
import { SubmissionSuccess } from "./SubmissionSuccess";

const id = (n: string) => `contact-${n}`;

/** General enquiry form → POST /api/contact. Separate from the RFQ. */
export function ContactForm() {
  const form = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
    mode: "onTouched",
  });
  const { register, handleSubmit, setError, setFocus, reset, formState } = form;
  const errors = formState.errors;
  const [reference, setReference] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);

  const onSubmit = handleSubmit(
    async (values) => {
      setFormError(null);
      setSubmitting(true);
      const res = await submitForm("/api/contact", { ...values, website: honeypot.current?.value ?? "" });
      setSubmitting(false);
      if (res.ok) {
        setReference(res.reference);
        reset();
        return;
      }
      if (res.kind === "validation") {
        let first: keyof ContactValues | undefined;
        for (const [k, message] of Object.entries(res.errors)) {
          if (k in values) {
            setError(k as keyof ContactValues, { type: "server", message });
            first ??= k as keyof ContactValues;
          }
        }
        if (first) setFocus(first);
        else setFormError("Please check your details and try again.");
        return;
      }
      setFormError(res.message);
    },
    // Client-side validation failed: move focus to the first invalid field.
    (errs) => {
      const first = Object.keys(errs)[0] as keyof ContactValues | undefined;
      if (first) setFocus(first);
    },
  );

  if (reference) {
    return (
      <SubmissionSuccess
        title="Message received"
        intro="Thank you for getting in touch. The UMS team will read your message and reply. A confirmation has been sent to your email address."
        reference={reference}
      >
        <div className="mt-8">
          <Button type="button" variant="outline" onClick={() => setReference(null)}>
            Send another message
          </Button>
        </div>
      </SubmissionSuccess>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="relative border border-line bg-white">
      <div className="border-t-2 border-navy p-5 sm:p-8">
        <h2 className="text-[1.75rem] text-navy">Send us a message</h2>
        <p className="mt-2 text-muted">
          For a project quotation, use <Link className="font-medium text-cyan underline underline-offset-4" href="/request-a-quote">Request a Quote</Link> instead.
        </p>
        <p className="mt-1 text-sm text-muted">
          <span aria-hidden className="text-[#b3271f]">*</span> Required field
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field id={id("name")} label="Full name" required error={errors.name?.message}>
            {(a) => <TextInput {...a} {...register("name")} invalid={!!errors.name} autoComplete="name" />}
          </Field>
          <Field id={id("email")} label="Email address" required error={errors.email?.message}>
            {(a) => <TextInput {...a} {...register("email")} invalid={!!errors.email} type="email" inputMode="email" autoComplete="email" />}
          </Field>
          <Field id={id("phone")} label="Phone number" optional hintBelow hint="Include the country code." error={errors.phone?.message}>
            {(a) => <TextInput {...a} {...register("phone")} invalid={!!errors.phone} type="tel" inputMode="tel" autoComplete="tel" />}
          </Field>
          <Field id={id("subject")} label="Subject" required error={errors.subject?.message}>
            {(a) => <TextInput {...a} {...register("subject")} invalid={!!errors.subject} />}
          </Field>
          <Field id={id("message")} label="Message" required className="sm:col-span-2" error={errors.message?.message}>
            {(a) => <TextArea {...a} {...register("message")} invalid={!!errors.message} rows={7} />}
          </Field>
        </div>

        {formError && (
          <div className="mt-6">
            <FormAlert>{formError}</FormAlert>
          </div>
        )}

        <Honeypot inputRef={honeypot} />

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">We use your details only to reply to this message.</p>
          <Button type="submit" variant="accent" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  );
}
