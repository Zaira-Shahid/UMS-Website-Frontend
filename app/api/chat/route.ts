import { detectService, quoteAction, ruleBasedReply, type ChatLink } from "@/lib/chat/knowledge";
import { streamAnthropic, streamOpenAI, type ChatMessage } from "@/lib/chat/model";
import { guard, json } from "@/lib/server/http";

export const runtime = "nodejs";

const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 8;

/** The links sent with an answer, as a header the widget turns into buttons. */
const actionsHeader = (links: ChatLink[]) => encodeURIComponent(JSON.stringify(links.slice(0, 3)));

const textResponse = (body: BodyInit, links: ChatLink[]) =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Chat-Actions": actionsHeader(links),
      "X-Content-Type-Options": "nosniff",
    },
  });

/**
 * POST /api/chat  { messages: [{ role, content }] }
 * Streams the answer as plain text; suggested links travel in the X-Chat-Actions header.
 * With ANTHROPIC_API_KEY or OPENAI_API_KEY set the answer comes from the model (restricted to the site content, see
 * lib/chat/model.ts); otherwise, or if the model cannot be reached, the rule-based responder answers.
 * Limits: per-IP rate limit, body size cap, message length cap. Messages are never logged or stored.
 */
export async function POST(req: Request) {
  const blocked = guard(req, { route: "chat", max: 30, windowMs: 10 * 60_000, maxBytes: 16 * 1024 });
  if (blocked) return blocked;

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0) return json({ ok: false, error: "Invalid request." }, 400);

  const messages: ChatMessage[] = [];
  for (const m of body.messages.slice(-MAX_HISTORY)) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return json({ ok: false, error: "Invalid request." }, 400);
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (text) messages.push({ role, content: text });
  }
  // The model API needs the conversation to start with the visitor and to end with their question.
  while (messages.length > 0 && messages[0].role !== "user") messages.shift();
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return json({ ok: false, error: "Invalid request." }, 400);

  const rule = () => {
    const reply = ruleBasedReply(last.content);
    return textResponse(reply.text, reply.links);
  };

  const anthropic = process.env.ANTHROPIC_API_KEY;
  const openai = process.env.OPENAI_API_KEY;
  if (!anthropic && !openai) return rule();

  // Buttons known before the answer is written: the detected service and, for quote questions, the quote form.
  const service = detectService(last.content);
  const links: ChatLink[] = [];
  const quote = quoteAction(last.content);
  if (service) links.push({ label: "View service", href: `/services/${service}` });
  if (quote) links.push(quote);

  try {
    const stream = anthropic ? await streamAnthropic(anthropic, messages) : await streamOpenAI(openai!, messages);
    return textResponse(stream, links);
  } catch (err) {
    // Log the failure only, never the visitor's message.
    console.error("[chat] model unavailable, using rule-based answer:", err instanceof Error ? err.message : "unknown error");
    return rule();
  }
}
