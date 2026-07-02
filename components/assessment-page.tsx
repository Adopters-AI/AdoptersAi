"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/animate-in";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import { Container, Label } from "@/components/ui";
import watermarkLogo from "@/assets/watermark.png.png";

const stepsEn = [
  {
    number: "QUESTION 1",
    title: "What industry are you in?",
    subtitle: "This helps map the recommendation to a relevant use-case pattern.",
    options: [
      { id: "finance", title: "Finance / Legal / Compliance", body: "Risk, compliance, regulatory, contracts, fraud." },
      { id: "healthcare", title: "Healthcare / Public", body: "Service delivery, triage, document intelligence." },
      { id: "retail", title: "Retail / Consumer", body: "Demand, pricing, customer engagement." },
      { id: "manufacturing", title: "Manufacturing / Industrial", body: "Copilots, AIops, knowledge search." },
    ],
  },
  {
    number: "QUESTION 2",
    title: "What is your main AI challenge?",
    subtitle: "Choose the issue that best describes your current situation.",
    options: [
      { id: "roadmap", title: "We need a roadmap", body: "We know AI matters but need clarity and prioritization." },
      { id: "data", title: "Our data is scattered", body: "We need one intelligence layer across many sources." },
      { id: "build", title: "We need to build", body: "We have a use case and need implementation support." },
      { id: "monitoring", title: "We need monitoring", body: "AI is live or close to launch and needs operations." },
    ],
  },
  {
    number: "QUESTION 3",
    title: "Where are you in your AI journey?",
    subtitle: "This helps decide whether to start with strategy, build, or operations.",
    options: [
      { id: "exploring", title: "Just exploring", body: "We know AI matters but haven't started yet. We need a strategy and a roadmap before anything else." },
      { id: "plan", title: "Have a plan, need to build", body: "Leadership has committed. We have use cases in mind and need engineers and architects to execute." },
      { id: "implementing", title: "Mid-implementation", body: "Team is preparing to build or integrate a system." },
      { id: "scaling", title: "Running AI, want to scale", body: "AI is live and needs monitoring, governance, and improvement." },
    ],
  },
  {
    number: "QUESTION 4",
    title: "What organization size best fits you?",
    subtitle: "The recommended delivery model changes by team size and complexity.",
    options: [
      { id: "small", title: "Small team", body: "Lean team looking for focused guidance or a practical pilot." },
      { id: "midsize", title: "Mid-size organization", body: "Multiple teams, systems, and stakeholders involved." },
      { id: "enterprise", title: "Enterprise", body: "Complex systems, compliance needs, and cross-functional teams." },
      { id: "regulated", title: "Regulated enterprise", body: "High governance, security, audit, or sovereign deployment needs." },
    ],
  },
];

