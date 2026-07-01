"use client";

import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label } from "@/components/ui";
import { AnimateIn } from "@/components/animate-in";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import watermarkLogo from "@/assets/watermark.png.png";

const serviceLinesEn = [
  {
    number: "01",
    title: "AI Strategy & Roadmap",
    body: "Best for organizations that need to decide what to build, why it matters, and how to govern it.",
    duration: "2-6 weeks",
    anchor: "#strategy"
  },
  {
    number: "02",
    title: "AI Professional Services",
    body: "Best for organizations ready to build pilots, integrations, platforms, or production AI systems.",
    duration: "8 weeks-10 months",
    anchor: "#build"
  },
  {
    number: "03",
    title: "AI Managed Services",
    body: "Best for organizations that need ongoing monitoring, support, governance, and improvement.",
    duration: "12-36 months",
    anchor: "#operate"
  }
];

const detailSectionsEn = [
  {
    id: "strategy",
    theme: "light",
    label: "01 · AI Strategy & Roadmap",
    title: "Plan before you build.",
    body: "Advisory engagements that define what to build, in what order, and with what governance before a single line of code gets written.",
    stats: [
      ["Engagement", "2-6 weeks"],
      ["Offerings", "Four"],
      ["Focus", "Executive clarity"]
    ],
    offerings: [
      {
        code: "01.01",
        duration: "2-4 weeks",
        title: "AI Readiness Assessment",
        body: "Diagnostic across data, infrastructure, talent, and governance to identify high-value AI opportunities and blockers.",
        outcome: "Clear view of readiness, gaps, and practical starting points."
      },
      {
        code: "01.02",
        duration: "4-6 weeks",
        title: "AI Investment Roadmap",
        body: "Prioritized 18-36 month roadmap with sequenced initiatives, business cases, dependencies, and ROI logic.",
        outcome: "Board-ready roadmap showing what to fund first and why."
      },
      {
        code: "01.03",
        duration: "3-5 weeks",
        title: "AI Governance & Ethics",
        body: "Risk frameworks, model approval workflows, compliance readiness, and ethical guardrails calibrated to the sector.",
        outcome: "Safer AI adoption with clear controls and accountability."
      },
      {
        code: "01.04",
        duration: "4-6 weeks",
        title: "AI Center of Excellence Design",
        body: "Operating model, team structure, tooling, and capability ladder to scale internal AI adoption.",
        outcome: "A practical model for building AI capability inside the organization."
      }
    ]
  },
  {
    id: "build",
    theme: "dark",
    label: "02 · AI Professional Services",
    title: "Build, integrate, deploy.",
    body: "Delivery services for pilots, integrations, AI-ready data platforms, and MLOps foundations that move projects into production.",
    stats: [
      ["Engagement", "8 weeks-10 months"],
      ["Offerings", "Four"],
      ["Focus", "Implementation"]
    ],
    offerings: [
      {
        code: "02.01",
        duration: "8-12 weeks",
        title: "PoC & Pilot Delivery",
        body: "Structured program from problem definition to a validated working pilot running on real data.",
        outcome: "Proof of value before committing to a wider implementation."
      },
      {
        code: "02.02",
        duration: "3-6 months",
        title: "AI Systems Integration",
        body: "Full-scale AI deployment integrated with enterprise systems, workflows, and existing platforms.",
        outcome: "AI that works inside real business operations, not separately from them."
      },
      {
        code: "02.03",
        duration: "3-6 months",
        title: "Data Platform Engineering",
        body: "Data lakes, warehouses, and AI-ready pipelines that create the foundation every AI system needs.",
        outcome: "Reliable data infrastructure prepared for analytics and AI workloads."
      },
      {
        code: "02.04",
        duration: "2-4 months",
        title: "MLOps & AI Engineering",
        body: "Model versioning, automated retraining pipelines, drift monitoring, and deployment workflows.",
        outcome: "Engineering discipline around AI models running in production."
      }
    ]
  },
  {
    id: "operate",
    theme: "light",
    label: "03 · AI Managed Services",
    title: "Keep it running. Keep it improving.",
    body: "Post-deployment services that keep AI systems monitored, maintained, compliant, and continuously improved.",
    stats: [
      ["Engagement", "12-36 months"],
      ["Offerings", "Four"],
      ["Focus", "Operations"]
    ],
    offerings: [
      {
        code: "03.01",
        duration: "12-36 months",
        title: "AI Operations & Monitoring",
        body: "Model health monitoring, drift detection, performance alerts, and incident response for live systems.",
        outcome: "Visibility into model performance and issues after deployment."
      },
      {
        code: "03.02",
        duration: "12-24 months",
        title: "Continuous Retraining",
        body: "Scheduled retraining cycles, evaluation, controlled rollouts, and rollback safety nets.",
        outcome: "AI systems that adapt as data and business conditions change."
      },
      {
        code: "03.03",
        duration: "12-36 months",
        title: "AI Governance & Compliance",
        body: "Ongoing audits, documentation, audit trails, and compliance reporting maintained over time.",
        outcome: "Governance records that support accountability and oversight."
      },
      {
        code: "03.04",
        duration: "12-36 months",
        title: "Dedicated AI Support Pod",
        body: "Flexible support team of AI, data, and platform specialists working with the internal team.",
        outcome: "Extra delivery and support capacity without building the full team internally."
      }
    ]
  }
];

