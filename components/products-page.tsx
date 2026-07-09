"use client";

import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label } from "@/components/ui";
import { AnimateIn } from "@/components/animate-in";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import watermarkLogo from "@/assets/watermark.png.png";

const heroProductTagsEn = ["Institutional intelligence", "GraphRAG", "White-label"];
const heroProductTagsAr = ["الذكاء المؤسسي", "مخطط RAG", "علامة تجارية خاصة"];

const intelligentMetaEn = [
  ["Type", "White-label SaaS platform"],
  ["Deployment", "Cloud · Sovereign · Hybrid"],
  ["Language", "Arabic + English"],
  ["Instances", "5 active verticals"],
  ["Data control", "Local sovereignty"],
  ["Status", "Live — In development"]
] as const;

const intelligentMetaAr = [
  ["النوع", "منصة SaaS بعلامة تجارية خاصة"],
  ["النشر", "سحابي · سيادي · هجين"],
  ["اللغة", "العربية والإنجليزية"],
  ["الأنظمة", "5 قطاعات نشطة"],
  ["التحكم بالبيانات", "سيادة محلية"],
  ["الحالة", "مباشر — قيد التطوير"]
] as const;

const architectureLayersEn = [
  ["L1", "Ingestion", "Connects to APIs, web sources, documents, feeds, and institutional systems."],
  ["L2", "Processing", "Turns unstructured data into structured signals such as entities, events, sentiment, and relationships."],
  ["L3", "Knowledge Graph", "Connects actors, events, claims, and sources into the defensible core of the platform."],
  ["L4", "AI Intelligence", "Uses GraphRAG to answer complex questions with traceable, source-backed reasoning."],
  ["L5", "Delivery", "Delivers dashboards, automated briefings, APIs, and partner-branded products."]
] as const;

const architectureLayersAr = [
  ["L1", "جمع البيانات", "ربط واجهات البرمجة (APIs)، والمصادر الإلكترونية، والمستندات، والتغذيات البيانية، والأنظمة المؤسسية."],
  ["L2", "المعالجة", "تحويل البيانات غير المهيكلة إلى مؤشرات منظمة مثل الكيانات والأحداث والمشاعر والعلاقات."],
  ["L3", "الرسم البياني المعرفي", "ربط الجهات الفاعلة والأحداث والادعاءات والمصادر ضمن نواة معرفية موثوقة."],
  ["L4", "الذكاء الاصطناعي", "استخدام GraphRAG للإجابة عن الأسئلة المعقدة مع إمكانية تتبع المصادر والاستدلال."],
  ["L5", "التوصيل", "تقديم لوحات المعلومات والإحاطات الآلية وواجهات البرمجة والمنتجات المخصصة للشركاء."]
] as const;

const intelligentFeaturesEn = [
  ["01", "Multi-source ingestion", "Pull from APIs, documents, web sources, market feeds, and institutional systems."],
  ["02", "Arabic-native NLP", "Extract entities, sentiment, and relationships from Arabic and English sources."],
  ["03", "GraphRAG intelligence", "Answer complex questions using connected knowledge and traceable sources."],
  ["04", "Automated briefings", "Generate recurring intelligence summaries, watchlists, and anomaly alerts."],
  ["05", "White-label delivery", "Run the platform under the partner's own brand, domain, and user experience."],
  ["06", "Sovereign data control", "Support deployment models that keep sensitive data under institutional governance."]
] as const;

const intelligentFeaturesAr = [
  ["01", "جمع البيانات من مصادر متعددة", "استيراد البيانات من واجهات البرمجة والمستندات والمصادر الإلكترونية وبيانات الأسواق والأنظمة المؤسسية."],
  ["02", "معالجة لغوية متقدمة للعربية", "استخراج الكيانات والمشاعر والعلاقات من المصادر العربية والإنجليزية."],
  ["03", "ذكاء GraphRAG", "الإجابة عن الأسئلة المعقدة بالاعتماد على معرفة مترابطة ومصادر قابلة للتتبع."],
  ["04", "إحاطات وتقارير آلية", "إنشاء ملخصات دورية وقوائم مراقبة وتنبيهات للحالات غير الطبيعية."],
  ["05", "حلول بعلامة تجارية خاصة", "تشغيل المنصة باسم المؤسسة ونطاقها وتجربتها الخاصة."],
  ["06", "سيادة البيانات", "دعم نماذج نشر تضمن بقاء البيانات الحساسة ضمن إطار الحوكمة المؤسسية."]
] as const;