const stepsAr: typeof stepsEn = [
  {
    number: "السؤال الأول",
    title: "ما القطاع الذي تنتمي إليه مؤسستك؟",
    subtitle: "يساعدنا هذا الخيار على مطابقة وتوجيه التوصية النهائية بنمط حالة الاستخدام الأكثر ملاءمة لطبيعة عملك.",
    options: [
      { id: "finance", title: "التمويل / القانون / الامتثال", body: "المخاطر، والامتثال، والمتطلبات التنظيمية، والعقود، ومكافحة الاحتيال." },
      { id: "healthcare", title: "الرعاية الصحية / القطاع العام", body: "تقديم الخدمات، وفرز الحالات، وذكاء المستندات." },
      { id: "retail", title: "التجزئة / المستهلك", body: "الطلب، والتسعير، وتجربة وتفاعل العملاء." },
      { id: "manufacturing", title: "التصنيع / الصناعة", body: "العمليات التشغيلية، والصيانة التنبؤية، وسلاسل الإمداد، وتحسين الكفاءة." },
    ],
  },
  {
    number: "السؤال 2",
    title: "ما التحدي الرئيسي الذي تواجهه في مجال الذكاء الاصطناعي؟",
    subtitle: "اختر الخيار الذي يصف وضع مؤسستك الحالي بشكل أفضل.",
    options: [
      { id: "roadmap", title: "نحتاج إلى مخطط", body: "ندرك أهمية الذكاء الاصطناعي، لكننا بحاجة إلى رؤية واضحة وتحديد الأولويات وخطوات التنفيذ المناسبة." },
      { id: "data", title: "بياناتنا متفرقة", body: "نحتاج إلى طبقة ذكاء موحدة تجمع المعلومات من مصادر متعددة وتربطها معًا." },
      { id: "build", title: "نحتاج إلى البناء والتنفيذ", body: "لدينا حالة استخدام واضحة ونحتاج إلى الدعم اللازم لتطوير الحل وتنفيذه." },
      { id: "monitoring", title: "نحتاج إلى المراقبة والتشغيل", body: "لدينا نظام ذكاء اصطناعي قيد التشغيل أو على وشك الإطلاق، ونحتاج إلى مراقبته وإدارته بشكل مستمر." },
    ],
  },
  {
    number: "السؤال 3",
    title: "أين موقع مؤسستك حالياً في رحلة تبني الذكاء الاصطناعي؟",
    subtitle: "يساعدنا ذلك على تحديد ما إذا كانت نقطة البداية الأنسب هي الاستراتيجية، أو البناء والتنفيذ، أو التشغيل والتحسين.",
    options: [
      { id: "exploring", title: "ما زلنا في مرحلة الاستكشاف", body: "ندرك أهمية الذكاء الاصطناعي، لكننا لم نبدأ بعد. نحتاج إلى استراتيجية واضحة وخارطة طريق قبل اتخاذ أي خطوات تنفيذية." },
      { id: "plan", title: "لدينا خطة ونحتاج إلى التنفيذ", body: "تم اعتماد التوجه من قبل الإدارة، ولدينا أفكار أو حالات استخدام محددة، ونحتاج إلى خبراء ومهندسين لتحويلها إلى حلول عملية." },
      { id: "implementing", title: "في مرحلة التنفيذ", body: "يعمل الفريق حاليًا على التحضير لبناء النظام أو دمجه ضمن الأنظمة الحالية." },
      { id: "scaling", title: "لدينا أنظمة ذكاء اصطناعي قيد التشغيل ونرغب في التوسع", body: "تم تشغيل الحلول بالفعل، ونحتاج إلى المراقبة والحوكمة والتحسين المستمر لضمان الأداء والاستدامة." },
    ],
  },
  {
    number: "السؤال 4",
    title: "ما هو حجم المؤسسة الأكثر توافقاً مع وضعك الحالي؟",
    subtitle: "يتغير نموذج تقديم الخدمات والحلول المقترح بناءً على حجم فريق عملك ومستوى التعقيد التشغيلي.",
    options: [
      { id: "small", title: "فريق صغير", body: "فريق محدود الحجم يبحث عن توجيه عملي أو مشروع تجريبي (Pilot) لإثبات القيمة." },
      { id: "midsize", title: "مؤسسة متوسطة الحجم", body: "تضم عدة فرق وأنظمة وأصحاب مصلحة يحتاجون إلى تنسيق وتعاون مستمر." },
      { id: "enterprise", title: "مؤسسة كبيرة", body: "بيئات عمل أكثر تعقيدًا، تضم أنظمة متعددة ومتطلبات تشغيلية وفرقًا عابرة للإدارات." },
      { id: "regulated", title: "مؤسسة خاضعة لتنظيمات ورقابة عالية", body: "تحتاج إلى مستويات متقدمة من الحوكمة والأمن والتدقيق أو متطلبات نشر سيادية للبيانات." },
    ],
  },
];

// ─── Result definitions derived from actual website content ───────────────────

type ResultKey = "strategy" | "build" | "operate" | "intelligent";

type ResultDef = {
  label: string;
  title: string;
  tagline: string;
  body: string;
  readinessPct: number;
  nextSteps: string[];
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
};