const serviceLinesAr = [
  {
    number: "01",
    title: "إستراتيجية ومخطط الذكاء الاصطناعي",
    body: "الأنسب للمؤسسات التي تحتاج إلى تحديد ما يجب بناؤه، وأهميته والجدوى منه، وكيفية حوكمته.",
    duration: "المدة: 2–6 أسابيع",
    anchor: "#strategy"
  },
  {
    number: "02",
    title: "الخدمات الاحترافية للذكاء الاصطناعي",
    body: "الأنسب للمؤسسات المستعدة لبناء مشاريع تجريبية، أو دمج الأنظمة والمنصات، أو تطوير أنظمة ذكاء اصطناعي إنتاجية.",
    duration: "المدة: 8 أسابيع – 10 أشهر",
    anchor: "#build"
  },
  {
    number: "03",
    title: "الخدمات المُدارة للذكاء الاصطناعي",
    body: "الأنسب للمؤسسات التي تحتاج إلى مراقبة مستمرة، ودعم فني، وحوكمة، وتحسين دائم للأنظمة.",
    duration: "المدة: 12–36 شهراً",
    anchor: "#operate"
  }
];

const detailSectionsAr: typeof detailSectionsEn = [
  {
    id: "strategy",
    theme: "light",
    label: "01 · إستراتيجية ومخطط الذكاء الاصطناعي",
    title: "التخطيط قبل البناء والتنفيذ",
    body: "استشارات استراتيجية تساعد على تحديد ما يجب بناؤه، وبأي ترتيب، وتحت أي إطار حوكمة قبل كتابة أي سطر برمجي.",
    stats: [
      ["مدة التنفيذ", "2–6 أسابيع"],
      ["عدد الخدمات", "4"],
      ["ركيزة التركيز", "وضوح الرؤية التنفيذية"]
    ],
    offerings: [
      {
        code: "01.01",
        duration: "2–4 أسابيع",
        title: "تقييم جاهزية الذكاء الاصطناعي",
        body: "تقييم شامل للبيانات والبنية التحتية والكفاءات والحوكمة لتحديد الفرص ذات القيمة العالية والعوائق المحتملة.",
        outcome: "النتيجة: رؤية واضحة لمستوى الجاهزية والفجوات ونقاط الانطلاق العملية."
      },
      {
        code: "01.02",
        duration: "4–6 أسابيع",
        title: "مخطط الاستثمار في الذكاء الاصطناعي",
        body: "خارطة طريق مرتبة حسب الأولوية لمدة 18–36 شهرًا تتضمن المبادرات، وحالات الأعمال، والاعتماديات، ومنطق العائد على الاستثمار.",
        outcome: "النتيجة: خطة جاهزة للإدارة التنفيذية توضح ما يجب الاستثمار فيه أولًا ولماذا."
      },
      {
        code: "01.03",
        duration: "3–5 أسابيع",
        title: "حوكمة وأخلاقيات الذكاء الاصطناعي",
        body: "أطر إدارة المخاطر، ومسارات اعتماد النماذج، والاستعداد للامتثال، والضوابط الأخلاقية الملائمة للقطاع.",
        outcome: "النتيجة: اعتماد أكثر أمانًا للذكاء الاصطناعي مع ضوابط ومسؤوليات واضحة."
      },
      {
        code: "01.04",
        duration: "4–6 أسابيع",
        title: "تصميم مركز التميز للذكاء الاصطناعي",
        body: "تصميم نموذج التشغيل، وهيكل الفريق، والأدوات، ومسار تطوير القدرات اللازمة لتوسيع تبني الذكاء الاصطناعي داخليًا.",
        outcome: "النتيجة: نموذج عملي لبناء قدرات الذكاء الاصطناعي داخل المؤسسة."
      }
    ]
  },
  {
    id: "build",
    theme: "dark",
    label: "02 · الخدمات الاحترافية للذكاء الاصطناعي",
    title: "البناء، التكامل، والنشر",
    body: "خدمات تنفيذية للنماذج التجريبية والتكاملات ومنصات البيانات الجاهزة للذكاء الاصطناعي وأسس MLOps لنقل المشاريع إلى بيئة الإنتاج.",
    stats: [
      ["مدة التنفيذ", "8 أسابيع – 10 أشهر"],
      ["عدد الخدمات", "4"],
      ["ركيزة التركيز", "التنفيذ"]
    ],
    offerings: [
      {
        code: "02.01",
        duration: "8–10 أسابيع",
        title: "تنفيذ إثبات المفهوم والنماذج التجريبية",
        body: "برنامج منظم يبدأ بتحديد المشكلة وينتهي بنموذج تجريبي يعمل على بيانات حقيقية.",
        outcome: "النتيجة: إثبات القيمة قبل الالتزام بالتنفيذ على نطاق أوسع."
      },
      {
        code: "02.02",
        duration: "3–9 أشهر",
        title: "تكامل أنظمة الذكاء الاصطناعي",
        body: "تنفيذ متكامل للذكاء الاصطناعي وربطه بالأنظمة وسير العمل والمنصات القائمة.",
        outcome: "النتيجة: ذكاء اصطناعي يعمل داخل العمليات الفعلية للمؤسسة وليس بمعزل عنها."
      },
      {
        code: "02.03",
        duration: "2–6 أشهر",
        title: "هندسة منصات البيانات",
        body: "بناء بحيرات البيانات، والمستودعات، ومسارات التدفق المهيأة للذكاء الاصطناعي، والتي تمثل الأساس الهيكلي لأي نظام ذكاء اصطناعي.",
        outcome: "النتيجة: بنية بيانات موثوقة تدعم التحليلات وأحمال العمل الخاصة بالذكاء الاصطناعي."
      },
      {
        code: "02.04",
        duration: "2–4 أشهر",
        title: "هندسة الذكاء الاصطناعي وعمليات MLOps",
        body: "إدارة إصدارات النماذج، وخطوط إعادة التدريب الآلية، ومراقبة الانحراف، وعمليات النشر.",
        outcome: "النتيجة: منهجية هندسية موثوقة لإدارة النماذج في بيئات الإنتاج."
      }
    ]
  },
  {
    id: "operate",
    theme: "light",
    label: "03 · الخدمات المُدارة للذكاء الاصطناعي",
    title: "ضمان استمرارية التشغيل. ومواصلة التطوير.",
    body: "خدمات ما بعد النشر والتشغيل لضمان مراقبة أنظمة الذكاء الاصطناعي، وصيانتها، وامتثالها، وتحسين كفاءتها بشكل مستمر.",
    stats: [
      ["مدة التنفيذ", "12–36 شهرًا"],
      ["عدد الخدمات", "4"],
      ["ركيزة التركيز", "العمليات"]
    ],
    offerings: [
      {
        code: "03.01",
        duration: "12–36 شهرًا",
        title: "عمليات ومراقبة الذكاء الاصطناعي",
        body: "مراقبة سلامة النماذج، ورصد الانحراف الاستجابي، وتنبيهات الأداء، والاستجابة للحوادث والمشكلات التقنية في الأنظمة المشغلة فعلياً.",
        outcome: "النتيجة: رؤية مستمرة لأداء النماذج والمشكلات المحتملة بعد النشر."
      },
      {
        code: "03.02",
        duration: "12–24 شهرًا",
        title: "إعادة التدريب المستمرة",
        body: "دورات إعادة تدريب مجدولة، وتقييمات دورية، وعمليات نشر وتحكم آمنة.",
        outcome: "النتيجة: أنظمة ذكاء اصطناعي تتكيف مع تغير البيانات ومتطلبات الأعمال."
      },
      {
        code: "03.03",
        duration: "12–36 شهرًا",
        title: "الحوكمة والامتثال",
        body: "تدقيقات دورية، ووثائق تشغيلية، وسجلات تدقيق، وتقارير امتثال مستمرة.",
        outcome: "النتيجة: سجلات حوكمة تدعم المساءلة والرقابة المؤسسية."
      },
      {
        code: "03.04",
        duration: "12–36 شهرًا",
        title: "فريق دعم متخصص للذكاء الاصطناعي",
        body: "فريق مرن من خبراء الذكاء الاصطناعي والبيانات والمنصات يعمل جنبًا إلى جنب مع فريقك الداخلي.",
        outcome: "النتيجة: قدرات إضافية للتنفيذ والدعم دون الحاجة إلى بناء فريق كامل داخليًا."
      }
    ]
  }
];