const intelligentImpactEn = [
  ["Speed", "From days to minutes", "Analysts move faster because intelligence is automatically collected, connected, and summarized."],
  ["Reach", "One engine, many institutions", "A shared engine can serve multiple branded products without rebuilding the platform each time."],
  ["Depth", "Relationships, not just records", "The knowledge graph reveals links, dependencies, and risks that document search can miss."]
] as const;

const intelligentImpactAr = [
  ["السرعة", "من أيام إلى دقائق", "يعمل المحللون بكفاءة أعلى لأن المعلومات تُجمع وتُربط وتُلخص تلقائيًا."],
  ["الانتشار", "محرك واحد يخدم مؤسسات متعددة", "يمكن لمحرك واحد تشغيل عدة منتجات مختلفة دون إعادة بناء المنصة في كل مرة."],
  ["العمق", "العلاقات وليس السجلات فقط", "يكشف الرسم البياني المعرفي الروابط والاعتماديات والمخاطر التي قد لا تظهر من خلال البحث التقليدي في المستندات."]
] as const;

const pageCopy = {
  en: {
    heroLabel: "Products",
    heroTitleBefore: "Adopters Intelligent with ",
    heroTitleAccent1: "clear roles",
    heroTitleMiddle: " and ",
    heroTitleAccent2: "clear status.",
    heroBody: "AdoptersAI products help institutions turn complex data into decision-ready intelligence, then monitor AI systems after they go live.",
    discoverMore: "Discover more",
    requestDemo: "Request a demo",
    heroCardTitle: "Adopters Intelligent",
    liveStatus: "Live — In development",
    heroCardBody: "White-label intelligence platform for institutions that need dashboards, briefings, knowledge graph intelligence, and branded delivery.",
    sectionBody: "A white-label intelligence platform that helps institutions collect data, connect relationships, and deliver decision-ready intelligence under their own brand.",
    architectureLabel: "Platform architecture",
    architectureTitle: "Five layers, one defensible core.",
    featuresLabel: "Features & capabilities",
    featuresTitle: "What Adopters Intelligent enables.",
    impactLabel: "Impact",
    impactTitle: "Why Adopters Intelligent matters.",
    ctaTitle: "Need a demo or early access?",
    ctaBody: "See how Adopters Intelligent or Pulse can fit your institution, use case, and data environment.",
    ctaAssessment: "Take assessment"
  },
  ar: {
    heroLabel: "المنتجات",
    heroTitleBefore: "منتجات Adopters الذكية ",
    heroTitleAccent1: "بأدوار تشغيلية",
    heroTitleMiddle: " و",
    heroTitleAccent2: "حالات تفعيل واضحة.",
    heroBody: "تساعد منتجات Adopters المؤسسات على تحويل البيانات المعقدة إلى رؤى جاهزة لاتخاذ القرار، ثم مراقبة أنظمة الذكاء الاصطناعي بعد تشغيلها.",
    discoverMore: "اكتشف المزيد",
    requestDemo: "اطلب عرضاً توضيحياً",
    heroCardTitle: "Adopters Intelligent",
    liveStatus: "مباشر — قيد التطوير",
    heroCardBody: "منصة ذكاء مؤسسية قابلة للتخصيص بالهوية البصرية للمؤسسات التي تحتاج إلى لوحات معلومات، وإحاطات دورية، وذكاء قائم على الرسوم البيانية المعرفية، ومنتجات تحمل علامتها التجارية.",
    sectionBody: "منصة استخبارات معلوماتية مخصصة تساعد المؤسسات على جمع البيانات، وربط العلاقات والارتباطات، وتقديم رؤى جاهزة لاتخاذ القرار تحت هويتها التجارية الخاصة.",
    architectureLabel: "هيكلية المنصة",
    architectureTitle: "خمس طبقات، نواة واحدة قوية.",
    featuresLabel: "الميزات والإمكانات",
    featuresTitle: "ما الذي توفره Adopters Intelligent؟",
    impactLabel: "التأثير",
    impactTitle: "لماذا Adopters Intelligent؟",
    ctaTitle: "هل تحتاج إلى عرض توضيحي أو وصول مبكر؟",
    ctaBody: "تعرف على مدى ملاءمة Adopters Intelligent أو Pulse لمؤسستك وحالتك الاستخدامية وبيئة بياناتك.",
    ctaAssessment: "ابدأ التقييم"
  }
} as const;

