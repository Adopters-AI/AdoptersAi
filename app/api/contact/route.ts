import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company, country, topic, timeline, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!toEmail || !fromEmail) {
    console.error("Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL env variables");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New contact from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;color:#1a1a1a;">
          <h2 style="margin:0 0 24px;font-size:22px;">New Contact Request</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:140px;vertical-align:top;">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;vertical-align:top;">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee;"><a href="mailto:${email}" style="color:#0d8d6b;">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;vertical-align:top;">Company</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${company}</td></tr>` : ""}
            ${country ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;vertical-align:top;">Country</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${country}</td></tr>` : ""}
            ${topic ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;vertical-align:top;">Topic</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${topic}</td></tr>` : ""}
            ${timeline ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;vertical-align:top;">Timeline</td><td style="padding:10px 0;border-bottom:1px solid #eee;">${timeline}</td></tr>` : ""}
          </table>
          <div style="margin-top:24px;">
            <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
            <p style="margin:0;white-space:pre-wrap;line-height:1.7;background:#f7f7f7;padding:16px;border-radius:8px;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
