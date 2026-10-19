// POST /api/leak-report: email the Leak Report to the owner and a copy to the team inbox.
// Stores nothing (app-spec "Data the site handles"). Recomputes from raw inputs; never trusts
// figures from the browser.
import { bookingConfig, emailConfig } from "@/lib/env";
import { ownerEmail, sendEmail, teamEmail } from "@/lib/email";
import { computeLeakReport, validate, type RawInput } from "@/lib/leakReport";

const MAX_BODY_BYTES = 10_000;
const MIN_ELAPSED_MS = 3_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value: unknown, max = 100) =>
  typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max) : "";

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "too_large" });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Bots: a filled honeypot or an instant submit gets a normal-looking success and nothing is sent.
  const elapsed = Number(body.elapsedMs);
  if (clean(body.website) !== "" || !Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS) {
    return json(200, { ok: true });
  }

  const email = clean(body.email, 254);
  if (!EMAIL_RE.test(email)) return json(400, { error: "invalid_email" });

  const inputRaw: RawInput = {};
  if (body.input && typeof body.input === "object") {
    for (const [key, value] of Object.entries(body.input as Record<string, unknown>)) {
      inputRaw[key as keyof RawInput] = clean(value, 20);
    }
  }
  const { input, errors } = validate(inputRaw);
  if (!input) return json(400, { error: "invalid_input", fields: Object.keys(errors) });

  const config = emailConfig();
  if (!config.configured) return json(503, { error: "email_not_configured" });

  const contact = { email, firstName: clean(body.firstName), businessName: clean(body.businessName) };
  const result = computeLeakReport(input);
  const booking = bookingConfig();

  try {
    // Team copy first: if it fails, the owner hasn't been emailed yet and a retry duplicates nothing for them.
    const team = teamEmail(input, result, contact, new Date());
    await sendEmail(config.apiKey, { from: config.from, to: config.leadsTo, replyTo: email, ...team });
    const owner = ownerEmail(input, result, contact, booking.configured ? booking.url : undefined);
    await sendEmail(config.apiKey, { from: config.from, to: email, replyTo: config.leadsTo, ...owner });
  } catch (error) {
    console.error("leak-report email failed", error instanceof Error ? error.message : error);
    return json(502, { error: "send_failed" });
  }

  return json(200, { ok: true });
}
