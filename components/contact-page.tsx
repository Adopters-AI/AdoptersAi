"use client";

import { useState, useRef, useEffect } from "react";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Container, Label } from "@/components/ui";
import watermarkLogo from "@/assets/watermark.png.png";

const contactDetails: { label: string; value: string; href?: string; green: boolean }[] = [
  { label: "Email", value: "maharma@adoptersai.com", href: "mailto:maharma@adoptersai.com", green: true },
  { label: "Phone", value: "+972 598 00 11 55", href: "tel:+97259800115", green: true },
  { label: "Site", value: "adoptersai.com", href: "https://adoptersai.com", green: true },
  { label: "Address", value: "Ramallah · Palestine", green: false }
];

const faqs = [
  {
    q: "What should I include in the message?",
    a: "A two-week opportunity discovery sprint. We use it to qualify whether a longer engagement makes sense for both sides."
  },
  {
    q: "Can I ask for a Adopters Intelligent demo?",
    a: "Yes — select 'Products' in the Topic field and mention Adopters Intelligent in your message. We'll set up a walkthrough."
  },
  {
    q: "Can I ask about Pulse even though it is coming soon?",
    a: "Absolutely. Share your interest and use case in the message and we'll loop you in when Pulse is available for pilots."
  },
  {
    q: "Can I start with the assessment instead?",
    a: "Yes. The 60-second assessment is a great first step if you're not sure which service fits your context."
  }
];

const inputClass =
  "w-full rounded-xl border border-white/[0.18] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-muted-dark focus:border-brand-green focus:outline-none";
const labelClass = "mb-1.5 block text-[11px] font-black uppercase tracking-[0.1em] text-muted-dark";

function ContactHero() {
  return (
    <section className="hero-grid relative overflow-hidden bg-brand-dark py-20 text-white md:py-[86px]">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 w-[52%] max-w-[800px] select-none opacity-[0.38]"
        src={watermarkLogo.src}
      />
      <Container className="relative z-10">
        <Label dark>Book a call</Label>
        <h1 className="mt-7 max-w-[680px] text-[44px] font-black leading-[1.02] md:text-[68px]">
          Tell us where you are. We'll help you choose the{" "}
          <em className="not-italic text-gradient-green">right AI path.</em>
        </h1>
        <p className="mt-6 max-w-[560px] text-lg leading-8 text-muted-dark">
          Share your context and Adopters will help map the right next step: strategy, product demo,
          build support, or managed operations.
        </p>
      </Container>
    </section>
  );
}

function CustomSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-left text-sm text-white transition focus:border-brand-green focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>{value}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-muted-dark transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-xl border border-white/10 bg-[#0d2820] shadow-xl">
          {options.map((opt) => (
            <li key={opt}>
              <button
                className={`w-full px-4 py-3 text-left text-sm transition hover:bg-white/[0.06] ${
                  value === opt ? "font-bold text-brand-green" : "text-white"
                }`}
                onClick={() => { onChange(opt); setOpen(false); }}
                type="button"
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ContactFormSection() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    topic: "AI Strategy & Roadmap",
    timeline: "Just exploring",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-brand-dark pb-20 pt-2 text-white md:pb-[86px]">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
          {/* Left: Form card */}
          <div className="rounded-[14px] border border-[#163a33] bg-[#0a2e27] p-7 md:p-8">
            {status === "success" ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                  <svg className="h-7 w-7 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-black text-white">Message sent</h3>
                <p className="mt-2 max-w-[320px] text-sm leading-6 text-muted-dark">
                  We received your request and will reply within one business day.
                </p>
                <button
                  className="mt-6 text-sm font-bold text-brand-green transition hover:text-brand-green-bright"
                  onClick={() => { setStatus("idle"); setFields({ name: "", email: "", company: "", country: "", topic: "AI Strategy & Roadmap", timeline: "Just exploring", message: "" }); }}
                  type="button"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Name</label>
                    <input className={inputClass} onChange={set("name")} placeholder="Your name" required type="text" value={fields.name} />
                  </div>
                  <div>
                    <label className={labelClass}>Work Email</label>
                    <input className={inputClass} onChange={set("email")} placeholder="name@company.com" required type="email" value={fields.email} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Company</label>
                    <input className={inputClass} onChange={set("company")} placeholder="Company / institution" type="text" value={fields.company} />
                  </div>
                  <div>
                    <label className={labelClass}>Country</label>
                    <input className={inputClass} onChange={set("country")} placeholder="Country" type="text" value={fields.country} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Topic</label>
                    <CustomSelect
                      onChange={(v) => setFields((f) => ({ ...f, topic: v }))}
                      options={["AI Strategy & Roadmap", "AI Professional Services", "AI Managed Services", "Adopters Intelligent", "Adopters Pulse", "AI Academy", "Assessment Follow-up", "Partnership", "General"]}
                      value={fields.topic}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Timeline</label>
                    <CustomSelect
                      onChange={(v) => setFields((f) => ({ ...f, timeline: v }))}
                      options={["ASAP", "This month", "1–3 months", "3–6 months", "Later this year", "Just exploring"]}
                      value={fields.timeline}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>What are you trying to solve?</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    onChange={set("message")}
                    placeholder="Briefly describe the business problem, data, or AI use case."
                    required
                    rows={8}
                    value={fields.message}
                  />
                </div>
                {status === "error" && (
                  <p className="text-[13px] text-red-400">{errorMsg}</p>
                )}
                <div>
                  <button
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-8 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90 disabled:opacity-60"
                    disabled={status === "loading"}
                    type="submit"
                  >
                    {status === "loading" ? "Sending…" : "Send request →"}
                  </button>
                  <p className="mt-3 text-[12px] text-muted-dark">
                    Expected response within one business day.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Info + help cards */}
          <div className="space-y-5">
            <div className="rounded-[14px] border border-[#163a33] bg-[#0a2e27] p-6">
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-green">
                Contact info
              </span>
              <div className="mt-5 space-y-4">
                {contactDetails.map(({ label, value, href, green }) => (
                  <div className="flex items-start justify-between gap-4" key={label}>
                    <span className="text-[11px] font-black uppercase tracking-[0.1em] text-muted-dark">
                      {label}
                    </span>
                    {href ? (
                      <a
                        className={`text-right text-sm font-semibold transition ${
                          green ? "text-[#25d99d] hover:text-[#5be45e]" : "text-white"
                        }`}
                        href={href}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={`text-right text-sm font-semibold ${green ? "text-[#25d99d]" : "text-white"}`}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[rgba(135,190,175,0.20)] bg-[linear-gradient(98deg,rgba(91,228,94,0.12)_0%,rgba(37,217,157,0.12)_100%)] p-6 shadow-[0_24px_70px_0_rgba(0,0,0,0.18)]">
              <h3 className="text-[17px] font-black leading-snug text-white">
                Not ready to book a call?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-dark">
                Take the 60-second assessment to get a recommended AI path before speaking with the
                team.
              </p>
              <a
                className="mt-5 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-5 py-2.5 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
                href="/assessment"
              >
                Take 60-second assessment →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-paper py-24 text-[#031915] md:py-[92px]">
      <Container>
        <Label>FQA</Label>
        <h2 className="mt-5 max-w-[480px] text-[36px] font-black leading-[1.1] md:text-[44px]">
          Common questions before contacting the team.
        </h2>
        <div className="mt-12 divide-y divide-border-light border-t border-border-light">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                className="flex w-full items-center justify-between gap-8 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                type="button"
              >
                <span className="text-[15px] font-black text-[#031915]">{faq.q}</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-light text-sm text-[#031915]">
                  {openIndex === i ? "×" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-5 pr-14 text-sm leading-6 text-muted-light">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ContactPage() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <div lang="en">
      <SiteHeader active="Contact" allowArabic={false} locale={locale} setLocale={setLocale} />
      <main>
        <ContactHero />
        <ContactFormSection />
        <FaqSection />
      </main>
      <SiteFooter allowArabic={false} locale={locale} />
    </div>
  );
}