const pageCopy = {
  en: {
    heroLabel: "Services",
    heroTitleBefore: "One ",
    heroTitleAccent: "production",
    heroTitleAfter: " path.",
    heroBody: "Choose the right level of support: define the AI roadmap, build production systems, or operate and improve deployed AI.",
    consultation: "Book service consultation",
    compare: "Compare services",
    heroSteps: [
      ["01 · Strategy", "When direction is unclear", "Assess readiness, prioritize use cases, and define governance before delivery starts."],
      ["02 · Build", "When you are ready to implement", "Deliver pilots, integrations, data platforms, and production AI engineering."],
      ["03 · Operate", "When AI is already live", "Monitor models, retrain systems, maintain compliance, and provide support."]
    ],
    linesLabel: "Service lines",
    linesTitle: "Simple structure. Clear role for each service.",
    ctaTitle: "Not sure which service fits?",
    ctaBody: "Take the 60-second assessment to get a recommended starting point, or book a call to discuss the right sequence.",
    assessment: "Take assessment",
    bookCall: "Book a call"
  },
  ar: {
    heroLabel: "الخدمات",
    heroTitleBefore: "مسار واحد نحو ",
    heroTitleAccent: "التشغيل الفعلي",
    heroTitleAfter: "",
    heroBody: "اختر مستوى الدعم المناسب: سواء كنت بحاجة إلى وضع مخطط للذكاء الاصطناعي، أو بناء أنظمة جاهزة للإنتاج، أو تشغيل الأنظمة المنشورة وتحسينها باستمرار.",
    consultation: "احجز استشارة للخدمات",
    compare: "قارن بين الخدمات",
    heroSteps: [
      ["01 · الاستراتيجية", "عندما تكون الرؤية والتوجه غير واضحين", "قيّم الجاهزية، وحدد أولويات حالات الاستخدام، وضع إطار الحوكمة قبل بدء التنفيذ."],
      ["02 · البناء", "عندما تكون جاهزًا للتنفيذ الفعلي", "تقديم المشاريع التجريبية، وتكامل الأنظمة، ومنصات البيانات، وهندسة الذكاء الاصطناعي الإنتاجي."],
      ["03 · التشغيل", "عندما يكون الذكاء الاصطناعي قيد التشغيل الفعلي", "راقب النماذج، وأعد تدريب الأنظمة، وحافظ على الامتثال، وقدّم الدعم المستمر."]
    ],
    linesLabel: "مسارات الخدمات",
    linesTitle: "هيكل بسيط. دور محدد لكل خدمة",
    ctaTitle: "لست متأكداً من الخدمة المناسبة لمؤسستك؟",
    ctaBody: "ابدأ التقييم (خلال 60 ثانية) للحصول على ترشيح دقيق لنقطة البداية الأنسب، أو احجز موعد اتصال لمناقشة التسلسل الأمثل للتنفيذ.",
    assessment: "ابدأ التقييم",
    bookCall: "احجز موعد اتصال"
  }
} as const;