const resultsEn: Record<ResultKey, ResultDef> = {
  strategy: {
    label: "01 · AI Strategy & Roadmap",
    title: "AI Strategy & Roadmap",
    tagline: "Plan before you build.",
    body: "Start with readiness, governance, prioritization, and a sequenced roadmap before large implementation spend.",
    readinessPct: 42,
    nextSteps: [
      "AI Readiness Assessment (2–4 weeks) — diagnostic across data, infrastructure, talent, and governance to identify high-value AI opportunities and blockers.",
      "AI Investment Roadmap (4–6 weeks) — prioritized 18–36 month roadmap with business cases, dependencies, and ROI logic. Board-ready.",
      "AI Center of Excellence Design — operating model, team structure, tooling, and capability ladder to scale internal AI adoption.",
    ],
    primaryCTA: { label: "Explore AI Strategy →", href: "/services" },
    secondaryCTA: { label: "Book a strategy call", href: "/contact" },
  },
  build: {
    label: "02 · AI Professional Services",
    title: "AI Professional Services",
    tagline: "Build, integrate, deploy.",
    body: "Your answers show you have direction and are ready to execute. Adopters delivers pilots, system integrations, data platforms, and production AI engineering — moving your use cases from plan into production.",
    readinessPct: 71,
    nextSteps: [
      "PoC & Pilot Delivery (8–12 weeks) — structured program from problem definition to a validated working pilot running on real data.",
      "AI Systems Integration (3–6 months) — full-scale AI deployment integrated with enterprise systems, workflows, and existing platforms.",
      "MLOps & AI Engineering (2–4 months) — model versioning, automated retraining pipelines, drift monitoring, and deployment workflows.",
    ],
    primaryCTA: { label: "Explore Professional Services →", href: "/services" },
    secondaryCTA: { label: "Book a build consultation", href: "/contact" },
  },
  operate: {
    label: "03 · AI Managed Services",
    title: "AI Managed Services",
    tagline: "Keep it running. Keep it improving.",
    body: "AI is already live or close to launch in your organization. Adopters Managed Services keeps your models monitored, retrained, compliant, and continuously improving — with SLA-backed operations and a dedicated AI support pod.",
    readinessPct: 88,
    nextSteps: [
      "AI Operations & Monitoring — model health monitoring, drift detection, performance alerts, and incident response for live systems.",
      "Continuous Retraining — scheduled retraining cycles, evaluation, controlled rollouts, and rollback safety nets as data changes.",
      "Dedicated AI Support Pod — flexible team of AI, data, and platform specialists working alongside your internal team on an ongoing basis.",
    ],
    primaryCTA: { label: "Explore Managed Services →", href: "/services" },
    secondaryCTA: { label: "Book an operations review", href: "/contact" },
  },
  intelligent: {
    label: "Product · Adopters Intelligent",
    title: "Adopters Intelligent",
    tagline: "One intelligence layer across all your data.",
    body: "Your profile points to a need for an institutional intelligence platform. Adopters Intelligent turns scattered information from documents, APIs, and feeds into decision-ready intelligence — delivered under your brand with full data sovereignty across the Levant and GCC.",
    readinessPct: 58,
    nextSteps: [
      "Request a product walkthrough to see GraphRAG intelligence working across Arabic and English institutional data sources.",
      "Discuss white-label deployment options — cloud, sovereign, or hybrid — for your institution or partner network.",
      "Pair with an AI Strategy engagement to build the governance and adoption roadmap alongside the platform rollout.",
    ],
    primaryCTA: { label: "Explore Adopters Intelligent →", href: "/products" },
    secondaryCTA: { label: "Request a demo", href: "/contact" },
  },
};

