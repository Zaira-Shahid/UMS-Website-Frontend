import { useId, type ComponentProps, type ReactNode, type Ref } from "react";
import { AlertCircle } from "@/components/ui/lucide";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-ums border bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus-visible:outline-none focus:border-blue focus:ring-2 focus:ring-blue/30 disabled:opacity-60";

const state = (invalid: boolean) => (invalid ? "border-[#b3271f]" : "border-navy/25 hover:border-navy/50");

export interface FieldAria {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
  "aria-required": boolean | undefined;
}

/**
 * Label + control + hint + error. The control is rendered through a function so it
 * receives the ids/aria wiring. Errors live in an always-present aria-live region,
 * so they are announced the moment they appear.
 */
export function Field({
  id: idProp,
  label,
  required,
  optional,
  hint,
  hintBelow,
  error,
  className,
  children,
}: {
  id?: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: ReactNode;
  /** Show the hint under the control, so side-by-side fields keep their inputs aligned. */
  hintBelow?: boolean;
  error?: string;
  className?: string;
  children: (aria: FieldAria) => ReactNode;
}) {
  const auto = useId();
  const id = idProp ?? auto;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-[#b3271f]">
            *
          </span>
        )}
        {optional && <span className="ml-2 text-xs font-normal text-muted">Optional</span>}
      </label>
      {hint && !hintBelow && (
        <p id={hintId} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({
          id,
          "aria-invalid": !!error,
          "aria-describedby": [hintId, error ? errorId : undefined].filter(Boolean).join(" ") || undefined,
          "aria-required": required || undefined,
        })}
      </div>
      {hint && hintBelow && (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      <div id={errorId} aria-live="polite">
        {error && (
          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-[#b3271f]">
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

type InputProps = Omit<ComponentProps<"input">, "ref"> & { invalid?: boolean; ref?: Ref<HTMLInputElement> };
export function TextInput({ invalid = false, className, ref, ...props }: InputProps) {
  return <input ref={ref} className={cn(control, state(invalid), "h-12", className)} {...props} />;
}

type AreaProps = Omit<ComponentProps<"textarea">, "ref"> & { invalid?: boolean; ref?: Ref<HTMLTextAreaElement> };
export function TextArea({ invalid = false, className, ref, ...props }: AreaProps) {
  return <textarea ref={ref} className={cn(control, state(invalid), "min-h-32 resize-y py-3", className)} {...props} />;
}

type SelectProps = Omit<ComponentProps<"select">, "ref"> & { invalid?: boolean; ref?: Ref<HTMLSelectElement> };
export function SelectInput({ invalid = false, className, children, ref, ...props }: SelectProps) {
  return (
    <select ref={ref} className={cn(control, state(invalid), "h-12 pr-10", className)} {...props}>
      {children}
    </select>
  );
}

/**
 * Honeypot: invisible to people (off-screen, not focusable, hidden from assistive tech)
 * but bots that fill every input will fill it. The server drops any submission that has a value.
 */
export function Honeypot({ inputRef }: { inputRef: Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Website
        <input ref={inputRef} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** Form-level message (server errors, rate limits, "fix N errors"). */
export function FormAlert({ children, tone = "error" }: { children: ReactNode; tone?: "error" | "info" }) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 rounded-ums border p-4 text-sm",
        tone === "error" ? "border-[#b3271f]/40 bg-[#fdecea] text-[#7a1712]" : "border-blue/40 bg-blue/5 text-navy",
      )}
    >
      <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
