"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { submitForm, storage } from "@/lib/forms/client";
import {
  RFQ_DRAFT_KEY,
  RFQ_STEPS,
  defaultsFor,
  draftHasContent,
  sanitizeDraft,
  type RfqDraft,
  type RfqPreselect,
} from "@/lib/forms/rfq";
import {
  PROJECT_STAGES,
  RFQ_STEP_FIELDS,
  RFQ_UPLOAD_RULES,
  rfqSchema,
  type RfqInput,
  type RfqValues,
} from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";
import { Field, FormAlert, Honeypot, SelectInput, TextArea, TextInput } from "./fields";
import { FilePicker } from "./FilePicker";
import { RfqProgress } from "./RfqProgress";
import { SubmissionSuccess } from "./SubmissionSuccess";

/** Uploads are a feature flag (NEXT_PUBLIC_ENABLE_UPLOADS=true); the API enforces it as well. */
const UPLOADS_ENABLED = process.env.NEXT_PUBLIC_ENABLE_UPLOADS === "true";

const STEP_COPY = [
  { title: "Your contact details", intro: "So we know who to reply to." },
  { title: "About the project", intro: "The building we would be quoting for." },
  { title: "Services required", intro: "Select every discipline you want priced." },
  { title: "Tender details", intro: "Optional, but it helps us plan our response." },
  { title: "Review and submit", intro: "Check everything below, then send your request." },
] as const;

const REVIEW_LAST = RFQ_STEPS.length - 1;
const fieldId = (name: string) => `rfq-${name}`;

type FieldName = keyof RfqValues;