const resultsAr: Record<ResultKey, ResultDef> = {
  strategy: {
    label: "01 · إستراتيجية الذكاء الاصطناعي وبناء المخطط",
    title: "إستراتيجية الذكاء الاصطناعي وبناء المخطط",
    tagline: "خطط قبل أن تبني.",
    body: "ابدأ بتقييم الجاهزية، ووضع إطار الحوكمة، وتحديد الأولويات، وبناء خارطة طريق متسلسلة قبل الاستثمار في مشاريع تنفيذية واسعة النطاق.",
    readinessPct: 42,
    nextSteps: [
      "تقييم جاهزية الذكاء الاصطناعي (2–4 أسابيع) — تقييم شامل للبيانات والبنية التحتية والكفاءات والحوكمة لتحديد الفرص ذات القيمة العالية والعوائق المحتملة.",
      "مخطط الاستثمار في الذكاء الاصطناعي (4–6 أسابيع) — خارطة طريق مرتبة حسب الأولوية لمدة 18–36 شهرًا تتضمن حالات الأعمال، والاعتماديات، ومنطق العائد على الاستثمار، وجاهزة لعرضها على الإدارة التنفيذية.",
      "تصميم مركز التميز للذكاء الاصطناعي — نموذج التشغيل، وهيكل الفريق، والأدوات، ومسار تطوير القدرات اللازمة لتوسيع تبني الذكاء الاصطناعي داخليًا.",
    ],
    primaryCTA: { label: "استكشف إستراتيجية الذكاء الاصطناعي ←", href: "/services" },
    secondaryCTA: { label: "احجز مكالمة استراتيجية", href: "/contact" },
  },
  build: {
    label: "02 · الخدمات الاحترافية للذكاء الاصطناعي",
    title: "الخدمات الاحترافية للذكاء الاصطناعي",
    tagline: "البناء، التكامل، والنشر.",
    body: "تُظهر إجاباتك أن لديك رؤية واضحة وأنك مستعد للتنفيذ. تقدم Adopters مشاريع تجريبية، وتكاملات للأنظمة، ومنصات بيانات، وهندسة إنتاجية للذكاء الاصطناعي — لنقل حالات الاستخدام لديك من مرحلة التخطيط إلى التشغيل الفعلي.",
    readinessPct: 71,
    nextSteps: [
      "تنفيذ إثبات المفهوم والنماذج التجريبية (8–12 أسبوعًا) — برنامج منظم يبدأ بتحديد المشكلة وينتهي بنموذج تجريبي يعمل على بيانات حقيقية.",
      "تكامل أنظمة الذكاء الاصطناعي (3–6 أشهر) — تنفيذ متكامل للذكاء الاصطناعي وربطه بالأنظمة وسير العمل والمنصات القائمة.",
      "هندسة الذكاء الاصطناعي وعمليات MLOps (2–4 أشهر) — إدارة إصدارات النماذج، وخطوط إعادة التدريب الآلية، ومراقبة الانحراف، وعمليات النشر.",
    ],
    primaryCTA: { label: "استكشف الخدمات الاحترافية ←", href: "/services" },
    secondaryCTA: { label: "احجز استشارة تنفيذية", href: "/contact" },
  },
  operate: {
    label: "03 · الخدمات المُدارة للذكاء الاصطناعي",
    title: "الخدمات المُدارة للذكاء الاصطناعي",
    tagline: "ضمان استمرارية التشغيل. ومواصلة التطوير.",
    body: "الذكاء الاصطناعي قيد التشغيل بالفعل أو على وشك الإطلاق في مؤسستك. تحافظ خدمات Adopters المُدارة على مراقبة نماذجك، وإعادة تدريبها، وامتثالها، وتحسينها المستمر — بعمليات مدعومة باتفاقية مستوى خدمة وفريق دعم مخصص للذكاء الاصطناعي.",
    readinessPct: 88,
    nextSteps: [
      "عمليات ومراقبة الذكاء الاصطناعي — مراقبة سلامة النماذج، ورصد الانحراف، وتنبيهات الأداء، والاستجابة للحوادث في الأنظمة المشغلة فعليًا.",
      "إعادة التدريب المستمرة — دورات إعادة تدريب مجدولة، وتقييمات دورية، وعمليات نشر وتحكم آمنة مع تغير البيانات.",
      "فريق دعم متخصص للذكاء الاصطناعي — فريق مرن من خبراء الذكاء الاصطناعي والبيانات والمنصات يعمل جنبًا إلى جنب مع فريقك الداخلي بشكل مستمر.",
    ],
    primaryCTA: { label: "استكشف الخدمات المُدارة ←", href: "/services" },
    secondaryCTA: { label: "احجز مراجعة تشغيلية", href: "/contact" },
  },
  intelligent: {
    label: "المنتج · Adopters Intelligent",
    title: "Adopters Intelligent",
    tagline: "طبقة ذكاء موحدة عبر جميع بياناتك.",
    body: "يشير ملفك إلى حاجة لمنصة ذكاء مؤسسية. تحوّل Adopters Intelligent المعلومات المتفرقة من المستندات وواجهات البرمجة والتغذيات البيانية إلى ذكاء جاهز لاتخاذ القرار — تُقدَّم بهويتك التجارية الخاصة مع سيادة كاملة للبيانات عبر بلاد الشام والخليج.",
    readinessPct: 58,
    nextSteps: [
      "اطلب جلسة استعراض للمنتج للاطلاع على عمل ذكاء GraphRAG عبر مصادر البيانات المؤسسية العربية والإنجليزية.",
      "ناقش خيارات النشر بعلامة تجارية خاصة — سحابي، أو سيادي، أو هجين — لمؤسستك أو شبكة شركائك.",
      "اجمع بين هذا الحل ومشروع إستراتيجية للذكاء الاصطناعي لبناء خارطة طريق الحوكمة والتبني إلى جانب نشر المنصة.",
    ],
    primaryCTA: { label: "استكشف Adopters Intelligent ←", href: "/products" },
    secondaryCTA: { label: "اطلب عرضاً توضيحياً", href: "/contact" },
  },
};