function ProductMetaCard({
  items,
  dark = false
}: {
  items: readonly (readonly [string, string])[];
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-7 md:p-[29px] ${
        dark ? "border-white/10 bg-brand-card text-white" : "border-border-light bg-white text-[#031915]"
      }`}
    >
      {items.map(([label, value], index) => (
        <div
          className={`flex items-center justify-between gap-8 py-3 text-sm ${
            index < items.length - 1 ? (dark ? "border-b border-white/10" : "border-b border-border-light") : ""
          }`}
          key={label}
        >
          <span className={dark ? "text-muted-dark" : "text-muted-light"}>{label}</span>
          <strong className={`text-end text-[15px] font-extrabold ${!dark && index === items.length - 1 ? "text-gradient-green" : ""}`}>
            {value}
          </strong>
        </div>
      ))}
    </div>
  );
}

function FeatureCard({
  feature,
  dark = false
}: {
  feature: readonly [string, string, string];
  dark?: boolean;
}) {
  const [number, title, body] = feature;

  return (
    <article
      className={`h-full rounded-[14px] border p-[26px] ${
        dark ? "border-white/10 bg-brand-card text-white" : "border-border-light bg-white text-[#031915]"
      }`}
    >
      <p className={`text-[11px] font-black tracking-[0.12em] ${dark ? "text-brand-green" : "text-[#1d695e]"}`}>{number}</p>
      <h3 className="mt-2 text-[22px] font-black leading-[1.25]">{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-muted-dark" : "text-muted-light"}`}>{body}</p>
    </article>
  );
}

function ImpactCard({
  item,
  dark = false,
  isAr = false
}: {
  item: readonly [string, string, string];
  dark?: boolean;
  isAr?: boolean;
}) {
  const [label, title, body] = item;

  return (
    <article className={`p-[29px] ${dark ? "text-white" : "text-[#031915]"}`}>
      <p className={`text-[11px] font-black uppercase tracking-[0.16em] ${dark ? "text-brand-green" : "text-[#1d695e]"}`}>{label}</p>
      <h3 className={`mt-3 font-black leading-[1.2] ${isAr ? "text-xl" : "text-2xl"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-muted-dark" : "text-muted-light"}`}>{body}</p>
    </article>
  );
}

function ArchitectureLayers({
  isAr,
  layers
}: {
  isAr: boolean;
  layers: readonly (readonly [string, string, string])[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(37,217,157,0.08)] bg-white">
      {layers.map(([layer, title, body], index) => (
        <div
          className={`grid min-h-[112px] items-center gap-4 px-6 py-6 md:gap-6 md:py-0 md:grid-cols-[76px_240px_1fr] md:px-0 ${
            index < layers.length - 1 ? "border-b border-[rgba(37,217,157,0.08)]" : ""
          } ${isAr ? "bg-[linear-gradient(270deg,rgba(91,228,94,0.08)_0%,#ffffff_36%)]" : "bg-[linear-gradient(90deg,rgba(91,228,94,0.08)_0%,#ffffff_36%)]"}`}
          key={layer}
        >
          <div className="flex justify-start md:justify-center">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(100deg,rgba(91,228,94,0.5)_0%,rgba(37,217,157,0.5)_100%)] text-xs font-black text-[#031915]">
              {layer}
            </span>
          </div>
          <h3 className="text-xl font-black text-[#031915] md:px-[26px]">{title}</h3>
          <p className="text-[15px] leading-6 text-[#4a5c57] md:px-[58px]">{body}</p>
        </div>
      ))}
    </div>
  );
}