export function RfqForm({ preselect }: { preselect: RfqPreselect }) {
  const form = useForm<RfqInput, unknown, RfqValues>({
    resolver: zodResolver(rfqSchema),
    defaultValues: defaultsFor(preselect),
    mode: "onTouched",
    shouldFocusError: false,
  });
  const { register, watch, setValue, getValues, trigger, getFieldState, setError, reset, formState } = form;
  const errors = formState.errors;

  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);
  const [draftOffer, setDraftOffer] = useState<RfqDraft | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | undefined>();
  const [summary, setSummary] = useState<string | null>(null);
  const [formError, setFormError] = useState<{ message: string; tone: "error" | "info" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [today, setToday] = useState("");
  const [focusId, setFocusId] = useState<string | null>(null);

  const heading = useRef<HTMLHeadingElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const firstRender = useRef(true);

  /* ── Mount: today's date (avoids a server/client mismatch) and any saved draft ── */
  useEffect(() => {
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    try {
      const raw = storage.get(RFQ_DRAFT_KEY);
      const draft = raw ? sanitizeDraft(JSON.parse(raw)) : null;
      if (draft && draftHasContent(draft)) setDraftOffer(draft);
    } catch {
      storage.remove(RFQ_DRAFT_KEY); // corrupt JSON
    }
  }, []);

  /* ── Autosave (debounced). Attachments are never stored. ── */
  const saveDraft = useCallback(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const draft: RfqDraft = {
        values: getValues(),
        step: Math.min(stepRef.current, REVIEW_LAST - 1),
        savedAt: Date.now(),
      };
      if (draftHasContent(draft)) storage.set(RFQ_DRAFT_KEY, JSON.stringify(draft));
      else storage.remove(RFQ_DRAFT_KEY);
    }, 400);
  }, [getValues]);

  useEffect(() => {
    if (reference) return;
    const sub = watch(() => saveDraft());
    return () => {
      sub.unsubscribe();
      clearTimeout(saveTimer.current);
    };
  }, [watch, saveDraft, reference]);

  /* ── Focus: step heading on step change, then any explicit target ── */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current?.focus();
  }, [step]);

  useEffect(() => {
    if (!focusId) return;
    document.getElementById(focusId)?.focus();
    setFocusId(null);
  }, [focusId, step]);

  /* ── Draft banner actions ── */
  const resumeDraft = () => {
    if (!draftOffer) return;
    const v = draftOffer.values;
    reset({
      ...defaultsFor(preselect),
      ...v,
      services: [...new Set([...(v.services ?? []), ...preselect.services])],
      sector: v.sector || (preselect.sector ?? ""),
    } as RfqValues);
    setStep(draftOffer.step);
    setDraftOffer(null);
  };
  const discardDraft = () => {
    storage.remove(RFQ_DRAFT_KEY);
    setDraftOffer(null);
  };

  /* ── Validation helpers ── */
  const firstErrorField = (names: readonly FieldName[]) => names.find((n) => getFieldState(n).error);
  const countErrors = (names: readonly FieldName[]) => names.filter((n) => getFieldState(n).error).length;

  const reportErrors = (names: readonly FieldName[]) => {
    const n = countErrors(names);
    setSummary(`Please fix ${n} ${n === 1 ? "error" : "errors"} before continuing.`);
    const first = firstErrorField(names);
    if (first) setFocusId(fieldId(first));
  };

  const next = async () => {
    const names = RFQ_STEP_FIELDS[step] as readonly FieldName[];
    const ok = names.length === 0 ? true : await trigger([...names], { shouldFocus: false });
    if (!ok) return reportErrors(names);
    setSummary(null);
    setStep(step + 1);
  };

  const goTo = (n: number) => {
    setSummary(null);
    setFormError(null);
    setStep(n);
  };

  const toggleService = (slug: RfqValues["services"][number]) => {
    const cur = getValues("services");
    const nextList = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    setValue("services", nextList, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  /* ── Submit ── */
  const submit = async () => {
    setFormError(null);
    const ok = await trigger(undefined, { shouldFocus: false });
    if (!ok) {
      const badStep = RFQ_STEP_FIELDS.findIndex((names) => names.some((n) => getFieldState(n as FieldName).error));
      setStep(badStep === -1 ? 0 : badStep);
      reportErrors(RFQ_STEP_FIELDS[badStep === -1 ? 0 : badStep] as readonly FieldName[]);
      return;
    }

    setSubmitting(true);
    const fd = new FormData();
    fd.set("payload", JSON.stringify(getValues()));
    fd.set("website", honeypot.current?.value ?? "");
    if (UPLOADS_ENABLED) files.forEach((f) => fd.append("files", f));
    const res = await submitForm("/api/rfq", fd);
    setSubmitting(false);

    if (res.ok) {
      storage.remove(RFQ_DRAFT_KEY);
      setReference(res.reference);
      return;
    }
    if (res.kind === "validation") {
      const known = new Set<string>(RFQ_STEP_FIELDS.flat());
      let target = REVIEW_LAST;
      let other: string | undefined;
      for (const [k, message] of Object.entries(res.errors)) {
        if (known.has(k)) {
          setError(k as FieldName, { type: "server", message });
          target = Math.min(target, RFQ_STEP_FIELDS.findIndex((names) => (names as readonly string[]).includes(k)));
        } else if (k === "files") {
          setFileError(message);
          target = Math.min(target, 3);
        } else other = message;
      }
      setStep(target);
      setSummary("The server could not accept some details. Please review the highlighted fields.");
      if (other) setFormError({ message: other, tone: "error" });
      const first = Object.keys(res.errors).find((k) => known.has(k));
      setFocusId(first ? fieldId(first) : fieldId("files"));
      return;
    }
    setFormError({ message: res.message, tone: "error" });
  };

  /* ── Success ── */
  if (reference) {
    return (
      <SubmissionSuccess
        title="Request received"
        intro="Thank you. Your quote request is with the UMS team. A confirmation has been sent to your email address."
        reference={reference}
      >
        <h3 className="mt-8 font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">What happens next</h3>
        <ol className="mt-4 space-y-3">
          {[
            "We review your brief and the services you selected.",
            "If we need anything else, such as drawings or a BOQ, we contact you using the details you gave.",
            "We prepare your quotation and send it to you. Please quote your reference in any correspondence.",
          ].map((t, i) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">Back to home</Button>
          <Button href="/services" variant="outline">Explore services</Button>
        </div>
      </SubmissionSuccess>
    );
  }

  const values = watch();
  const err = (n: FieldName) => errors[n]?.message as string | undefined;

  return (
    <div className="space-y-5">
      {preselect.project && (
        <p className="border-l-4 border-blue bg-blue/5 px-4 py-3 text-navy">
          Enquiry related to{" "}
          <Link href={`/projects/${preselect.project.slug}`} className="font-semibold underline underline-offset-4 hover:text-blue">
            {preselect.project.name}
          </Link>
          .
        </p>
      )}

      {draftOffer && (
        <div role="region" aria-label="Saved draft" className="flex flex-col gap-3 border border-blue/40 bg-blue/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-navy">
            <strong className="font-semibold">You have a saved draft</strong> from{" "}
            {new Date(draftOffer.savedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}.
          </p>
          <div className="flex gap-3">
            <Button type="button" size="sm" variant="primary" onClick={resumeDraft}>
              Resume draft
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={discardDraft}>
              Start fresh
            </Button>
          </div>
        </div>
      )}

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void (step < REVIEW_LAST ? next() : submit());
        }}
        className="relative border border-line bg-white"
        aria-label="Request a quote"
      >
        <RfqProgress current={step} onGo={goTo} />

        <div className="p-5 sm:p-8">
          <h2 ref={heading} tabIndex={-1} className="focus-quiet text-[1.75rem] text-navy sm:text-[2rem]">
            {STEP_COPY[step].title}
          </h2>
          <p className="mt-2 text-muted">{STEP_COPY[step].intro}</p>
          <p className="mt-1 text-sm text-muted">
            <span aria-hidden className="text-[#b3271f]">*</span> Required field
          </p>

          {/* Announced politely whenever it changes */}
          <div aria-live="polite" className="mt-5 empty:hidden">
            {summary && <FormAlert>{summary}</FormAlert>}
          </div>

          <div className="mt-6">
            {step === 0 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={fieldId("name")} label="Full name" required error={err("name")}>
                  {(a) => <TextInput {...a} {...register("name")} invalid={!!errors.name} autoComplete="name" />}
                </Field>
                <Field id={fieldId("company")} label="Company" optional error={err("company")}>
                  {(a) => <TextInput {...a} {...register("company")} invalid={!!errors.company} autoComplete="organization" />}
                </Field>
                <Field id={fieldId("email")} label="Email address" required error={err("email")}>
                  {(a) => <TextInput {...a} {...register("email")} invalid={!!errors.email} type="email" inputMode="email" autoComplete="email" />}
                </Field>
                <Field id={fieldId("phone")} label="Phone number" required hintBelow hint="Include the country code." error={err("phone")}>
                  {(a) => <TextInput {...a} {...register("phone")} invalid={!!errors.phone} type="tel" inputMode="tel" autoComplete="tel" />}
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={fieldId("projectName")} label="Project name" required className="sm:col-span-2" error={err("projectName")}>
                  {(a) => <TextInput {...a} {...register("projectName")} invalid={!!errors.projectName} />}
                </Field>
                <Field id={fieldId("city")} label="City" required error={err("city")}>
                  {(a) => <TextInput {...a} {...register("city")} invalid={!!errors.city} autoComplete="address-level2" />}
                </Field>
                <Field id={fieldId("sector")} label="Sector" required error={err("sector")}>
                  {(a) => (
                    <SelectInput {...a} {...register("sector")} invalid={!!errors.sector}>
                      <option value="">Select a sector</option>
                      {industries.map((i) => (
                        <option key={i.slug} value={i.slug}>{i.name}</option>
                      ))}
                    </SelectInput>
                  )}
                </Field>
                <Field id={fieldId("stage")} label="Project stage" required className="sm:col-span-2" error={err("stage")}>
                  {(a) => (
                    <SelectInput {...a} {...register("stage")} invalid={!!errors.stage}>
                      <option value="">Select the current stage</option>
                      {PROJECT_STAGES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </SelectInput>
                  )}
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <fieldset aria-describedby={`${fieldId("services")}-error`}>
                  <legend className="text-sm font-semibold text-navy">
                    Services <span aria-hidden className="text-[#b3271f]">*</span>
                    <span className="ml-2 text-xs font-normal text-muted">Select all that apply</span>
                  </legend>
                  {preselect.services.length > 0 && (
                    <p className="mt-1 text-sm text-muted">Pre-selected from the page you came from. Change them if you like.</p>
                  )}
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {services.map((s, i) => {
                      const checked = values.services?.includes(s.slug);
                      const fire = s.accent === "fire";
                      return (
                        <label
                          key={s.slug}
                          className={cn(
                            "flex cursor-pointer items-start gap-3 rounded-ums border p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue",
                            checked ? (fire ? "border-fire bg-fire/5" : "border-navy bg-offwhite") : "border-navy/25 hover:border-navy/60",
                          )}
                        >
                          <input
                            type="checkbox"
                            id={i === 0 ? fieldId("services") : undefined}
                            className="peer sr-only"
                            checked={!!checked}
                            onChange={() => toggleService(s.slug)}
                            aria-invalid={!!errors.services}
                          />
                          <span
                            aria-hidden
                            className={cn(
                              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border-2 transition-colors",
                              checked ? (fire ? "border-fire bg-fire text-white" : "border-navy bg-navy text-white") : "border-navy/40",
                            )}
                          >
                            {checked && <Check className="size-3.5" />}
                          </span>
                          <span>
                            <span className="block font-heading text-base font-semibold uppercase tracking-[0.04em] text-navy">{s.shortName}</span>
                            <span className="mt-0.5 block text-sm text-muted">{s.tagline}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <div id={`${fieldId("services")}-error`} aria-live="polite">
                    {err("services") && <p className="mt-3 text-sm font-medium text-[#b3271f]">{err("services")}</p>}
                  </div>
                </fieldset>

                <Field id={fieldId("scope")} label="Scope description" optional hint="Describe the building, the systems involved and anything we should know. Up to 2000 characters." error={err("scope")}>
                  {(a) => <TextArea {...a} {...register("scope")} invalid={!!errors.scope} rows={6} />}
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <Field id={fieldId("deadline")} label="Tender / submission deadline" optional hint="The date by which you need our quotation." error={err("deadline")} className="max-w-xs">
                  {(a) => <TextInput {...a} {...register("deadline")} invalid={!!errors.deadline} type="date" min={today || undefined} />}
                </Field>

                {UPLOADS_ENABLED ? (
                  <Field
                    id={fieldId("files")}
                    label="BOQ and drawings"
                    optional
                    hint={`PDF, DWG or ZIP. Up to ${RFQ_UPLOAD_RULES.maxFiles} files, 10 MB each. Attachments are not kept in saved drafts.`}
                    error={fileError}
                  >
                    {(a) => (
                      <FilePicker aria={a} rules={RFQ_UPLOAD_RULES} files={files} onChange={setFiles} onError={setFileError} />
                    )}
                  </Field>
                ) : (
                  <p className="border border-dashed border-line p-4 text-sm text-muted">
                    You can send drawings and your BOQ when we reply to your request.
                  </p>
                )}
              </div>
            )}

            {step === REVIEW_LAST && (
              <div className="space-y-6">
                <ReviewSection title="Contact" onEdit={() => goTo(0)} rows={[
                  ["Name", values.name],
                  ["Company", values.company],
                  ["Email", values.email],
                  ["Phone", values.phone],
                ]} />
                <ReviewSection title="Project" onEdit={() => goTo(1)} rows={[
                  ["Project", values.projectName],
                  ["City", values.city],
                  ["Sector", industries.find((i) => i.slug === values.sector)?.name],
                  ["Stage", PROJECT_STAGES.find((s) => s.value === values.stage)?.label],
                  ...(preselect.project ? ([["Related to", preselect.project.name]] as [string, string][]) : []),
                ]} />
                <ReviewSection title="Services" onEdit={() => goTo(2)} rows={[
                  ["Services", (values.services ?? []).map((s) => services.find((x) => x.slug === s)?.name).filter(Boolean).join(", ")],
                  ["Scope", values.scope],
                ]} />
                <ReviewSection title="Tender" onEdit={() => goTo(3)} rows={[
                  ["Deadline", values.deadline],
                  ...(UPLOADS_ENABLED ? ([["Attachments", files.map((f) => f.name).join(", ")]] as [string, string][]) : []),
                ]} />
                <p className="text-sm text-muted">
                  By submitting you agree that UMS may contact you about this request using the details above.
                </p>
              </div>
            )}
          </div>

          {formError && (
            <div className="mt-6">
              <FormAlert tone={formError.tone}>{formError.message}</FormAlert>
            </div>
          )}

          <Honeypot inputRef={honeypot} />

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
            {step > 0 ? (
              <Button type="button" variant="outline" onClick={() => goTo(step - 1)}>
                <span className="inline-flex items-center gap-2"><ArrowLeft aria-hidden className="size-4" /> Back</span>
              </Button>
            ) : (
              <span />
            )}
            {step < REVIEW_LAST ? (
              <Button type="submit" variant="primary">
                <span className="inline-flex items-center gap-2">Next <ArrowRight aria-hidden className="size-4" /></span>
              </Button>
            ) : (
              <Button type="submit" variant="primary" disabled={submitting} aria-busy={submitting}>
                {submitting ? "Sending…" : "Submit request"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function ReviewSection({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, string | undefined][];
  onEdit: () => void;
}) {
  return (
    <section aria-label={title} className="border border-line">
      <div className="flex items-center justify-between border-b border-line bg-offwhite px-4 py-2">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${title.toLowerCase()} details`}
          className="text-sm font-medium text-blue underline-offset-4 hover:underline"
        >
          Edit
        </button>
      </div>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[9rem_1fr]">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="whitespace-pre-wrap break-words text-ink">{v?.trim() ? v : <span className="text-muted">Not provided</span>}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