// ─── Answer context labels ────────────────────────────────────────────────────

const industryLabelEn: Record<string, string> = {
  finance: "Finance / Legal",
  healthcare: "Healthcare / Public Sector",
  retail: "Retail & Consumer",
  manufacturing: "Manufacturing & Industrial",
};

const industryLabelAr: Record<string, string> = {
  finance: "التمويل / القانون",
  healthcare: "الرعاية الصحية / القطاع العام",
  retail: "التجزئة والمستهلك",
  manufacturing: "التصنيع والصناعة",
};

const challengeLabelEn: Record<string, string> = {
  roadmap: "the need for a clear roadmap",
  data: "the need for one intelligence layer across scattered data",
  build: "readiness to implement — needs build support",
  monitoring: "live AI that needs operations and monitoring",
};

const challengeLabelAr: Record<string, string> = {
  roadmap: "الحاجة إلى خارطة طريق واضحة",
  data: "الحاجة إلى طبقة ذكاء موحدة للبيانات المتفرقة",
  build: "الجاهزية للتنفيذ والحاجة إلى دعم البناء",
  monitoring: "ذكاء اصطناعي مُشغّل يحتاج إلى تشغيل ومراقبة",
};

const sizeLabelEn: Record<string, string> = {
  small: "a small organization",
  midsize: "a mid-size organization",
  enterprise: "an enterprise",
  regulated: "a regulated enterprise",
};

const sizeLabelAr: Record<string, string> = {
  small: "المؤسسات الصغيرة",
  midsize: "المؤسسات المتوسطة الحجم",
  enterprise: "المؤسسات الكبيرة",
  regulated: "المؤسسات الخاضعة لتنظيمات ورقابة عالية",
};

const sizeLabelArWithLam: Record<string, string> = {
  small: "للمؤسسات الصغيرة",
  midsize: "للمؤسسات المتوسطة الحجم",
  enterprise: "للمؤسسات الكبيرة",
  regulated: "للمؤسسات الخاضعة لتنظيمات ورقابة عالية",
};

const pageCopy = {
  en: {
    heroLabel: "AI Assessment",
    heroTitleBefore: "Find your best AI path in ",
    heroTitleAccent: "60 seconds.",
    heroBody: "Answer four quick questions and get a recommended starting point: Strategy, Build, Operate, Adopters Intelligent.",
    back: "Back",
    next: "Next",
    seeRecommendation: "See recommendation",
    recommendedPath: "Recommended path",
    whyThisFits: "Why this fits your answers",
    industryContext: "Industry context",
    mainChallenge: "Main challenge",
    deliveryModelFits: "Recommended delivery model fits",
    suggestedNextSteps: "Suggested next steps",
    aiReadiness: "AI Readiness",
    startOver: "← Start over",
  },
  ar: {
    heroLabel: "تقييم الذكاء الاصطناعي",
    heroTitleBefore: "اكتشف مسار الذكاء الاصطناعي الأنسب لمؤسستك ",
    heroTitleAccent: "في 60 ثانية.",
    heroBody: "أجب عن أربعة أسئلة سريعة واحصل على توصية مخصصة لنقطة الانطلاق الأنسب لمؤسستك: الاستراتيجية، البناء، التشغيل، أو Adopters Intelligent.",
    back: "رجوع",
    next: "التالي",
    seeRecommendation: "عرض التوصية",
    recommendedPath: "المسار الموصى به",
    whyThisFits: "لماذا يناسبك هذا المسار",
    industryContext: "سياق القطاع",
    mainChallenge: "التحدي الرئيسي",
    deliveryModelFits: "نموذج التنفيذ الموصى به: مناسب",
    suggestedNextSteps: "الخطوات التالية المقترحة",
    aiReadiness: "الجاهزية للAI",
    startOver: "→ إعادة البدء",
  }
} as const;

