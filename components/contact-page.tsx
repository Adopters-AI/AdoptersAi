"use client";

import { useState, useRef, useEffect } from "react";
import { AnimateIn } from "@/components/animate-in";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import { Container, Label } from "@/components/ui";
import watermarkLogo from "@/assets/watermark.png.png";

const contactDetailsEn: { label: string; value: string; href?: string; green: boolean }[] = [
  { label: "Email", value: "maharma@adoptersai.com", href: "mailto:maharma@adoptersai.com", green: true },
  { label: "Phone", value: "+972 598 00 11 55", href: "tel:+97259800115", green: true },
  { label: "Site", value: "adoptersai.com", href: "https://adoptersai.com", green: true },
  { label: "Address", value: "Ramallah · Palestine", green: false }
];

const contactDetailsAr: { label: string; value: string; href?: string; green: boolean }[] = [
  { label: "البريد الإلكتروني", value: "maharma@adoptersai.com", href: "mailto:maharma@adoptersai.com", green: true },
  { label: "رقم الهاتف", value: "+972 598 00 11 55", href: "tel:+97259800115", green: true },
  { label: "الموقع الإلكتروني", value: "adoptersai.com", href: "https://adoptersai.com", green: true },
  { label: "العنوان", value: "رام الله · فلسطين", green: false }
];

