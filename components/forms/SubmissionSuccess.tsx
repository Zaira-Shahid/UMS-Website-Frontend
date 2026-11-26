"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2 } from "@/components/ui/lucide";

/** Confirmation panel with the reference number. Takes focus so screen readers announce it. */
export function SubmissionSuccess({
  title,
  intro,
  reference,
  children,
}: {
  title: string;
  intro: string;
  reference: string;
  children?: ReactNode;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <div role="status" className="border-t-2 border-blue bg-white p-6 sm:p-10">
      <CheckCircle2 aria-hidden className="size-10 text-blue-700" />
      <h2 ref={heading} tabIndex={-1} className="focus-quiet mt-4 text-navy">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-muted">{intro}</p>
      <dl className="mt-6 inline-block border border-line bg-offwhite px-5 py-4">
        <dt className="font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">Your reference</dt>
        <dd className="mt-1 select-all font-heading text-2xl font-bold tracking-[0.06em] text-navy" data-testid="reference">
          {reference}
        </dd>
      </dl>
      {children}
    </div>
  );
}