// ─── Scoring ──────────────────────────────────────────────────────────────────

type Answers = Record<number, string>;

function scoreAnswers(answers: Answers): ResultKey {
  const score: Record<ResultKey, number> = { strategy: 0, build: 0, operate: 0, intelligent: 0 };

  // Q1: industry — finance and healthcare are institutional data-heavy → Intelligent boost
  const industry = answers[0];
  if (industry === "finance" || industry === "healthcare") score.intelligent += 2;
  if (industry === "retail" || industry === "manufacturing") score.build += 1;

  // Q2: challenge — strongest signal
  const challenge = answers[1];
  if (challenge === "roadmap") score.strategy += 3;
  if (challenge === "data") score.intelligent += 3;
  if (challenge === "build") score.build += 3;
  if (challenge === "monitoring") score.operate += 3;

  // Q3: journey — second strongest signal
  const journey = answers[2];
  if (journey === "exploring") score.strategy += 3;
  if (journey === "plan") score.build += 2;
  if (journey === "implementing") score.build += 3;
  if (journey === "scaling") score.operate += 3;

  // Q4: size — tiebreaker modifier
  const size = answers[3];
  if (size === "small") score.strategy += 1;
  if (size === "midsize") score.build += 1;
  if (size === "enterprise") score.operate += 1;
  if (size === "regulated") { score.strategy += 1; score.operate += 1; }

  const winner = (Object.entries(score) as [ResultKey, number][]).reduce(
    (best, [key, val]) => (val > best[1] ? [key, val] : best),
    ["strategy", -1] as [ResultKey, number]
  );

  return winner[0];
}

// ─── Components ───────────────────────────────────────────────────────────────

