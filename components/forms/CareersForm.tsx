"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { careers } from "@/content/careers";
import { submitForm } from "@/lib/forms/client";
import { careersSchema, CV_UPLOAD_RULES, GENERAL_APPLICATION, type CareersInput, type CareersValues } from "@/lib/forms/schemas";
import { Field, FormAlert, Honeypot, SelectInput, TextArea, TextInput } from "./fields";
import { FilePicker } from "./FilePicker";
import { SubmissionSuccess } from "./SubmissionSuccess";

const id = (n: string) => `careers-${n}`;

/** Application form → POST /api/careers. The CV (PDF, 5 MB max) is checked here and again on the server. */
export function CareersForm() {
  const form = useForm<CareersInput, unknown, CareersValues>({
    resolver: zodResolver(careersSchema),
    defaultValues: { name: "", email: "", phone: "", position: GENERAL_APPLICATION, message: "" },
    mode: "onTouched",
  });
  const { register, handleSubmit, setError, setFocus, reset, formState } = form;
  const errors = formState.errors;
  const [cv, setCv] = useState<File[]>([]);
  const [cvError, setCvError] = useState<string | undefined>();
  const [reference, setReference] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);

  const focusCv = () => document.getElementById(id("cv"))?.focus();

  const onSubmit = handleSubmit(
    async (values) => {
      setFormError(null);
      if (cv.length === 0) {
        setCvError("Attach your CV as a PDF.");
        focusCv();
        return;
      }
      setSubmitting(true);
      const fd = new FormData();
      fd.set("payload", JSON.stringify(values));
      fd.set("website", honeypot.current?.value ?? "");
      fd.set("cv", cv[0]);
      const res = await submitForm("/api/careers", fd);
      setSubmitting(false);
      if (res.ok) {
        setReference(res.reference);
        reset();
        setCv([]);
        return;
      }
      if (res.kind === "validation") {
        let first: keyof CareersValues | undefined;
        for (const [k, message] of Object.entries(res.errors)) {
          if (k === "cv") setCvError(message);
          else if (k in values) {
            setError(k as keyof CareersValues, { type: "server", message });
            first ??= k as keyof CareersValues;
          }
        }
        if (first) setFocus(first);
        else if (res.errors.cv) focusCv();
        else setFormError("Please check your details and try again.");
        return;
      }
      setFormError(res.message);
    },
    (errs) => {
      const first = Object.keys(errs)[0] as keyof CareersValues | undefined;
      if (cv.length === 0) setCvError("Attach your CV as a PDF.");
      if (first) setFocus(first);
      else focusCv();
    },
  );

  if (reference) {
    return (
      <SubmissionSuccess
        title="Application received"
        intro="Thank you for applying to UMS. We will be in touch if your profile matches an opening. A confirmation has been sent to your email address."
        reference={reference}
      >
        <div className="mt-8">
          <Button type="button" variant="outline" onClick={() => setReference(null)}>
            Submit another application
          </Button>
        </div>
      </SubmissionSuccess>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Job application" className="relative border border-line bg-white">
      <div className="border-t-2 border-navy p-5 sm:p-8">
        <h2 className="text-[1.75rem] text-navy">Apply to UMS</h2>
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
          <Field id={id("phone")} label="Phone number" required hintBelow hint="Include the country code." error={errors.phone?.message}>
            {(a) => <TextInput {...a} {...register("phone")} invalid={!!errors.phone} type="tel" inputMode="tel" autoComplete="tel" />}
          </Field>
          <Field id={id("position")} label="Position" required error={errors.position?.message}>
            {(a) => (
              <SelectInput {...a} {...register("position")} invalid={!!errors.position}>
                <option value={GENERAL_APPLICATION}>General application</option>
                {careers.map((c) => (
                  <option key={c.slug} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </SelectInput>
            )}
          </Field>
          <Field
            id={id("cv")}
            label="CV"
            required
            className="sm:col-span-2"
            hint="PDF only, up to 5 MB."
            error={cvError}
          >
            {(a) => <FilePicker aria={a} rules={CV_UPLOAD_RULES} files={cv} onChange={setCv} onError={setCvError} />}
          </Field>
          <Field id={id("message")} label="Message" optional className="sm:col-span-2" error={errors.message?.message}>
            {(a) => <TextArea {...a} {...register("message")} invalid={!!errors.message} rows={5} />}
          </Field>
        </div>

        {formError && (
          <div className="mt-6">
            <FormAlert>{formError}</FormAlert>
          </div>
        )}

        <Honeypot inputRef={honeypot} />

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">We use your details only to consider your application.</p>
          <Button type="submit" variant="primary" disabled={submitting} aria-busy={submitting}>
            {submitting ? "Sending…" : "Submit application"}
          </Button>
        </div>
      </div>
    </form>
  );
}
