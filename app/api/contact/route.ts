import { createHash } from "node:crypto";
import { ContactMessage, contactSubject, contactTopics, formatContactMessage } from "@/lib/contact";

export const runtime = "nodejs";

// A small per-instance abuse limit, in addition to the honeypot and same-origin checks.
// For distributed traffic, use a Vercel Firewall rate-limit rule for /api/contact.
const attempts = new Map<string, { count: number; expires: number }>();
const headers = { "Cache-Control": "no-store" };
const reply = (status: number, error: string) => Response.json({ ok: false, error }, { status, headers });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply(403, "origin");
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415, "content_type");

  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "invalid");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32768) { await reader.cancel(); return reply(413, "too_large"); }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return reply(400, "invalid"); }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return reply(400, "invalid");
  const input = raw as Record<string, unknown>;
  if (typeof input.website !== "string" || input.website.trim()) return reply(400, "invalid");
  const string = (key: string) => typeof input[key] === "string" ? input[key].trim() : "";
  const topic = string("topic");
  const name = string("name");
  const email = string("email");
  const organization = string("organization");
  const message = string("message");
  if (!contactTopics.includes(topic as ContactMessage["topic"]) || !name || name.length > 100 || /[\r\n]/.test(name) ||
      email.length > 254 || !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email) ||
      organization.length > 150 || /[\r\n]/.test(organization) || message.length < 10 || message.length > 5000) return reply(400, "invalid");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return reply(503, "unavailable");

  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const fingerprint = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || email.toLowerCase()).digest("hex");
  const entry = attempts.get(fingerprint) ?? { count: 0, expires: now + 5 * 60 * 1000 };
  if (entry.count >= 5 || attempts.size >= 10000) return reply(429, "rate_limit");
  entry.count += 1;
  attempts.set(fingerprint, entry);

  const data: ContactMessage = { topic: topic as ContactMessage["topic"], name, email, organization, message };
  // Same message retries reuse the provider key; no visitor details are logged or stored here.
  const idempotencyKey = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${idempotencyKey}` },
      body: JSON.stringify({ from, to: ["contact@china79.org"], reply_to: email, subject: `[China79] ${contactSubject[data.topic]}`, text: formatContactMessage(data) }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) return reply(502, "delivery");
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) return reply(502, "delivery");
    return Response.json({ ok: true }, { headers });
  } catch { return reply(502, "delivery"); }
}
