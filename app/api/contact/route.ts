import { NextResponse } from "next/server";
import { Resend } from "resend";

const defaultRecipient = "maharma@adoptersai.com";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-field length caps, so one request can't carry an oversized payload into the inbox.
const maxLengths: Record<string, number> = {
  name: 200,
  email: 254,
  company: 200,
  country: 200,
  role: 200,
  track: 200,
  topic: 200,
  timeline: 200,
  type: 50,
  message: 5000,
};

// Best-effort rate limit: in-memory, so it is per server instance (not shared across
// serverless instances). It blunts casual abuse; it is not a substitute for edge limits.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recentRequests.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    recentRequests.set(key, hits);
    return true;
  }
  hits.push(now);
  recentRequests.set(key, hits);
  if (recentRequests.size > 1000) {
    for (const [k, v] of recentRequests) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) recentRequests.delete(k);
    }
  }
  return false;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || Array.isArray(body) || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Honeypot: the form has a hidden "website" field that people never fill. If it has a
  // value, answer as if it worked so bots get no signal, but send nothing.
  if (typeof raw.website === "string" && raw.website.trim()) {
    return NextResponse.json({ success: true });
  }

  for (const [key, limit] of Object.entries(maxLengths)) {
    const value = raw[key];
    if (value === undefined || value === null) continue;
    if (typeof value !== "string") {
      return NextResponse.json({ error: `Invalid value for ${key}.` }, { status: 400 });
    }
    if (value.length > limit) {
      return NextResponse.json({ error: `${key} is too long (max ${limit} characters).` }, { status: 400 });
    }
  }

  const clientKey = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientKey)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  // Every capped field is now known to be a string (or absent), so narrow the type.
  const fields = raw as Record<string, string | undefined>;
  const recipient = process.env.CONTACT_TO_EMAIL || defaultRecipient;
  const { name, email, message } = fields;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!emailPattern.test(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const isWaitlist = fields.type === "academy-waitlist";
  const title = isWaitlist ? "AI Academy waitlist" : "New contact request";
  const rows: [string, string | undefined][] = [
    ["Name", name],
    ["Email", email],
    ...(isWaitlist
      ? ([
          ["Company", fields.company],
          ["Role", fields.role],
          ["Track interest", fields.track],
          ["Learning needs", message],
        ] as [string, string | undefined][])
      : ([
          ["Company", fields.company],
          ["Country", fields.country],
          ["Topic", fields.topic],
          ["Timeline", fields.timeline],
          ["Message", message],
        ] as [string, string | undefined][])),
  ];

  const text = `${title} from ${name}\n\n${rows.map(([label, value]) => `${label}: ${value?.trim() || "Not provided"}`).join("\n")}`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f4f5f7;font-family:Segoe UI,Arial,sans-serif;color:#1a1a1a;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e3e5e8;">
      <div style="background:#0b1f3a;color:#ffffff;padding:20px 24px;">
        <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:0.7;">Adopters AI website</div>
        <div style="font-size:20px;font-weight:600;margin-top:4px;">${escapeHtml(title)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `<tr>
          <td style="padding:12px 24px;width:140px;vertical-align:top;font-size:13px;color:#6b7280;border-bottom:1px solid #f0f1f3;">${escapeHtml(label)}</td>
          <td style="padding:12px 24px;font-size:15px;border-bottom:1px solid #f0f1f3;white-space:pre-wrap;">${value?.trim() ? escapeHtml(value.trim()) : '<span style="color:#9ca3af;">Not provided</span>'}</td>
        </tr>`,
          )
          .join("")}
      </table>
      <div style="padding:16px 24px;font-size:12px;color:#6b7280;">Reply to this email to answer ${escapeHtml(name)} directly.</div>
    </div>
  </body>
</html>`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [recipient],
    replyTo: email,
    subject: `${title}: ${name.replace(/[\r\n]+/g, " ")}`,
    text,
    html,
  });

  if (error) {
    console.error("Unable to deliver form email", error);
    return NextResponse.json({ error: "Unable to send your message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
