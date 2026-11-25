"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MessageCircle, Send, X } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { LogoMark } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

interface ChatLink {
  label: string;
  href: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  links?: ChatLink[];
}

const GREETING = "Hi! How can I help with your project? I'm the UMS Assistant, an automated assistant.";

/** Quick replies: the label shown, and the question it sends. */
const CHIPS = [
  { label: "Our services", question: "What services do you offer?" },
  { label: "Request a quote", question: "How do I request a quote?" },
  { label: "View projects", question: "Show me your projects" },
  { label: "Contact us", question: "How can I contact UMS?" },
];

/** Internal pages the assistant may name in an answer. Only these paths are turned into links. */
const PATH = /(\/(?:services\/[a-z-]+|services|industries|projects\/[a-z-]+|projects|request-a-quote(?:\?service=[a-z-]+)?|contact|about|quality-safety-delivery|insights|careers))(?![\w/-])/g;

function Linkified({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(PATH)) {
    const at = m.index ?? 0;
    parts.push(text.slice(last, at));
    parts.push(
      <Link key={at} href={m[1]} onClick={onNavigate} className="font-semibold text-blue-700 underline underline-offset-2">
        {m[1]}
      </Link>,
    );
    last = at + m[1].length;
  }
  parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Floating assistant (PROJECT_SPEC.md section 7). A round button bottom-right opens a panel (a bottom sheet on phones).
 * Answers come from /api/chat, streamed. Accessible: focus moves in on open and is trapped, Esc minimises, new messages
 * are announced (aria-live), chips and buttons are keyboard-usable. Conversations stay in memory only.
 */
export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState(false);
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const [covering, setCovering] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "assistant", content: GREETING }]);
  const idRef = useRef(1);
  const panel = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);

  const started = messages.some((m) => m.role === "user");

  // One-time "Ask UMS" tooltip per browser session.
  useEffect(() => {
    if (sessionStorage.getItem("ums-chat-tip")) return;
    const show = window.setTimeout(() => setTip(true), 2500);
    const hide = window.setTimeout(() => {
      setTip(false);
      sessionStorage.setItem("ums-chat-tip", "1");
    }, 9000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const minimise = useCallback(() => {
    setOpen(false);
    launcher.current?.focus();
  }, []);

  const close = () => {
    abort.current?.abort();
    setBusy(false);
    setTyping(false);
    setMessages([{ id: 0, role: "assistant", content: GREETING }]);
    setInput("");
    minimise();
  };

  // Focus the input on open.
  useEffect(() => {
    if (!open) return;
    setTip(false);
    sessionStorage.setItem("ums-chat-tip", "1");
    const t = window.setTimeout(() => field.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [messages, typing]);

  // On phones, step aside while the launcher would sit on top of a "Request a Quote" button (or the quote link bar).
  useEffect(() => {
    if (open) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const l = launcher.current?.getBoundingClientRect();
      if (!l || window.innerWidth >= 768) return setCovering(false);
      const pad = 8;
      const hit = [...document.querySelectorAll<HTMLElement>('a[href^="/request-a-quote"], button[type="submit"]')].some((el) => {
        if (el.closest("[role=dialog]")) return false;
        const b = el.getBoundingClientRect();
        return b.width > 0 && b.right > l.left - pad && b.left < l.right + pad && b.bottom > l.top - pad && b.top < l.bottom + pad;
      });
      setCovering(hit);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [open, pathname]);

  // Close the panel when the visitor moves to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      minimise();
      return;
    }
    if (e.key !== "Tab") return;
    const nodes = panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const lastNode = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastNode.focus();
    } else if (!e.shiftKey && document.activeElement === lastNode) {
      e.preventDefault();
      first.focus();
    }
  };

  const send = async (raw: string) => {
    const text = raw.trim().slice(0, 500);
    if (!text || busy) return;
    const history = [...messages, { id: idRef.current++, role: "user" as const, content: text }];
    const replyId = idRef.current++;
    setMessages([...history]);
    setInput("");
    setBusy(true);
    setTyping(true);

    const controller = new AbortController();
    abort.current = controller;
    const fail = (content: string) => {
      setTyping(false);
      setMessages([...history, { id: replyId, role: "assistant", content, links: [{ label: "Contact us", href: "/contact" }] }]);
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (res.status === 429) {
        fail("You're sending messages quickly. Please wait a moment and try again.");
        return;
      }
      if (!res.ok || !res.body) {
        fail("Sorry, I couldn't answer just now. Please use the contact page and our team will help.");
        return;
      }
      let links: ChatLink[] = [];
      try {
        links = JSON.parse(decodeURIComponent(res.headers.get("X-Chat-Actions") ?? "[]"));
      } catch {
        links = [];
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setTyping(false);
        setMessages([...history, { id: replyId, role: "assistant", content: answer, links }]);
      }
      if (!answer.trim()) fail("Sorry, I couldn't answer just now. Please use the contact page and our team will help.");
      else setMessages([...history, { id: replyId, role: "assistant", content: answer.trim(), links }]);
    } catch (err) {
      if ((err as { name?: string }).name !== "AbortError") fail("Sorry, I couldn't reach the assistant. Please check your connection or use the contact page.");
    } finally {
      setBusy(false);
      setTyping(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  // On phones the launcher is hidden on the quote page, where it could cover the form's buttons.
  const hideOnPhone = pathname === "/request-a-quote";

  return (
    <>
      {open && <div aria-hidden onClick={minimise} className="fixed inset-0 z-[54] bg-navy-950/40 md:hidden" />}

      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="UMS Assistant"
          onKeyDown={onKeyDown}
          className="fixed inset-x-0 bottom-0 z-[55] flex h-[85svh] flex-col overflow-hidden rounded-t-2xl bg-white text-navy shadow-[0_-12px_40px_-12px_rgb(3_33_57/0.45)] md:inset-x-auto md:bottom-24 md:right-5 md:h-[560px] md:max-h-[calc(100svh-7rem)] md:w-[380px] md:rounded-2xl md:shadow-[0_24px_60px_-16px_rgb(3_33_57/0.5)]"
        >
          <header className="flex items-center gap-3 bg-navy-950 px-4 py-3 text-white">
            <span className="flex h-9 items-center rounded-lg bg-white px-2">
              <LogoMark className="h-6 w-auto" />
            </span>
            <p className="flex-1 font-heading text-base font-bold">UMS Assistant</p>
            <button type="button" onClick={minimise} aria-label="Minimise chat" className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/15">
              <ChevronDown aria-hidden className="size-5" />
            </button>
            <button type="button" onClick={close} aria-label="Close chat and clear the conversation" className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-white/15">
              <X aria-hidden className="size-5" />
            </button>
          </header>

          <div ref={list} role="log" aria-live="polite" aria-relevant="additions text" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] leading-snug", m.role === "user" ? "rounded-br-md bg-blue-700 text-white" : "rounded-bl-md bg-sky-50 text-navy")}>
                  <p className="whitespace-pre-line">{m.role === "assistant" ? <Linkified text={m.content} onNavigate={minimise} /> : m.content}</p>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {m.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={minimise}
                          className="rounded-lg bg-blue-700 px-3 py-1.5 font-heading text-sm font-bold text-white transition-colors hover:bg-blue-800"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {!started && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => void send(c.question)}
                    className="rounded-full border border-blue-700 bg-white px-3.5 py-1.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div className="flex justify-start" aria-hidden>
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-sky-50 px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2 animate-pulse rounded-full bg-navy/50 motion-reduce:animate-none" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            <p className="sr-only" aria-live="polite">
              {typing ? "UMS Assistant is typing" : ""}
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border px-3 py-3">
            <label htmlFor="ums-chat-input" className="sr-only">
              Type your question
            </label>
            <input
              ref={field}
              id="ums-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder="Ask about our services…"
              className="min-w-0 flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-base text-navy placeholder:text-muted focus-visible:border-blue-700"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-800 disabled:opacity-50"
            >
              <Send aria-hidden className="size-5" />
            </button>
          </form>
          <p className="px-4 pb-3 text-center text-xs text-muted">
            AI answers may be inaccurate. For tenders,{" "}
            <Link href="/contact" onClick={minimise} className="underline underline-offset-2">
              contact our team
            </Link>
            .
          </p>
        </div>
      )}

      <div className={cn("fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 transition-opacity md:bottom-5 md:right-5 motion-reduce:transition-none", hideOnPhone && "max-md:hidden", covering && "max-md:pointer-events-none max-md:opacity-0")}>
        {tip && !open && (
          <p aria-hidden className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
            Ask UMS
            <span className="absolute -bottom-1 right-5 size-2 rotate-45 bg-navy-950" />
          </p>
        )}
        <button
          ref={launcher}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Minimise UMS Assistant chat" : "Open UMS Assistant chat"}
          aria-expanded={open}
          className="flex size-12 items-center justify-center rounded-full bg-blue-700 text-white shadow-[0_10px_24px_-6px_rgb(3_33_57/0.55)] transition-colors hover:bg-blue-800 md:size-14"
        >
          {open ? <ChevronDown aria-hidden className="size-6" /> : <MessageCircle aria-hidden className="size-6 md:size-7" />}
        </button>
      </div>
    </>
  );
}
