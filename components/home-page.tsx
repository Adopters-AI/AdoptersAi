"use client";

import awsLogo from "@/assets/aws.png";
import claudeLogo from "@/assets/claude2.png";
import googleLogo from "@/assets/ImageWithFallback-2.png";
import openAiLogo from "@/assets/openai-logo.png";
import microsoftLogo from "@/assets/microsoft2.png";
import watermarkLogo from "@/assets/watermark.png.png";
import Link from "next/link";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label, SectionHeader } from "@/components/ui";
import { AnimateIn } from "@/components/animate-in";
import { usePersistentLocale } from "@/components/use-persistent-locale";

const copy = {
  en: {
    dir: "ltr",
    hero: {
      eyebrow: "Enterprise AI systems integrator",
      title: ["Helping", "Enterprises Implement", "AI Solutions."],
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
      title: ["نُمكّن", "المؤسسات من تبني وتفعيل", "حلول الذكاء الاصطناعي."],
      body:
        "تساعد Adopters المؤسسات على الانتقال من أفكار الذكاء الاصطناعي إلى وكلاء مُفعّلين، ومنصات ذكاء، ونماذج مراقبة، ونتائج أعمال قابلة للقياس.",
      primary: "احجز موعد اتصال",
      secondary: "ابدأ التقييم (خلال 60 ثانية)"
    },
    lifecycle: {
      label: "دورة الإنتاج",
      title: "مسار واضح من الاستراتيجية إلى تشغيل الذكاء الاصطناعي.",
      body:
        "تعمل Adopters عبر دورة كاملة: الاكتشاف، تصميم التجربة، الهندسة، النشر، المراقبة، والتحسين المستمر.",
      phases: [
        {
          eyebrow: "المرحلة 01 · الاستراتيجية",
          title: "تحديد الطموح",
          body: "تقييم جاهزية الذكاء الاصطناعي، مخطط الاستثمار، الحوكمة والخصوصية، تصميم مركز التميز.",
          number: "01"
        },
        {
          eyebrow: "المرحلة 02 · البناء",
          title: "تشغيل الذكاء الاصطناعي فعليًا",
          body: "نماذج أولية (PoC)، تكامل الأنظمة، منصات البيانات، MLOps.",
          number: "02"
        },
        {
          eyebrow: "المرحلة 03 · التشغيل",
          title: "الحفاظ على الأداء",
          body: "مراقبة AIOps، استجابة الحوادث، صيانة النماذج، تقارير الأداء التنفيذية.",
          number: "03"
        }
      ]
    },
    services: {
      label: "الخدمات",
      title: "ماذا نقدم",
      cta: "استكشف خدماتنا",
      cards: [
        {
          number: "01",
          type: "استراتيجية",
          title: "استراتيجية وخارطة طريق الذكاء الاصطناعي",
          body: "استشارات تنفيذية لتحديد ومواءمة وتخطيط استثمارات الذكاء الاصطناعي.",
          meta: "مدة المشروع: 2–6 أسابيع"
        },
        {
          number: "02",
          type: "البناء",
          title: "الخدمات المهنية والهندسية للذكاء الاصطناعي",
          body: "تصميم وبناء ودمج أنظمة الذكاء الاصطناعي بالكامل وتكاملها برمجياً داخل البيئات المؤسسية.",
          meta: "مدة المشروع: من 8 أسابيع إلى 10 أشهر"
        },
        {
          number: "03",
          type: "التشغيل",
          title: "خدمات الذكاء الاصطناعي المدارة",
          body: "عمليات تشغيلية مدعومة باتفاقية مستوى خدمة (SLA) تضمن استقرار استجابة وأداء أنظمة الذكاء الاصطناعي بعد الإطلاق الفعلي.",
          meta: "مدة المشروع: من 12 إلى 36 شهراً"
        }
      ]
    },
    products: {
      label: "المنتجات",
      title: "Adopters للذكاء الاصطناعي والعمليات الذكية",
      body:
        "تحوّل Adopters Intelligent المعلومات المشتتة إلى ذكاء جاهز لاتخاذ القرار. تقوم Pulse بمراقبة النماذج وتشغيل الذكاء الاصطناعي بشكل موثوق وقابل للتفسير ومُدار.",
      name: "Adopters Intelligent",
      status: "قيد التطوير",
      description:
        "ذكاء إقليمي يُقدّم كمنصة موحدة — محرك ذكاء واحد يتم تخصيصه وإعادة تسميته لشركاء في بلاد الشام والخليج.",
      link: "استكشف"
    },
    useCases: {
      label: "حالات الاستخدام",
      title: "النماذج المرجعية لتطبيقات الذكاء الاصطناعي عبر القطاعات المؤسسية",
      body:
        "تقوم Adopters بجمع وصياغة نماذج تنفيذ الذكاء الاصطناعي المتكررة في صورة حلول عملية مخصصة لفرق التجزئة، والرعاية الصحية، والقطاع العام، والمالية، والقانون، والامتثال، والتقنية، والهندسة.",
      link: "حالات الاستخدام",
      cards: [
        {
          title: "قطاع التجزئة والسلع الاستهلاكية",
          body: "إدارة الشكاوى والبلاغات، استخبارات ومؤشرات الطلب والمخزون، الرؤى الحوارية لقطاع البيع، خدمات دعم ما بعد البيع."
        },
        {
          title: "الرعاية الصحية والقطاع الحكومي",
          body: "مساعدو الخدمات الطبية بالمستشفيات، الترميز الطبي الذكي، دعم شؤون المواطنين، معالجة الاستفسارات والمعاملات في الحكومة الإلكترونية."
        },
        {
          title: "المالية، الشؤون القانونية والامتثال",
          body: "أتمتة إجراءات مكافحة غسل الأموال (AML) ومعرفة العميل (KYC)، امتثال العقود والاتفاقيات، معالجة الفواتير والمستندات مع ميزة التتبع والتدقيق الكامل."
        },
        {
          title: "التصنيع والقطاع الصناعي",
          body: "الصيانة التنبؤية، الفحص البصري الذكي لجودة الإنتاج، جدولة العمليات الإنتاجية، التنبؤ بمسارات سلاسل الإمداد، والمراقبة الذكية لسلامة العاملين."
        }
      ]
    },
    technology: {
      label: "النظام البيئي التكنولوجي",
      title: "مبني على تقنيات الذكاء الاصطناعي الحديثة وتقنيات الحوسبة السحابية.",
      body:
        "تصمم Adopters حلولاً مرنة قادرة على التكامل والعمل بكفاءة عبر مختلف مزودي النماذج الرائدين، والبنى التحتية السحابية، والبيئات التقنية للمؤسسات"
    },
    cta: {
      title: "لست متأكداً من أين تبدأ؟",
      body:
        "أجب عن أربعة أسئلة سريعة لترشيح مسار الذكاء الاصطناعي الأنسب لوضعك الحالي: الإستراتيجية، البناء، التشغيل، Adopters Intelligent، أو Pulse.",
      primary: "ابدأ التقييم الآن",
      secondary: "احجز موعد اتصال"
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

function HeroNode({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`absolute flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gradient-to-br from-[#5be45e] to-[#25d99d] text-[16px] font-extrabold text-[#031915] ${className ?? ""}`}
    >
      {label}
    </div>
  );
}

function HeroInfoRow({ text, status }: { text: string; status: string }) {
  return (
    <div className="flex min-h-[46px] items-center justify-between gap-3 rounded-[14px] border border-[#163a33] bg-white/[0.04] px-3 py-2 sm:gap-4 sm:px-4">
      <p className="min-w-0 flex-1 text-[11px] leading-5 text-[#a7bdb6] sm:text-[12px]">{text}</p>
      <p className="shrink-0 whitespace-nowrap text-[11px] font-bold text-[#25d99d] sm:text-[12px]">{status}</p>
    </div>
  );
}

function HeroIntelligenceCard({ locale }: { locale: Locale }) {
  const bars = [34, 55, 44, 68, 60, 76];
  const content = locale === "ar"
    ? {
        console: "تمكين المؤسسات من تنفيذ حلول الذكاء الاصطناعي",
        confidence: "مستوى الثقة في اتخاذ القرار",
        insight: "إشارات أولوية من البيانات العامة والداخلية",
        briefing: "ملخص معلوماتي موثق المصادر باللغتين العربية والإنجليزية"
      }
    : {
        console: "Adopters Intelligent · Intelligence Console",
        confidence: "Decision confidence",
        insight: "Priority insight from public + internal datasets",
        briefing: "Arabic/English source-grounded briefing"
      };

  return (
    <div className="w-full max-w-[554px] overflow-hidden rounded-[24px] border border-[#21463e] bg-[#071f1b] shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
      <div className="flex min-h-[46px] items-center justify-between gap-3 border-b border-[#163a33] bg-white/[0.03] px-3 py-2 sm:px-4">
        <div className="flex shrink-0 gap-[7px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[#21463e]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#1e6d69]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#25d99d]" />
        </div>
        <p className={`min-w-0 text-end text-[9px] font-extrabold leading-4 text-[#6e867e] sm:text-[11px] ${locale === "ar" ? "" : "uppercase tracking-[1.5px]"}`}>
          {content.console}
        </p>
      </div>

      <div className="space-y-3 p-3 sm:space-y-[14px] sm:p-[18px]">
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[14px] border border-[#163a33] bg-white/[0.04] p-4 sm:p-[18px]">
            <p className="mb-1 text-[13px] font-bold leading-5 text-[#25d99d]">{content.confidence}</p>
            <div className="mb-7 flex items-end gap-3">
              <span className="text-[28px] font-bold leading-none tracking-[-0.84px] text-[#f4f6f5]">87%</span>
              <span className="text-[13px] font-bold text-[#25d99d]">+18%</span>
            </div>
            <div className="flex h-[72px] items-end gap-2">
              {bars.map((height, index) => (
                <div
                  className="hero-bar flex-1 rounded-t-[8px] bg-gradient-to-br from-[#5be45e] to-[#25d99d] opacity-90"
                  key={index}
                  style={{ animationDelay: `${200 + index * 120}ms`, height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[176px] items-center justify-center rounded-[14px] border border-[#163a33] bg-white/[0.04]">
            <div className="relative h-[150px] w-[220px]">
              <svg className="absolute inset-0" height="150" viewBox="0 0 220 150" width="220">
                <line className="hero-link-line" stroke="#1e6d69" strokeWidth="2" x1="36" x2="110" y1="34" y2="110" />
                <line className="hero-link-line" stroke="#1e6d69" strokeWidth="2" style={{ animationDelay: "300ms" }} x1="110" x2="184" y1="110" y2="34" />
              </svg>
              <HeroNode className="left-[8px] top-[6px]" label="D" />
              <HeroNode className="left-[82px] top-[82px]" label="AI" />
              <HeroNode className="right-[8px] top-[6px]" label="K" />
            </div>
          </div>
        </div>

        <div className="space-y-[10px] rounded-[14px] border border-[#163a33] bg-white/[0.04] p-3 sm:p-[18px]">
          <HeroInfoRow status="Ready" text={content.insight} />
          <HeroInfoRow status="Generated" text={content.briefing} />
        </div>
      </div>
    </div>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const home = copy[locale];
  const isAr = locale === "ar";

  return (
    <section className="hero-grid relative overflow-hidden text-white">
      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 w-[52%] max-w-[800px] select-none opacity-[0.38] ${isAr ? "left-0 -scale-x-100" : "right-0"}`}
        src={watermarkLogo.src}
      />
      <Container className="relative z-10 grid min-h-[830px] items-center gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        <div className={`max-w-[650px] ${isAr ? "text-right" : ""}`}>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-muted-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            {home.hero.eyebrow}
          </div>
          <h1 className={`mt-7 text-balance text-5xl font-black md:text-7xl lg:text-[76px] ${isAr ? "leading-[1.25]" : "leading-[0.96]"}`}>
            <span className="text-gradient-green">{home.hero.title[0]}</span> {home.hero.title[1]}{" "}
            <span className="text-gradient-green">{home.hero.title[2]}</span>
          </h1>
          <p className="mt-7 max-w-[600px] text-lg leading-8 text-muted-dark">{home.hero.body}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">
              {home.hero.primary} {arrow(locale)}
            </Button>
            <Button href="/assessment" variant="outline">
              {home.hero.secondary}
            </Button>
          </div>
        </div>
        <div className="flex min-w-0 justify-center lg:justify-end">
          <AnimateIn className="w-full max-w-[554px]" variant="right">
            <HeroIntelligenceCard key={locale} locale={locale} />
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}

function LifecycleSection({ locale }: { locale: Locale }) {
  const section = copy[locale].lifecycle;
  const isAr = locale === "ar";
  const phases = section.phases;

  return (
    <section className="bg-paper py-24 md:py-[118px]">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
          <div className={`grid gap-12 md:grid-cols-2 md:items-end ${isAr ? "text-right" : ""}`}>
            <div>
              <Label>{section.label}</Label>
              <h2 className="mt-4 text-4xl font-black leading-[1.05] text-[#031915] md:text-[42px] lg:text-5xl">{section.title}</h2>
            </div>
            <p className="text-base leading-7 text-muted-light">{section.body}</p>
          </div>
        </AnimateIn>
        <div className="mt-14 grid border border-border-light bg-white lg:grid-cols-3">
          {phases.map((phase, index) => (
            <AnimateIn delay={index * 120} key={phase.number} variant="up">
              <article className="relative min-h-[260px] p-8 md:p-10 lg:p-12">
                {index < phases.length - 1 ? (
                  <>
                    <span className="absolute bottom-0 left-0 h-px w-full bg-border-light lg:hidden" />
                    <span className={`absolute top-0 hidden h-full w-px bg-border-light lg:block ${isAr ? "left-0" : "right-0"}`} />
                  </>
                ) : null}
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1e6d69]">{phase.eyebrow}</p>
                <h3 className="mt-5 text-2xl font-black text-[#031915]">{phase.title}</h3>
                <p className="mt-5 max-w-[340px] text-sm font-light leading-6 text-muted-light">{phase.body}</p>
                <span className={`absolute top-6 text-5xl font-black text-brand-mint/30 md:top-8 ${isAr ? "left-8 md:left-10" : "right-8 md:right-10"}`}>
                  {phase.number}
                </span>
              </article>
            </AnimateIn>
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
        <AnimateIn variant="up">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Label dark>{section.label}</Label>
              <h2 className="mt-4 text-4xl font-black md:text-5xl">{section.title}</h2>
            </div>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-6 text-sm font-extrabold text-brand-dark transition hover:opacity-90"
              href="/services"
            >
              {section.cta} {arrow(locale)}
            </Link>
          </div>
        </AnimateIn>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {section.cards.map((service, index) => (
            <AnimateIn delay={index * 120} key={service.number} variant="up">
            <article
              className="h-full rounded-2xl border border-white/10 bg-white p-7 text-[#031915] shadow-[0_0_0_1px_rgba(91,228,94,0.06),0_20px_55px_rgba(0,0,0,0.22)]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-card text-xs font-black text-white">{service.number}</span>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1e6d69]">{service.type}</p>
              <h3 className="mt-3 text-xl font-black">{service.title}</h3>
              <p className="mt-3 min-h-20 text-sm font-light leading-6 text-muted-light">{service.body}</p>
              <div className="mt-7 flex items-center border-t border-border-light pt-5 text-xs font-bold text-muted-light">
                <svg aria-hidden="true" className="me-2 shrink-0 text-[#1e6d69]" fill="none" height="13" viewBox="0 0 13 13" width="13">
                  <rect height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" width="11.5" x="0.75" y="1.75" />
                  <path d="M0.75 5h11.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
                  <path d="M4 0.5v2.5M9 0.5v2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
                </svg>
                {service.meta}
              </div>
            </article>
            </AnimateIn>
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
        <AnimateIn variant="up">
          <div className={`grid gap-12 md:grid-cols-2 md:items-end ${isAr ? "text-right" : ""}`}>
            <div>
              <Label>{section.label}</Label>
              <h2 className="mt-4 text-4xl font-black leading-[1.05] text-[#031915] md:text-[42px] lg:text-5xl">{section.title}</h2>
            </div>
            <p className="text-base leading-7 text-muted-light">{section.body}</p>
          </div>
        </AnimateIn>
        <AnimateIn delay={100} variant="up">
        <article className="mt-12 rounded-2xl border border-border-light bg-white p-8 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
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
        </AnimateIn>
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
        <AnimateIn variant="up">
          <div className={`grid gap-12 md:grid-cols-2 md:items-end ${isAr ? "text-right" : ""}`}>
            <div>
              <Label dark>{section.label}</Label>
              <h2 className="mt-4 text-4xl font-black leading-[1.05] text-white md:text-[42px] lg:text-5xl">{section.title}</h2>
            </div>
            <p className="text-base leading-7 text-muted-dark">{section.body}</p>
          </div>
        </AnimateIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {section.cards.map((useCase, idx) => (
            <AnimateIn delay={idx * 100} key={useCase.title} variant="up">
            <article className="flex h-full flex-col rounded-xl border border-white/10 bg-brand-card-soft/30 p-8">
              <h3 className="text-[12px] font-black uppercase leading-5 tracking-[0.12em] text-gradient-green">{useCase.title}</h3>
              <p className="mt-5 flex-1 text-sm font-light leading-6 text-white">{useCase.body}</p>
              <a className="mt-7 inline-flex border-t border-white/10 pt-5 text-xs font-semibold text-gradient-green transition-opacity hover:opacity-75" href={`/use-cases?category=${useCaseSlugs[idx]}#use-case-filter`}>
                {section.link} {arrow(locale)}
              </a>
            </article>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TechnologySection({ locale }: { locale: Locale }) {
  const section = copy[locale].technology;
  const isAr = locale === "ar";

  return (
    <section className="bg-paper py-20 md:py-[82px]">
      <Container>
        <AnimateIn variant="up">
          <div className="text-center">
            <Label centered>{section.label}</Label>
            <h2 className={`mt-4 text-4xl font-black leading-[1.05] text-[#031915] lg:text-5xl ${isAr ? "" : "lg:whitespace-nowrap"}`}>
              {section.title}
            </h2>
            <p className="mx-auto mt-5 max-w-[680px] text-base leading-7 text-muted-light">
              {section.body}
            </p>
          </div>
        </AnimateIn>
        <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologyLogos.map((logo, index) => (
            <AnimateIn delay={index * 80} key={logo.name} variant="up">
              <div className="grid h-[80px] place-items-center rounded-xl bg-white px-4 shadow-sm sm:px-6">
                <img alt={logo.name} className={logo.className} src={logo.src.src} />
              </div>
            </AnimateIn>
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
        <AnimateIn variant="up">
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(90deg,#5be45e_0%,#25d99d_100%)] p-8 text-[#031915] md:p-14">
          <div className="grid gap-8 md:grid-cols-[1fr_345px] md:items-center">
            <div className={isAr ? "text-right" : ""}>
              <h2 className="text-4xl font-black md:text-5xl">{section.title}</h2>
              <p className="mt-4 max-w-[700px] text-sm font-semibold leading-6 text-[#083429]/80">{section.body}</p>
            </div>
            <div className="grid gap-3">
              <Button className="w-full !text-white" href="/assessment" variant="dark">
                {section.primary} <span aria-hidden="true">{arrow(locale)}</span>
              </Button>
              <Button className="w-full" href="/contact" variant="light">
                {section.secondary}
              </Button>
            </div>
          </div>
        </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

export function HomePage() {
  const [locale, setLocale] = usePersistentLocale();
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
