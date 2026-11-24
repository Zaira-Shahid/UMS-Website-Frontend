"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email-only "technical notes" sign-up. There is no backend yet: a valid address shows a success
 * toast and nothing is sent. Errors and success are announced through a polite live region.
 */
export function NewsletterForm({ tone = "dark", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const dark = tone === "dark";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(value.trim())) return setState("error");
    setState("done");
    setValue("");
  };

  return (
    <form onSubmit={submit} noValidate className={className}>
      <label htmlFor={id} className={cn("mono-label block", dark ? "text-cyan-300" : "text-[#00608c]")}>
        Technical notes
      </label>
      <div className="mt-2 flex">
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          aria-invalid={state === "error"}
          aria-describedby={`${id}-status`}
          className={cn(
            "h-12 min-w-0 flex-1 border px-4 text-base outline-none transition-colors focus-visible:border-cyan",
            dark
              ? "border-white/25 bg-white/[0.06] text-white placeholder:text-white/45"
              : "border-line bg-white text-ink placeholder:text-muted/70",
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex h-12 w-12 shrink-0 items-center justify-center bg-cyan text-navy-950 transition-colors hover:bg-cyan-300"
        >
          <ArrowRight className="size-5" aria-hidden />
        </button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 text-sm",
          state === "error" ? (dark ? "text-[#ff8a82]" : "text-[#b3271f]") : dark ? "text-cyan-300" : "text-[#00608c]",
        )}
      >
        {state === "error" && "Enter a valid email address."}
        {state === "done" && (
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-4" aria-hidden /> Thanks, you are on the list.
          </span>
        )}
      </p>
    </form>
  );
}