function ProductsHero({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";
  const heroProductTags = isAr ? heroProductTagsAr : heroProductTagsEn;

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
      <Container className={`relative z-10 grid min-h-[552px] items-center gap-14 lg:grid-cols-[1fr_0.96fr] ${isAr ? "text-right" : ""}`}>
        <div className="max-w-[540px]">
          <Label dark>{content.heroLabel}</Label>
          <h1 className={`mt-7 font-black tracking-normal ${isAr ? "text-[38px] md:text-[50px]" : "text-[40px] leading-[1.05] md:text-[52px]"}`}>
            {content.heroTitleBefore}
            <span className="text-gradient-green">{content.heroTitleAccent1}</span>
            {content.heroTitleMiddle}
            <span className="text-gradient-green">{content.heroTitleAccent2}</span>
          </h1>
          <p className="mt-6 max-w-[532px] text-lg leading-8 text-muted-dark">{content.heroBody}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#adopters-intelligent">
              {content.discoverMore} {isAr ? "←" : "→"}
            </Button>
            <Button href="/contact" variant="outline">
              {content.requestDemo}
            </Button>
          </div>
        </div>
        <article className="flex w-full max-w-[539px] flex-col items-start justify-self-end gap-[26px] rounded-[28px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-[34px] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <h2 className="text-[26px] font-black leading-tight">{content.heroCardTitle}</h2>
            <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand-mint/[0.32] bg-[#0a2e27] px-[15px] py-[9px] text-[11px] font-extrabold uppercase tracking-[0.88px] text-[#25d99d]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {content.liveStatus}
            </span>
          </div>
          <p className="max-w-[455px] text-base leading-7 text-muted-dark">{content.heroCardBody}</p>
          <div className="flex flex-wrap gap-2">
            {heroProductTags.map((tag) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-semibold text-white opacity-[0.78]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}

function IntelligentSection({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";
  const intelligentMeta = isAr ? intelligentMetaAr : intelligentMetaEn;
  const architectureLayers = isAr ? architectureLayersAr : architectureLayersEn;
  const intelligentFeatures = isAr ? intelligentFeaturesAr : intelligentFeaturesEn;
  const intelligentImpact = isAr ? intelligentImpactAr : intelligentImpactEn;

  return (
    <section className="bg-paper py-24 text-[#031915] md:py-[92px]" id="adopters-intelligent">
      <Container className={isAr ? "text-right" : ""}>
        <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:gap-[56px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/[0.32] bg-[#e8f8f2] px-[13px] py-2 text-[11px] font-extrabold uppercase tracking-[0.88px] text-[#1d695e]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              {content.liveStatus}
            </span>
            <h2 className="mt-5 text-[44px] font-black leading-[1] md:text-[64px]">
              Adopters <span className="font-light">Intelligent</span>
            </h2>
            <p className="mt-5 max-w-[586px] text-lg leading-8 text-muted-light">{content.sectionBody}</p>
          </div>
          <ProductMetaCard items={intelligentMeta} />
        </div>

        <AnimateIn className="mt-16" variant="up">
          <Label>{content.architectureLabel}</Label>
          <h3 className="mt-4 max-w-[532px] text-[34px] font-black leading-[1.15]">{content.architectureTitle}</h3>
          <div className="mt-8">
            <ArchitectureLayers isAr={isAr} layers={architectureLayers} />
          </div>
        </AnimateIn>

        <div className="mt-16">
          <AnimateIn variant="up">
            <Label>{content.featuresLabel}</Label>
            <h3 className="mt-4 text-[34px] font-black leading-[1.15]">{content.featuresTitle}</h3>
          </AnimateIn>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {intelligentFeatures.map((feature, index) => (
              <AnimateIn delay={index * 80} key={feature[0]} variant="up">
                <FeatureCard feature={feature} />
              </AnimateIn>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <AnimateIn variant="up">
            <Label>{content.impactLabel}</Label>
            <h3 className="mt-4 text-[34px] font-black leading-[1.15]">{content.impactTitle}</h3>
          </AnimateIn>
          <div className="mt-8 overflow-hidden rounded-[18px] border border-border-light bg-white md:grid md:grid-cols-3">
            {intelligentImpact.map((item, index) => (
              <AnimateIn delay={index * 120} key={item[0]} variant="up">
                <div className={`h-full ${index < intelligentImpact.length - 1 ? "border-b border-border-light md:border-b-0 md:border-e" : ""}`}>
                  <ImpactCard isAr={isAr} item={item} />
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductsCTA({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";

  return (
    <section className="bg-brand-dark py-24">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#52f35f_0%,#46ef93_58%,#55efbd_100%)] p-8 text-[#031915] md:p-14">
          <div className="grid gap-8 md:grid-cols-[1fr_345px] md:items-center">
            <div className={isAr ? "text-right" : ""}>
              <h2 className="text-3xl font-black md:text-[38px]">{content.ctaTitle}</h2>
              <p className="mt-4 max-w-[600px] text-sm font-semibold leading-6 text-[#083429] opacity-80">{content.ctaBody}</p>
            </div>
            <div className="grid gap-3">
              <Button className="w-full !text-white" href="/contact" variant="dark">
                {content.requestDemo} {isAr ? "←" : "→"}
              </Button>
              <Button className="w-full" href="/assessment" variant="light">
                {content.ctaAssessment}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProductsPage() {
  const [locale, setLocale] = usePersistentLocale();

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader active="Products" locale={locale} setLocale={setLocale} />
      <main>
        <ProductsHero locale={locale} />
        <IntelligentSection locale={locale} />
        <ProductsCTA locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
