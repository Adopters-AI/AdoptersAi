import { NextResponse } from "next/server";
import { Resend } from "resend";

const recipient = "aelayyan@adoptersai.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const fields = body as Record<string, string>;
  const { name, email, message } = fields;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    return NextResponse.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  const isWaitlist = fields.type === "academy-waitlist";
  const details = Object.entries(
    isWaitlist
      ? { Company: fields.company, Role: fields.role, "Track interest": fields.track, "Learning needs": message }
      : { Company: fields.company, Country: fields.country, Topic: fields.topic, Timeline: fields.timeline, Message: message },
  )
    .map(([label, detail]) => `${label}: ${detail || "Not provided"}`)
    .join("\n");

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [recipient],
    replyTo: email,
    subject: `${isWaitlist ? "AI Academy waitlist" : "New contact request"}: ${name}`,
    text: `${isWaitlist ? "AI Academy waitlist" : "Contact request"} from ${name}\n\nEmail: ${email}\n\n${details}`,
  });

  if (error) {
    console.error("Unable to deliver form email", error);
    return NextResponse.json({ error: "Unable to send your message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}