const faqsEn = [
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

const faqsAr = [
  {
    q: "ما المعلومات التي يُفضل تضمينها في الرسالة؟",
    a: "وصف مختصر للتحدي أو الفرصة التي تسعى لمعالجتها، والأهداف المرجوة، وأي معلومات حول البيانات أو الأنظمة الحالية. يساعد ذلك الفريق على فهم احتياجاتك وتوجيهك إلى المسار الأنسب."
  },
  {
    q: "هل يمكنني طلب عرض توضيحي لـ Adopters Intelligent؟",
    a: "نعم — اختر 'المنتجات' في حقل الموضوع واذكر Adopters Intelligent في رسالتك، وسنقوم بترتيب جلسة استعراض للمنتج."
  },
  {
    q: "هل يمكنني الاستفسار عن Pulse رغم أنه لم يُطلق بعد؟",
    a: "بالتأكيد. شاركنا اهتمامك وحالة الاستخدام في الرسالة، وسنتواصل معك فور توفر Pulse للتجربة."
  },
  {
    q: "هل يمكنني البدء بالتقييم أولًا؟",
    a: "نعم. يُعد التقييم السريع (60 ثانية) نقطة انطلاق ممتازة إذا لم تكن متأكدًا من الخدمة الأنسب لوضعك."
  }
];

const topicOptionsEn = ["AI Strategy & Roadmap", "AI Professional Services", "AI Managed Services", "Adopters Intelligent", "Adopters Pulse", "AI Academy", "Assessment Follow-up", "Partnership", "General"];
const topicOptionsAr = ["إستراتيجية الذكاء الاصطناعي", "الخدمات المهنية للذكاء الاصطناعي", "الخدمات المُدارة للذكاء الاصطناعي", "Adopters Intelligent", "Adopters Pulse", "أكاديمية الذكاء الاصطناعي", "متابعة التقييم", "شراكة", "استفسار عام"];

const timelineOptionsEn = ["ASAP", "This month", "1–3 months", "3–6 months", "Later this year", "Just exploring"];
const timelineOptionsAr = ["في أقرب وقت ممكن", "خلال هذا الشهر", "1–3 أشهر", "3–6 أشهر", "لاحقًا هذا العام", "في طور الاستكشاف والبحث"];

const pageCopy = {
  en: {
    heroLabel: "Book a call",
    heroTitleBefore: "Tell us where you are. We'll help you choose the ",
    heroTitleAccent: "right AI path.",
    heroBody: "Share your context and Adopters will help map the right next step: strategy, product demo, build support, or managed operations.",
    name: "Name",
    namePlaceholder: "Your name",
    workEmail: "Work Email",
    emailPlaceholder: "name@company.com",
    company: "Company",
    companyPlaceholder: "Company / institution",
    country: "Country",
    countryPlaceholder: "Country",
    topic: "Topic",
    timeline: "Timeline",
    problem: "What are you trying to solve?",
    problemPlaceholder: "Briefly describe the business problem, data, or AI use case.",
    send: "Send request",
    sending: "Sending…",
    responseTime: "Expected response within one business day.",
    successTitle: "Message sent",
    successBody: "We received your request and will reply within one business day.",
    sendAnother: "Send another message",
    contactInfo: "Contact info",
    notReadyTitle: "Not ready to book a call?",
    notReadyBody: "Take the 60-second assessment to get a recommended AI path before speaking with the team.",
    notReadyCta: "Take 60-second assessment",
    faqLabel: "FAQ",
    faqTitle: "Common questions before contacting the team."
  },
  ar: {
    heroLabel: "احجز موعد اتصال",
    heroTitleBefore: "أخبرنا موقعك اليوم، وسنساعدك في اختيار ",
    heroTitleAccent: "المسار الأنسب للذكاء الاصطناعي.",
    heroBody: "شاركنا نبذة عن احتياجاتك وتحدياتك الحالية، وسيساعدك فريق Adopters في تحديد الخطوة التالية المناسبة، سواء كانت وضع استراتيجية، أو استعراض منتج، أو دعم التنفيذ والبناء، أو إدارة وتشغيل حلول الذكاء الاصطناعي.",
    name: "الاسم",
    namePlaceholder: "اسمك",
    workEmail: "البريد الإلكتروني للعمل",
    emailPlaceholder: "name@company.com",
    company: "الشركة",
    companyPlaceholder: "الشركة / المؤسسة",
    country: "الدولة",
    countryPlaceholder: "الدولة",
    topic: "موضوع الاتصال",
    timeline: "الإطار الزمني المتوقع",
    problem: "ما هو التحدي التشغيلي الذي تسعى لحله؟",
    problemPlaceholder: "يُرجى تقديم وصف موجز لمشكلة العمل، أو طبيعة البيانات، أو حالة استخدام الذكاء الاصطناعي المستهدفة.",
    send: "ارسال الطلب",
    sending: "جارٍ الإرسال…",
    responseTime: "الرد المتوقع خلال يوم عمل واحد.",
    successTitle: "تم إرسال الرسالة",
    successBody: "استلمنا طلبك وسنرد عليك خلال يوم عمل واحد.",
    sendAnother: "إرسال رسالة أخرى",
    contactInfo: "معلومات التواصل",
    notReadyTitle: "لست مستعدًا لحجز مكالمة بعد؟",
    notReadyBody: "أجب عن تقييم الذكاء الاصطناعي السريع لمدة 60 ثانية للحصول على توصية بالمسار الأنسب قبل التواصل مع الفريق.",
    notReadyCta: "ابدأ التقييم السريع (60 ثانية)",
    faqLabel: "الأسئلة الشائعة",
    faqTitle: "الأسئلة الأكثر تكراراً قبل التواصل مع فريق العمل."
  }
} as const;

const inputClass =
  "w-full rounded-xl border border-white/[0.18] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-muted-dark focus:border-brand-green focus:outline-none";
const labelClass = "mb-1.5 block text-[11px] font-black uppercase tracking-[0.1em] text-muted-dark";

function ContactHero({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";

  return (
    <section className="hero-grid relative bg-brand-dark py-20 text-white md:py-[86px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          alt=""
          aria-hidden="true"
          className={`absolute top-0 w-[52%] max-w-[800px] select-none opacity-[0.38] ${isAr ? "left-0 -scale-x-100" : "right-0"}`}
          src={watermarkLogo.src}
        />
      </div>
      <Container className={`relative z-10 ${isAr ? "text-right" : ""}`}>
        <AnimateIn variant="up">
          <Label dark>{content.heroLabel}</Label>
          <h1
            className={`mt-7 max-w-[680px] font-black ${
              isAr ? "text-[38px] md:text-[56px]" : "text-[44px] leading-[1.02] md:text-[68px]"
            }`}
          >
            {content.heroTitleBefore}
            <em className="not-italic text-gradient-green">{content.heroTitleAccent}</em>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-8 text-muted-dark">{content.heroBody}</p>
        </AnimateIn>
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
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-start text-sm text-white transition focus:border-brand-green focus:outline-none"
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
                className={`w-full px-4 py-3 text-start text-sm transition hover:bg-white/[0.06] ${
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

function ContactFormSection({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";
  const topicOptions = isAr ? topicOptionsAr : topicOptionsEn;
  const timelineOptions = isAr ? timelineOptionsAr : timelineOptionsEn;

  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    topic: topicOptionsEn[0],
    timeline: timelineOptionsEn[5],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setFields((f) => ({
      ...f,
      topic: isAr ? topicOptionsAr[topicOptionsEn.indexOf(f.topic)] ?? topicOptionsAr[0] : topicOptionsEn[topicOptionsAr.indexOf(f.topic)] ?? f.topic,
      timeline: isAr ? timelineOptionsAr[timelineOptionsEn.indexOf(f.timeline)] ?? timelineOptionsAr[5] : timelineOptionsEn[timelineOptionsAr.indexOf(f.timeline)] ?? f.timeline
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAr]);

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
        <div className={`grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8 ${isAr ? "text-right" : ""}`}>
          {/* Form card */}
          <AnimateIn variant="left">
          <div className="rounded-[14px] border border-[#163a33] bg-[#0a2e27] p-7 md:p-8">
            {status === "success" ? (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10">
                  <svg className="h-7 w-7 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} />
                  </svg>
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{content.successTitle}</h3>
                <p className="mt-2 max-w-[320px] text-sm leading-6 text-muted-dark">{content.successBody}</p>
                <button
                  className="mt-6 text-sm font-bold text-brand-green transition hover:text-brand-green-bright"
                  onClick={() => { setStatus("idle"); setFields({ name: "", email: "", company: "", country: "", topic: topicOptions[0], timeline: timelineOptions[5], message: "" }); }}
                  type="button"
                >
                  {content.sendAnother}
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{content.name}</label>
                    <input className={inputClass} onChange={set("name")} placeholder={content.namePlaceholder} required type="text" value={fields.name} />
                  </div>
                  <div>
                    <label className={labelClass}>{content.workEmail}</label>
                    <input className={inputClass} onChange={set("email")} placeholder={content.emailPlaceholder} required type="email" value={fields.email} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{content.company}</label>
                    <input className={inputClass} onChange={set("company")} placeholder={content.companyPlaceholder} type="text" value={fields.company} />
                  </div>
                  <div>
                    <label className={labelClass}>{content.country}</label>
                    <input className={inputClass} onChange={set("country")} placeholder={content.countryPlaceholder} type="text" value={fields.country} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{content.topic}</label>
                    <CustomSelect
                      onChange={(v) => setFields((f) => ({ ...f, topic: v }))}
                      options={topicOptions}
                      value={fields.topic}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{content.timeline}</label>
                    <CustomSelect
                      onChange={(v) => setFields((f) => ({ ...f, timeline: v }))}
                      options={timelineOptions}
                      value={fields.timeline}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{content.problem}</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    onChange={set("message")}
                    placeholder={content.problemPlaceholder}
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
                    {status === "loading" ? content.sending : `${content.send} ${isAr ? "←" : "→"}`}
                  </button>
                  <p className="mt-3 text-[12px] text-muted-dark">{content.responseTime}</p>
                </div>
              </form>
            )}
          </div>
          </AnimateIn>

          {/* Info + help cards */}
          <AnimateIn variant="right">
          <div className="space-y-5">
            <div className="rounded-[14px] border border-[#163a33] bg-[#0a2e27] p-6">
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-green">
                {content.contactInfo}
              </span>
              <div className="mt-5 space-y-4">
                {(isAr ? contactDetailsAr : contactDetailsEn).map(({ label, value, href, green }) => (
                  <div className="flex items-start justify-between gap-4" key={label}>
                    <span className="text-[11px] font-black uppercase tracking-[0.1em] text-muted-dark">
                      {label}
                    </span>
                    {href ? (
                      <a
                        className={`text-end text-sm font-semibold transition ${
                          green ? "text-[#25d99d] hover:text-[#5be45e]" : "text-white"
                        }`}
                        href={href}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className={`text-end text-sm font-semibold ${green ? "text-[#25d99d]" : "text-white"}`}>
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[rgba(135,190,175,0.20)] bg-[linear-gradient(98deg,rgba(91,228,94,0.12)_0%,rgba(37,217,157,0.12)_100%)] p-6 shadow-[0_24px_70px_0_rgba(0,0,0,0.18)]">
              <h3 className="text-[17px] font-black leading-snug text-white">{content.notReadyTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-dark">{content.notReadyBody}</p>
              <a
                className="mt-5 inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-5 py-2.5 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
                href="/assessment"
              >
                {content.notReadyCta} {isAr ? "←" : "→"}
              </a>
            </div>
          </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}

function FaqSection({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";
  const faqs = isAr ? faqsAr : faqsEn;
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="bg-paper py-24 text-[#031915] md:py-[92px]">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
          <Label>{content.faqLabel}</Label>
          <h2 className="mt-5 max-w-[480px] text-[36px] font-black leading-[1.1] md:text-[44px]">
            {content.faqTitle}
          </h2>
        </AnimateIn>
        <div className="mt-12 divide-y divide-border-light border-t border-border-light">
          {faqs.map((faq, i) => (
            <AnimateIn delay={i * 80} key={faq.q} variant="up">
            <div>
              <button
                className="flex w-full items-center justify-between gap-8 py-5"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                type="button"
              >
                <span className="text-[15px] font-black text-[#031915]">{faq.q}</span>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-light text-sm text-[#031915]">
                  {openIndex === i ? "×" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <p className={`pb-5 text-sm leading-6 text-muted-light ${isAr ? "pl-14" : "pr-14"}`}>{faq.a}</p>
              )}
            </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ContactPage() {
  const [locale, setLocale] = usePersistentLocale();
  const isAr = locale === "ar";

  return (
    <div dir={isAr ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader active="Contact" locale={locale} setLocale={setLocale} />
      <main>
        <ContactHero locale={locale} />
        <ContactFormSection locale={locale} />
        <FaqSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
