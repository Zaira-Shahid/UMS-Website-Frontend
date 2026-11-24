"use client";

import { useRef } from "react";
import { FileText, X } from "lucide-react";
import { formatBytes, validateUpload, type UploadRules } from "@/lib/forms/schemas";
import type { FieldAria } from "./fields";

/**
 * Native file input (fully keyboard and screen-reader accessible) plus a list of the
 * chosen files with remove buttons. Files are checked against the same rules the server
 * enforces; rejected files produce a message via onError and are not added.
 */
export function FilePicker({
  aria,
  rules,
  files,
  onChange,
  onError,
}: {
  aria: FieldAria;
  rules: UploadRules;
  files: File[];
  onChange: (files: File[]) => void;
  onError: (message: string | undefined) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const multiple = rules.maxFiles > 1;

  const add = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    let next = multiple ? [...files] : [];
    let message: string | undefined;
    for (const f of Array.from(picked)) {
      const problem = validateUpload(f, rules);
      if (problem) {
        message = problem;
        continue;
      }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue;
      if (next.length >= rules.maxFiles) {
        message = `You can attach up to ${rules.maxFiles} file${rules.maxFiles > 1 ? "s" : ""}.`;
        continue;
      }
      next = [...next, f];
    }
    onError(message);
    onChange(next);
    if (input.current) input.current.value = ""; // allow picking the same file again after removing it
  };

  return (
    <div>
      <input
        {...aria}
        ref={input}
        type="file"
        multiple={multiple}
        accept={rules.extensions.join(",")}
        onChange={(e) => add(e.target.files)}
        className="block w-full rounded-ums border border-navy/25 bg-white text-sm text-ink file:mr-4 file:h-12 file:cursor-pointer file:border-0 file:bg-navy file:px-5 file:font-heading file:text-[0.8125rem] file:font-semibold file:uppercase file:tracking-[0.08em] file:text-white hover:file:bg-cyan"
      />
      {files.length > 0 && (
        <ul className="mt-3 space-y-2" aria-label="Selected files">
          {files.map((f) => (
            <li
              key={`${f.name}-${f.size}`}
              className="flex items-center justify-between gap-3 rounded-ums border border-line bg-offwhite px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText aria-hidden className="size-4 shrink-0 text-cyan" />
                <span className="truncate">{f.name}</span>
                <span className="shrink-0 text-muted">{formatBytes(f.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onError(undefined);
                  onChange(files.filter((x) => x !== f));
                }}
                aria-label={`Remove ${f.name}`}
                className="flex size-8 shrink-0 items-center justify-center rounded-ums text-muted transition-colors hover:bg-navy hover:text-white"
              >
                <X aria-hidden className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
