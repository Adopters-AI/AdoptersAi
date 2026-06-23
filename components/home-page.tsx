"use client";

import awsLogo from "@/assets/aws.png";
import claudeLogo from "@/assets/claude.png";
import googleLogo from "@/assets/ImageWithFallback-2.png";
import openAiLogo from "@/assets/ImageWithFallback-3.png";
import microsoftLogo from "@/assets/microsoft-logo-png-transparent-background-1.png";
import consoleMockup from "@/assets/ProductMockup.png";
import watermarkLogo from "@/assets/watermark.png.png";
import { useState } from "react";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label, SectionHeader } from "@/components/ui";

const copy = {
  en: {
    dir: "ltr",
    hero: {
      eyebrow: "Enterprise AI systems integrator",
      title: ["AI Adopter", "assists enterprises in implementing", "AI solutions."],
      body:
        "Adopters helps enterprises move from AI ideas to deployed agents, intelligence platforms, monitored models, and measurable business outcomes.",
      primary: "Book a call",
      secondary: "Take the 60-sec assessment"
    },
    lifecycle: {
      label: "Production lifecycle",
      title: "One clear path from strategy to operating AI.",
      body:
        "Adopters works across the full lifecycle: discovery, experience design, engineering, deployment, monitoring, and continuous improvement.",
      phases: [
        {
          eyebrow: "Phase 01 · Strategy",
          title: "Define the ambition",
          body: "AI readiness assessment, investment roadmap, governance & privacy, Center of Excellence design.",
          number: "01"
        },
        {
          eyebrow: "Phase 02 · Build",
          title: "Put AI into production",
          body: "PoC & pilot on real data, systems integration, data platforms, MLOps.",
          number: "02"
        },
        {
          eyebrow: "Phase 03 · Operate",
          title: "Keep it healthy",
          body: "AIOps monitoring, Tier 2-3 incident response, model maintenance, executive performance reporting.",
          number: "03"
        }
      ]
    },
    services: {
      label: "Services",
      title: "What we offer",
      cta: "Explore services",
      cards: [
        {
          number: "01",
          type: "Strategy",
          title: "AI Strategy & Roadmap",
          body: "Advisory engagements to define, align, and plan AI investments at executive level.",
          meta: "Engagement: 2-6 weeks"
        },
        {
          number: "02",
          type: "Build",
          title: "AI Professional Services",
          body: "End-to-end design, build, and integration of AI systems into enterprise environments.",
          meta: "Engagement: 8 wks - 10 mos"
        },
        {
          number: "03",
          type: "Operate",
          title: "AI Managed Services",
          body: "SLA-backed operations that keep AI systems performing after go-live.",
          meta: "Engagement: 12-36 months"
        }
      ]
    },
    products: {
      label: "Products",
      title: "Adopters intelligence & AI operations.",
      body:
        "Adopters Intelligent turns scattered information into decision-ready intelligence. Pulse monitors deployed models and keeps production AI reliable, explainable, and governed.",
      name: "Adopters Intelligent",
      status: "Building",
      description:
        "Regional intelligence delivered as a platform - one shared AI engine, white-labelled into partner-branded products across the Levant and GCC.",
      link: "Explore"
    },
    useCases: {
      label: "Use cases",
      title: "Reference AI patterns across enterprise sectors.",
      body:
        "Adopters packages repeated AI implementation patterns into practical solutions for retail, healthcare, public sector, finance, legal, compliance, technology, and engineering teams.",
      link: "Use cases",
      cards: [
        {
          title: "Retail & Consumer",
          body: "Complaint management, demand & inventory intelligence, conversational retail insights, post-sale support."
        },
        {
          title: "Healthcare & Public Sector",
          body: "Hospital service assistants, medical coding, citizen support, e-government inquiry handling."
        },
        {
          title: "Finance, Legal & Compliance",
          body: "AML / KYC automation, contract compliance, invoice & document processing with full traceability."
        },
        {
          title: "Manufacturing & Industrial",
          body: "Predictive maintenance, visual quality inspection, production scheduling, supply chain forecasting and worker safety monitoring."
        }
      ]
    },
    technology: {
      label: "Technology ecosystem",
      title: "Built around modern AI and cloud stacks.",
      body:
        "Adopters designs solutions that can work across leading model providers, cloud infrastructure, and enterprise technology environments."
    },
    cta: {
      title: "Not sure where to start?",
      body:
        "Answer four questions and get a recommended AI path: Strategy, Build, Operate, Adopters Intelligent, or Pulse.",
      primary: "Take assessment",
      secondary: "Book a call"
    }
  },
  ar: {
    dir: "rtl",
    hero: {
      eyebrow: "مكامل أنظمة الذكاء الاصطناعي للمؤسسات",
      title: ["المعتمد الذكي", "يساعد المؤسسات في تنفيذ حلول", "الذكاء الاصطناعي."],
      body:
        "تساعد Adopters المؤسسات على الانتقال من أفكار الذكاء الاصطناعي إلى وكلاء يعملون في الإنتاج، ومنصات ذكاء، ونماذج مراقبة، ونتائج أعمال قابلة للقياس.",
      primary: "احجز مكالمة",
      secondary: "ابدأ تقييم 60 ثانية"
    },
    lifecycle: {
      label: "دورة حياة الإنتاج",
      title: "مسار واضح من الاستراتيجية إلى تشغيل الذكاء الاصطناعي.",
      body:
        "تعمل Adopters عبر دورة الحياة الكاملة: الاكتشاف، وتصميم التجربة، والهندسة، والنشر، والمراقبة، والتحسين المستمر.",
      phases: [
        {
          eyebrow: "المرحلة 01 · الاستراتيجية",
          title: "حدد الطموح",
          body: "تقييم جاهزية الذكاء الاصطناعي، وخارطة طريق الاستثمار، والحوكمة والخصوصية، وتصميم مركز التميز.",
          number: "01"
        },
        {
          eyebrow: "المرحلة 02 · البناء",
          title: "أدخل الذكاء الاصطناعي في الإنتاج",
          body: "إثبات المفهوم والتجريب على بيانات حقيقية، وتكامل الأنظمة، ومنصات البيانات، وعمليات MLOps.",
          number: "02"
        },
        {
          eyebrow: "المرحلة 03 · التشغيل",
          title: "حافظ على صحته",
          body: "مراقبة AIOps، والاستجابة للحوادث، وصيانة النماذج، وتقارير الأداء التنفيذية.",
          number: "03"
        }
      ]
    },
    services: {
      label: "الخدمات",
      title: "ما نقدمه",
      cta: "استكشف الخدمات",
      cards: [
        {
          number: "01",
          type: "استراتيجية",
          title: "استراتيجية وخارطة طريق للذكاء الاصطناعي",
          body: "استشارات لتحديد استثمارات الذكاء الاصطناعي ومواءمتها وتخطيطها على مستوى الإدارة التنفيذية.",
          meta: "المدة: 2-6 أسابيع"
        },
        {
          number: "02",
          type: "بناء",
          title: "الخدمات المهنية للذكاء الاصطناعي",
          body: "تصميم وبناء ودمج أنظمة الذكاء الاصطناعي داخل بيئات المؤسسات من البداية إلى النهاية.",
          meta: "المدة: 8 أسابيع - 10 أشهر"
        },
        {
          number: "03",
          type: "تشغيل",
          title: "الخدمات المُدارة للذكاء الاصطناعي",
          body: "عمليات مدعومة باتفاقيات مستوى الخدمة للحفاظ على أداء أنظمة الذكاء الاصطناعي بعد الإطلاق.",
          meta: "المدة: 12-36 شهرًا"
        }
      ]
    },
    products: {
      label: "المنتجات",
      title: "ذكاء Adopters وعمليات الذكاء الاصطناعي.",
      body:
        "يحول Adopters Intelligent المعلومات المتفرقة إلى ذكاء جاهز للقرار. ويراقب Pulse النماذج المنشورة ويحافظ على موثوقية الذكاء الاصطناعي ووضوحه وحوكمته.",
      name: "Adopters Intelligent",
      status: "قيد البناء",
      description:
        "ذكاء إقليمي مقدم كمنصة: محرك ذكاء اصطناعي مشترك يتم تقديمه بعلامات شركاء مختلفة في بلاد الشام والخليج.",
      link: "استكشف"
    },
    useCases: {
      label: "حالات الاستخدام",
      title: "أنماط ذكاء اصطناعي مرجعية عبر قطاعات المؤسسات.",
      body:
        "تحزم Adopters أنماط تنفيذ الذكاء الاصطناعي المتكررة في حلول عملية لفرق التجزئة، والرعاية الصحية، والقطاع العام، والتمويل، والقانون، والامتثال، والتقنية، والهندسة.",
      link: "حالات الاستخدام",
      cards: [
        {
          title: "التجزئة والمستهلك",
          body: "إدارة الشكاوى، ذكاء الطلب والمخزون، رؤى التجزئة الحوارية، ودعم ما بعد البيع."
        },
        {
          title: "الرعاية الصحية والقطاع العام",
          body: "مساعدو خدمات المستشفيات، الترميز الطبي، دعم المواطنين، ومعالجة استفسارات الحكومة الإلكترونية."
        },
        {
          title: "التمويل والقانون والامتثال",
          body: "أتمتة AML / KYC، امتثال العقود، ومعالجة الفواتير والمستندات مع قابلية تتبع كاملة."
        },
        {
          title: "التصنيع والصناعة",
          body: "الصيانة التنبؤية، فحص الجودة البصري، جدولة الإنتاج، توقعات سلسلة الإمداد، ومراقبة سلامة العمال."
        }
      ]
    },
    technology: {
      label: "النظام التقني",
      title: "مبني حول الذكاء الاصطناعي الحديث وبنى السحابة.",
      body:
        "تصمم Adopters حلولًا يمكن أن تعمل عبر مقدمي النماذج الرائدين، وبنية السحابة، وبيئات التكنولوجيا المؤسسية."
    },
    cta: {
      title: "لست متأكدًا من أين تبدأ؟",
      body:
        "أجب عن أربعة أسئلة واحصل على مسار ذكاء اصطناعي مقترح: استراتيجية، بناء، تشغيل، Adopters Intelligent، أو Pulse.",
      primary: "ابدأ التقييم",
      secondary: "احجز مكالمة"
    }
  }
} as const;