function DonutChart({ pct, label, isAr }: { pct: number; label: string; isAr: boolean }) {
  const r = 58;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div className="relative flex h-[156px] w-[156px] shrink-0 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" height="156" viewBox="0 0 156 156" width="156">
        <circle cx="78" cy="78" fill="none" r={r} stroke="#1B3B31" strokeWidth="16" />
        <circle
          cx="78"
          cy="78"
          fill="none"
          r={r}
          stroke="#68DB7D"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="16"
        />
      </svg>
      <div className="relative max-w-[110px] text-center">
        <p className="text-[28px] font-black leading-none" style={{ color: "#F3F5F4" }}>
          {pct}%
        </p>
        <p
          className={`mt-1.5 text-[9px] font-black leading-tight ${isAr ? "" : "uppercase tracking-[0.13em]"}`}
          style={{ color: "#889B94" }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

function AssessmentHero({ locale }: { locale: Locale }) {
  const content = pageCopy[locale];
  const isAr = locale === "ar";

  return (
    <section className="hero-grid relative overflow-hidden py-16 md:py-[68px]" style={{ backgroundColor: "#071F19" }}>
      <img
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 w-[52%] max-w-[800px] select-none opacity-[0.38] ${isAr ? "left-0 -scale-x-100" : "right-0"}`}
        src={watermarkLogo.src}
      />
      <Container className={`relative z-10 ${isAr ? "text-right" : ""}`}>
        <AnimateIn variant="up">
          <Label dark>{content.heroLabel}</Label>
          <h1 className="mt-6 max-w-[680px] text-[40px] font-black leading-[1.05] md:text-[60px]" style={{ color: "#F3F5F4" }}>
            {content.heroTitleBefore}
            <em className="not-italic" style={{ color: "#68DB7D" }}>{content.heroTitleAccent}</em>
          </h1>
          <p className="mt-5 max-w-[520px] text-base leading-7" style={{ color: "#C7D0CB" }}>
            {content.heroBody}
          </p>
        </AnimateIn>
      </Container>
    </section>
  );
}

function OptionCard({
  option,
  selected,
  onSelect,
  isAr,
}: {
  option: { id: string; title: string; body: string };
  selected: boolean;
  onSelect: () => void;
  isAr: boolean;
}) {
  return (
    <button
      className={`rounded-2xl border p-5 transition-all duration-150 ${isAr ? "text-right" : "text-left"}`}
      onClick={onSelect}
      style={{
        backgroundColor: selected ? "#1C533F" : "#102B24",
        borderColor: selected ? "#68DB7D" : "#1B3B31",
        color: "#F3F5F4",
      }}
      type="button"
    >
      <p className="text-[15px] font-black" style={{ color: "#F3F5F4" }}>
        {option.title}
      </p>
      <p className="mt-1.5 text-[13px] leading-5" style={{ color: "#C7D0CB" }}>
        {option.body}
      </p>
    </button>
  );
}

function ResultPanel({
  locale,
  resultKey,
  steps,
  answers,
  onReset,
}: {
  locale: Locale;
  resultKey: ResultKey;
  steps: typeof stepsEn;
  answers: Answers;
  onReset: () => void;
}) {
  const isAr = locale === "ar";
  const content = pageCopy[locale];
  const result = (isAr ? resultsAr : resultsEn)[resultKey];
  const industryLabel = isAr ? industryLabelAr : industryLabelEn;
  const challengeLabel = isAr ? challengeLabelAr : challengeLabelEn;
  const sizeLabel = isAr ? sizeLabelArWithLam : sizeLabelEn;

  const industry = industryLabel[answers[0]] ?? industryLabel.finance;
  const challenge = challengeLabel[answers[1]] ?? challengeLabel.roadmap;
  const size = sizeLabel[answers[3]] ?? sizeLabel.small;

  return (
    <section className="pb-24 pt-10 md:pb-[92px]" style={{ backgroundColor: "#0C241D" }}>
      <Container className={isAr ? "text-right" : ""}>
        <div className="mx-auto max-w-[752px]">
          {/* Progress: all complete */}
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className="h-[3px] flex-1 rounded-full" style={{ backgroundColor: "#68DB7D" }} />
            ))}
          </div>

          {/* Result card */}
          <div className="mt-6 rounded-2xl border p-7 md:p-10" style={{ backgroundColor: "#102E26", borderColor: "#23483D" }}>

            {/* Header row: label + donut */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: "#68DB7D" }}>
                  {content.recommendedPath}
                </p>
                <p className="mt-1 text-[11px] font-semibold" style={{ color: "#889B94" }}>
                  {result.label}
                </p>
                <h2 className="mt-4 text-[34px] font-black leading-[1.02] md:text-[46px]" style={{ color: "#F3F5F4" }}>
                  {result.title}
                </h2>
                <p className="mt-1.5 text-[15px] font-bold" style={{ color: "#68DB7D" }}>
                  {result.tagline}
                </p>
              </div>
              <div className="flex justify-center md:block">
                <DonutChart isAr={isAr} label={content.aiReadiness} pct={result.readinessPct} />
              </div>
            </div>

            {/* Explanation */}
            <p className="mt-5 text-[15px] leading-7" style={{ color: "#C7D0CB" }}>
              {result.body}
            </p>

            {/* Why this fits */}
            <div className="mt-6 rounded-xl border p-5" style={{ borderColor: "#1B3B31", backgroundColor: "#081D17" }}>
              <p className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: "#68DB7D" }}>
                {content.whyThisFits}
              </p>
              <ul className="mt-3 space-y-2.5">
                {[
                  `${content.industryContext}: ${industry}`,
                  `${content.mainChallenge}: ${challenge}`,
                  `${content.deliveryModelFits} ${size}.`,
                ].map((item) => (
                  <li className="flex items-start gap-3 text-[13px] leading-5" key={item} style={{ color: "#C7D0CB" }}>
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#68DB7D" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested next steps */}
            <div className="mt-6">
              <p className="text-[10px] font-black uppercase tracking-[0.14em]" style={{ color: "#889B94" }}>
                {content.suggestedNextSteps}
              </p>
              <ol className="mt-3 space-y-3">
                {result.nextSteps.map((step, i) => (
                  <li className="flex items-start gap-3 text-[13px] leading-5" key={i} style={{ color: "#C7D0CB" }}>
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black"
                      style={{ backgroundColor: "#1B3B31", color: "#68DB7D" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full px-7 text-sm font-extrabold transition"
                href={result.primaryCTA.href}
                style={{ backgroundColor: "#68DB7D", color: "#031915" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#5FFF7D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#68DB7D"; }}
              >
                {result.primaryCTA.label}
              </a>
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-full border px-7 text-sm font-extrabold transition"
                href={result.secondaryCTA.href}
                style={{ borderColor: "#23483D", color: "#F3F5F4" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#68DB7D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#23483D"; }}
              >
                {result.secondaryCTA.label}
              </a>
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              className="text-sm transition hover:opacity-80"
              onClick={onReset}
              style={{ color: "#889B94" }}
              type="button"
            >
              {content.startOver}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuizSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const content = pageCopy[locale];
  const steps = isAr ? stepsAr : stepsEn;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const selected = answers[step];
  const isLast = step === steps.length - 1;

  function handleNext() {
    if (!selected) return;
    if (isLast) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  if (done) {
    return (
      <ResultPanel
        answers={answers}
        locale={locale}
        onReset={handleReset}
        resultKey={scoreAnswers(answers)}
        steps={steps}
      />
    );
  }

  return (
    <section className="pb-24 pt-10 md:pb-[92px]" style={{ backgroundColor: "#0C241D" }}>
      <Container className={isAr ? "text-right" : ""}>
        <div className="mx-auto max-w-[752px]">
          {/* Progress bars */}
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-[3px] flex-1 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i <= step ? "#68DB7D" : "#1B3B31" }}
              />
            ))}
          </div>

          {/* Question card */}
          <div
            className="mt-6 rounded-2xl border p-7 md:p-8"
            style={{ backgroundColor: "#102E26", borderColor: "#23483D" }}
          >
            <p className="text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: "#68DB7D" }}>
              {current.number}
            </p>
            <h2
              className="mt-2 text-[26px] font-black leading-[1.1] md:text-[34px]"
              style={{ color: "#F3F5F4" }}
            >
              {current.title}
            </h2>
            <p className="mt-2 text-sm leading-6" style={{ color: "#889B94" }}>
              {current.subtitle}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {current.options.map((opt) => (
                <OptionCard
                  isAr={isAr}
                  key={opt.id}
                  onSelect={() => setAnswers((a) => ({ ...a, [step]: opt.id }))}
                  option={opt}
                  selected={selected === opt.id}
                />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-5 flex items-center justify-between">
            <button
              className="rounded-full border px-6 py-2.5 text-sm font-extrabold transition"
              disabled={step === 0}
              onClick={handleBack}
              style={{
                borderColor: step === 0 ? "#1B3B31" : "#23483D",
                color: step === 0 ? "#889B94" : "#F3F5F4",
                opacity: step === 0 ? 0.45 : 1,
                cursor: step === 0 ? "default" : "pointer",
              }}
              type="button"
            >
              {content.back}
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-full px-8 py-2.5 text-sm font-extrabold transition"
              disabled={!selected}
              onClick={handleNext}
              style={{
                backgroundColor: selected ? "#68DB7D" : "#0a2e27",
                color: selected ? "#031915" : "#889B94",
                opacity: selected ? 1 : 0.6,
                cursor: selected ? "pointer" : "default",
              }}
              type="button"
            >
              {isLast ? content.seeRecommendation : content.next} {isAr ? "←" : "→"}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function AssessmentPage() {
  const [locale, setLocale] = usePersistentLocale();
  const isAr = locale === "ar";

  return (
    <div dir={isAr ? "rtl" : "ltr"} lang={locale} style={{ backgroundColor: "#071915" }}>
      <SiteHeader active="" locale={locale} setLocale={setLocale} />
      <main>
        <AssessmentHero locale={locale} />
        <QuizSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