function ServiceHero({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";

  return (
    <section className="hero-grid relative overflow-hidden bg-brand-dark py-20 text-white md:py-[86px]">
      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 w-[52%] max-w-[800px] select-none opacity-[0.38] ${isAr ? "left-0 -scale-x-100" : "right-0"}`}
        src={watermarkLogo.src}
      />
      <Container className="relative z-10 grid min-h-[512px] items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-[570px]">
          <Label dark>{content.heroLabel}</Label>
          <h1 className="mt-8 text-balance text-5xl font-black leading-[1.02] md:text-7xl">
            {content.heroTitleBefore}<span className="text-gradient-green">{content.heroTitleAccent}</span>{content.heroTitleAfter}
          </h1>
          <p className="mt-6 max-w-[570px] text-base leading-7 text-muted-dark">{content.heroBody}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">{content.consultation} {isAr ? "←" : "→"}</Button>
            <Button href="#compare" variant="outline">
              {content.compare}
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
          {content.heroSteps.map(([label, title, body], index) => (
            <article
              className={`p-6 ${index < 2 ? "border-b border-white/10" : ""}`}
              key={label}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-gradient-green">{label}</p>
              <h2 className="mt-3 text-2xl font-black">{title}</h2>
              <p className="mt-3 max-w-[430px] text-sm leading-6 text-muted-dark">{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceLinesSection({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const serviceLines = locale === "ar" ? serviceLinesAr : serviceLinesEn;

  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]" id="compare">
      <Container>
        <div>
          <Label dark>{content.linesLabel}</Label>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] md:text-[42px] lg:text-5xl">
            {content.linesTitle}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {serviceLines.map((line, index) => (
            <AnimateIn delay={index * 120} key={line.number} variant="up">
            <a className="block h-full rounded-2xl border border-white/10 bg-[#163a33] p-8 transition hover:border-white/20 hover:bg-[#1a4038]" href={line.anchor}>
              <p className="text-[11px] font-black text-gradient-green">{line.number}</p>
              <h3 className="mt-4 text-xl font-black">{line.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-6 text-muted-dark">{line.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-mint/[0.32] bg-[#0a2e27] px-[15px] py-[9px] text-xs font-normal">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                <span className="text-white">{line.duration}</span>
              </span>
            </a>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function OfferingCard({
  offering,
  dark
}: {
  offering: (typeof detailSectionsEn)[number]["offerings"][number];
  dark: boolean;
}) {
  return (
    <article
      className={`rounded-lg p-8 ${
        dark
          ? "border border-white/10 bg-white/[0.055] text-white"
          : "border border-border-light bg-white text-[#031915]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[11px] font-black text-gradient-green">{offering.code}</p>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
            dark ? "border-white/10 text-muted-dark" : "border-border-light text-muted-light"
          }`}
        >
          {offering.duration}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-black">{offering.title}</h3>
      <p className={`mt-3 min-h-14 text-sm leading-6 ${dark ? "text-muted-dark" : "text-muted-light"}`}>
        {offering.body}
      </p>
      <div className={`mt-7 border-t pt-5 text-sm leading-6 ${dark ? "border-white/10 text-muted-dark" : "border-border-light text-muted-light"}`}>
        <span className="me-3 inline-block h-1.5 w-1.5 rounded-full bg-brand-green align-middle" />
        {offering.outcome}
      </div>
    </article>
  );
}

function DetailSection({ section }: { section: (typeof detailSectionsEn)[number] }) {
  const dark = section.theme === "dark";

  return (
    <section className={`${dark ? "bg-brand-dark text-white" : "bg-paper text-[#031915]"} py-24 md:py-[92px]`} id={section.id}>
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-[56px]">
          <div>
            <Label dark={dark}>{section.label}</Label>
            <h2 className="mt-6 max-w-[560px] text-balance text-4xl font-black leading-[1.05] md:text-5xl">
              {section.title}
            </h2>
            <div className="mt-6 flex flex-wrap gap-8">
              {section.stats.map(([label, value]) => (
                <div key={label}>
                  <p className={`text-[10px] font-black uppercase tracking-[0.16em] ${dark ? "text-muted-dark" : "text-muted-light"}`}>
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <p className={`max-w-[500px] text-base leading-7 ${dark ? "text-muted-dark" : "text-muted-light"}`}>
            {section.body}
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {section.offerings.map((offering, index) => (
            <AnimateIn delay={index * 100} key={offering.code} variant="up">
              <OfferingCard dark={dark} offering={offering} />
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesCTA({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];

  return (
    <section className="bg-brand-dark py-24" id="consultation">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#52f35f_0%,#46ef93_58%,#55efbd_100%)] p-8 text-[#031915] md:p-14">
          <div className="grid gap-8 md:grid-cols-[1fr_345px] md:items-center">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">{content.ctaTitle}</h2>
              <p className="mt-4 max-w-[700px] text-sm font-semibold leading-6 text-[#083429]/80">
                {content.ctaBody}
              </p>
            </div>
            <div className="grid gap-3">
              <Button className="w-full !text-white" href="/assessment" variant="dark">
                {content.assessment} {locale === "ar" ? "←" : "→"}
              </Button>
              <Button className="w-full" href="/contact" variant="light">
                {content.bookCall}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ServicesPage() {
  const [locale, setLocale] = usePersistentLocale();
  const detailSections = locale === "ar" ? detailSectionsAr : detailSectionsEn;

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader active="Services" locale={locale} setLocale={setLocale} />
      <main>
        <ServiceHero locale={locale} />
        <ServiceLinesSection locale={locale} />
        {detailSections.map((section) => (
          <DetailSection key={section.label} section={section} />
        ))}
        <ServicesCTA locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