const technologyLogos = [
  { name: "AWS", src: awsLogo, className: "h-[34px] w-auto" },
  { name: "Claude", src: claudeLogo, className: "h-[34px] w-auto" },
  { name: "Google", src: googleLogo, className: "h-[34px] w-auto" },
  { name: "OpenAI", src: openAiLogo, className: "h-[34px] w-auto" },
  { name: "Microsoft", src: microsoftLogo, className: "h-[34px] w-auto" }
];

function arrow(locale: Locale) {
  return locale === "ar" ? "←" : "→";
}

function HeroMockup({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <img
      alt="Adopters Intelligence Console"
      className={`w-full max-w-[555px] rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.35)] ${isAr ? "lg:order-first" : ""}`}
      src={consoleMockup.src}
    />
  );
}

function Hero({ locale }: { locale: Locale }) {
  const home = copy[locale];
  const isAr = locale === "ar";

  return (
    <section className="hero-grid relative overflow-hidden text-white">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 w-[52%] max-w-[800px] select-none opacity-[0.38]" src={watermarkLogo.src} />
      <Container className="relative z-10 grid min-h-[830px] items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        <div className={`max-w-[650px] ${isAr ? "text-right lg:order-2 lg:justify-self-end" : ""}`}>
          <div
            className={`inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-dark ${
              isAr ? "flex-row-reverse" : ""
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            {home.hero.eyebrow}
          </div>
          <h1 className="mt-7 text-balance text-5xl font-black leading-[0.96] md:text-7xl lg:text-[76px]">
            <span className="text-gradient-green">{home.hero.title[0]}</span> {home.hero.title[1]}{" "}
            <span className="text-gradient-green">{home.hero.title[2]}</span>
          </h1>
          <p className={`mt-7 max-w-[600px] text-lg leading-8 text-muted-dark ${isAr ? "mr-auto" : ""}`}>{home.hero.body}</p>
          <div className={`mt-9 flex flex-col gap-4 sm:flex-row ${isAr ? "sm:justify-end" : ""}`}>
            <Button href="/contact">
              {home.hero.primary} {arrow(locale)}
            </Button>
            <Button href="/assessment" variant="outline">
              {home.hero.secondary}
            </Button>
          </div>
        </div>
        <div className={`flex justify-center ${isAr ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>
          <HeroMockup locale={locale} />
        </div>
      </Container>
    </section>
  );
}

function LifecycleSection({ locale }: { locale: Locale }) {
  const section = copy[locale].lifecycle;
  const isAr = locale === "ar";
  const phases = isAr ? [...section.phases].reverse() : section.phases;

  return (
    <section className="bg-paper py-24 md:py-[118px]">
      <Container className={isAr ? "text-right" : ""}>
        <div className={`grid gap-12 md:grid-cols-2 md:items-end ${isAr ? "text-right" : ""}`}>
          <div>
            <Label>{section.label}</Label>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] text-[#031915] md:text-[42px] lg:text-5xl">{section.title}</h2>
          </div>
          <p className="text-base leading-7 text-muted-light">{section.body}</p>
        </div>
        <div className="mt-14 grid border border-border-light bg-white lg:grid-cols-3">
          {phases.map((phase, index) => (
            <article className="relative min-h-[260px] p-8 md:p-10 lg:p-12" key={phase.number}>
              {index < phases.length - 1 ? (
                <span className={`absolute top-0 hidden h-full w-px bg-border-light lg:block ${isAr ? "left-0" : "right-0"}`} />
              ) : null}
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1e6d69]">{phase.eyebrow}</p>
              <h3 className="mt-5 text-2xl font-black text-[#031915]">{phase.title}</h3>
              <p className="mt-5 max-w-[340px] text-sm font-light leading-6 text-muted-light">{phase.body}</p>
              <span className={`absolute top-6 text-5xl font-black text-brand-mint/30 md:top-8 ${isAr ? "left-8 md:left-10" : "right-8 md:right-10"}`}>
                {phase.number}
              </span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesSection({ locale }: { locale: Locale }) {
  const section = copy[locale].services;
  const isAr = locale === "ar";

  return (
    <section className="bg-brand-dark py-24 text-white md:py-[118px]" id="services">
      <Container className={isAr ? "text-right" : ""}>
        <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${isAr ? "md:flex-row-reverse" : ""}`}>
          <div>
            <Label dark>{section.label}</Label>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">{section.title}</h2>
          </div>
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-6 text-sm font-extrabold text-brand-dark transition hover:opacity-90"
            href="/services"
          >
            {section.cta} {arrow(locale)}
          </a>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {section.cards.map((service) => (
            <article
              className="rounded-2xl border border-white/10 bg-white p-7 text-[#031915] shadow-[0_0_0_1px_rgba(91,228,94,0.06),0_20px_55px_rgba(0,0,0,0.22)]"
              key={service.number}
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-card text-xs font-black text-white">{service.number}</span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1e6d69]">{service.type}</p>
              <h3 className="mt-3 text-xl font-black">{service.title}</h3>
              <p className="mt-3 min-h-20 text-sm font-light leading-6 text-muted-light">{service.body}</p>
              <div className="mt-7 flex items-center border-t border-border-light pt-5 text-xs font-bold text-muted-light">
                <svg aria-hidden="true" className="mr-2 shrink-0 text-[#1e6d69]" fill="none" height="13" viewBox="0 0 13 13" width="13">
                  <rect height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" width="11.5" x="0.75" y="1.75" />
                  <path d="M0.75 5h11.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
                  <path d="M4 0.5v2.5M9 0.5v2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
                </svg>
                {service.meta}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductsSection({ locale }: { locale: Locale }) {
  const section = copy[locale].products;
  const isAr = locale === "ar";

  return (
    <section className="bg-paper py-24 md:py-[118px]" id="products">
      <Container className={isAr ? "text-right" : ""}>
        <div className={`grid gap-12 md:grid-cols-2 md:items-end ${isAr ? "text-right" : ""}`}>
          <div>
            <Label>{section.label}</Label>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] text-[#031915] md:text-[42px] lg:text-5xl">{section.title}</h2>
          </div>
          <p className="text-base leading-7 text-muted-light">{section.body}</p>
        </div>
        <article className="mt-12 rounded-2xl border border-border-light bg-white p-8 md:p-10">
          <div className={`flex flex-col gap-5 md:flex-row md:items-start md:justify-between ${isAr ? "md:flex-row-reverse" : ""}`}>
            <h3 className="text-2xl text-[#031915]">
              <span className="font-black">{section.name.split(" ")[0]}</span>{" "}
              <span className="font-normal">{section.name.split(" ").slice(1).join(" ")}</span>
            </h3>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-light px-4 py-2 text-xs font-bold text-muted-light">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {section.status}
            </span>
          </div>
          <p className="mt-5 max-w-[740px] text-sm font-light leading-7 text-muted-light">{section.description}</p>
          <a
            className="mt-7 inline-flex text-sm font-bold text-[#1e6d69] transition-colors hover:text-brand-mint"
            href="/products"
          >
            {section.link} {arrow(locale)}
          </a>
        </article>
      </Container>
    </section>
  );
}

const useCaseSlugs = ["retail", "healthcare", "finance", "manufacturing"] as const;

function UseCasesSection({ locale }: { locale: Locale }) {
  const section = copy[locale].useCases;
  const isAr = locale === "ar";

  return (
    <section className="bg-brand-dark py-24 text-white md:py-[118px]" id="use-cases">
      <Container className={isAr ? "text-right" : ""}>
        <div className={`grid gap-12 md:grid-cols-2 md:items-end ${isAr ? "text-right" : ""}`}>
          <div>
            <Label dark>{section.label}</Label>
            <h2 className="mt-4 text-4xl font-black leading-[1.05] text-white md:text-[42px] lg:text-5xl">{section.title}</h2>
          </div>
          <p className="text-base leading-7 text-muted-dark">{section.body}</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {section.cards.map((useCase, idx) => (
            <article className="flex flex-col rounded-xl border border-white/10 bg-brand-card-soft/30 p-8" key={useCase.title}>
              <h3 className="text-[12px] font-black uppercase leading-5 tracking-[0.12em] text-gradient-green">{useCase.title}</h3>
              <p className="mt-5 flex-1 text-sm font-light leading-6 text-muted-dark">{useCase.body}</p>
              <a className="mt-7 inline-flex border-t border-white/10 pt-5 text-xs font-semibold text-gradient-green transition-opacity hover:opacity-75" href={`/use-cases?category=${useCaseSlugs[idx]}#use-case-filter`}>
                {section.link} {arrow(locale)}
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechnologySection({ locale }: { locale: Locale }) {
  const section = copy[locale].technology;

  return (
    <section className="bg-paper py-20 md:py-[82px]">
      <Container>
        <div className="text-center">
          <Label centered>{section.label}</Label>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] text-[#031915] lg:whitespace-nowrap lg:text-5xl">
            {section.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[680px] text-base leading-7 text-muted-light">
            {section.body}
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologyLogos.map((logo) => (
            <div className="grid h-[80px] place-items-center rounded-xl bg-white px-6 shadow-sm" key={logo.name}>
              <img alt={logo.name} className={logo.className} src={logo.src.src} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTASection({ locale }: { locale: Locale }) {
  const section = copy[locale].cta;
  const isAr = locale === "ar";

  return (
    <section className="bg-brand-dark py-24" id="assessment">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(90deg,#5be45e_0%,#25d99d_100%)] p-8 text-[#031915] md:p-14">
          <div className={`grid gap-8 md:grid-cols-[1fr_345px] md:items-center ${isAr ? "md:grid-flow-col-dense" : ""}`}>
            <div className={isAr ? "text-right md:col-start-2" : ""}>
              <h2 className="text-4xl font-black md:text-5xl">{section.title}</h2>
              <p className="mt-4 max-w-[700px] text-sm font-semibold leading-6 text-[#083429]/80">{section.body}</p>
            </div>
            <div className={`grid gap-3 ${isAr ? "md:col-start-1" : ""}`}>
              <Button className="w-full !text-white" href="/assessment" variant="dark">
                {section.primary} <span aria-hidden="true">{arrow(locale)}</span>
              </Button>
              <Button className="w-full" href="/contact" variant="light">
                {section.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HomePage() {
  const [locale, setLocale] = useState<Locale>("en");
  const current = copy[locale];

  return (
    <div dir={current.dir} lang={locale}>
      <SiteHeader locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <LifecycleSection locale={locale} />
        <ServicesSection locale={locale} />
        <ProductsSection locale={locale} />
        <UseCasesSection locale={locale} />
        <TechnologySection locale={locale} />
        <CTASection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
