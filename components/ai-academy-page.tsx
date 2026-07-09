"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/animate-in";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label } from "@/components/ui";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import watermarkLogo from "@/assets/watermark.png.png";

function arrow(locale: Locale) {
  return locale === "ar" ? "←" : "→";
}

const pageCopy = {
  en: {
    heroLabel: "Adopters AI Academy",
    heroTitleBefore: "Practical AI education for teams building",
    heroTitleAccent: "real systems.",
    heroBody:
      "Adopters AI Academy is a coming-soon learning experience for leaders, product teams, engineers, and data teams who need to understand, design, govern, and operate AI in enterprise environments.",
    joinWaitlist: "Join waitlist",
    viewTracks: "View placement topics",
    launchOverview: "Launch overview",
    programPrep: "Program in preparation",
    comingSoonBadge: "Coming soon",
    outcome: "Outcome",
    whyLabel: "Why the AI Academy",
    whyTitle: "AI training should help teams make better decisions and build better systems.",
    whyBody:
      "Teams often need more than awareness sessions. Adopters AI Academy is planned to help organizations build shared AI fluency, practical skills, and responsible adoption habits.",
    tracksLabel: "Planned Learning Tracks",
    tracksTitle: "Three paths for different AI maturity levels.",
    tracksBody:
      "Each planned track is organized around a different audience and maturity level, so visitors can quickly understand the right starting point.",
    trackWord: "Track",
    journeyLabel: "Learning Journey",
    journeyTitle: "A simple path from understanding to application.",
    journeyBody:
      "The AI Academy is designed to move teams from clear understanding to practical application through a simple, structured learning journey.",
    curriculumLabel: "Curriculum Preview",
    curriculumBody:
      "The planned curriculum focuses on the topics teams need most when moving from AI interest to real adoption.",
    moduleWord: "Module",
    formatsLabel: "Planned Formats",
    formatsBody:
      "Delivery formats are planned to support individuals, focused teams, and larger organizations preparing for AI adoption.",
    waitlistLabel: "Join the Waitlist",
    waitlistBody:
      "The AI Academy is coming soon. Share your details to receive updates about launch timing, planned tracks, and enterprise learning options.",
    goodNextStep: "Good next step",
    needHelp: "Need help choosing a track?",
    needHelpBody: "Use the 60-second assessment to identify the best starting point for your organization.",
    takeAssessment: "Take assessment",
    formTitle: "AI Academy waitlist",
    formSubtitle: "Tell us who you are and what your team wants to learn. The program is coming soon.",
    name: "Name",
    namePlaceholder: "Your name",
    workEmail: "Work Email",
    emailPlaceholder: "name@company.com",
    company: "Company",
    companyPlaceholder: "Company / institution",
    role: "Role",
    trackInterest: "Track Interest",
    learnLabel: "What do you want your team to learn?",
    learnPlaceholder: "Briefly describe your team's AI learning needs, use cases, or goals.",
    submit: "Join waitlist"
  },
  ar: {
    heroLabel: "أكاديمية Adopters للذكاء الاصطناعي",
    heroTitleBefore: "تعليم وتأهيل عملي في الذكاء الاصطناعي للفرق التي تبني",
    heroTitleAccent: "أنظمة حقيقية.",
    heroBody:
      "أكاديمية Adopters AI هي تجربة تعليمية رائدة (تنطلق قريباً) مصممة خصيصاً للقادة، فرق المنتجات، المهندسين، وفرق البيانات الساعية إلى استيعاب، تصميم، حوكمة، وتشغيل تقنيات الذكاء الاصطناعي بكفاءة داخل البيئات المؤسسية المعقدة.",
    joinWaitlist: "انضم إلى قائمة الانتظار",
    viewTracks: "عرض المسارات التعليمية المخطط لها",
    launchOverview: "لمحة عن إطلاق الأكاديمية",
    programPrep: "البرنامج في طور الإعداد النهائي",
    comingSoonBadge: "قريبًا",
    outcome: "المخرج النهائي",
    whyLabel: "لماذا أكاديمية الذكاء الاصطناعي؟",
    whyTitle: "تدريب ذكاء اصطناعي يساعد الفرق على اتخاذ قرارات أفضل وبناء أنظمة أفضل.",
    whyBody:
      "غالبًا ما تحتاج الفرق إلى أكثر من جلسات توعوية. تم تصميم Adopters AI Academy لمساعدة المؤسسات على بناء فهم مشترك للذكاء الاصطناعي، ومهارات عملية، وعادات تبنّي مسؤولة.",
    tracksLabel: "المسارات التدريبية المخطط لها",
    tracksTitle: "ثلاثة مسارات مصممة لتناسب مستوى النضج الرقمي لمؤسستك.",
    tracksBody:
      "تم تصميم كل مسار ليلائم فئة مستهدفة ومستوى نضج رقمي محدد، مما يتيح لك تحديد نقطة البداية الأنسب لمؤسستك وفريقك بلمحة سريعة.",
    trackWord: "المسار",
    journeyLabel: "مرحلة التعلم",
    journeyTitle: "من الفهم إلى التطبيق.",
    journeyBody:
      "تم تصميم الأكاديمية لنقل الفرق من الاستيعاب الواضح للمفاهيم إلى التطبيق العملي عبر رحلة تعليمية بسيطة ومنظمة الهيكلية.",
    curriculumLabel: "نظرة على المنهج",
    curriculumBody:
      "يركز المنهج المصمم على تقديم المعرفة والأدوات الجوهرية التي تحتاجها فرق العمل للانتقال من مجرد الاهتمام بالذكاء الاصطناعي إلى مرحلة التطبيق والتبني الفعلي على أرض الواقع.",
    moduleWord: "وحدة تدريبية",
    formatsLabel: "خيارات التدريب المتاحة",
    formatsBody:
      "صُممت مسارات تقديم المحتوى لتلبي احتياجات المهارات الفردية، وورش العمل المركّزة للفرق، وصولاً إلى البرامج الشاملة للمؤسسات الكبرى المستعدة لتبني حلول الذكاء الاصطناعي.",
    waitlistLabel: "انضم إلى قائمة الانتظار",
    waitlistBody:
      "الأكاديمية تفتح أبوابها قريباً! شاركنا تفاصيلك لتكون أول من يعلم بمواعيد الإطلاق، والمسارات التعليمية المتاحة، وخيارات التدريب المخصصة للشركات.",
    goodNextStep: "الخطوة التالية المقترحة",
    needHelp: "هل تحتاج إلى مساعدة في اختيار المسار المناسب؟",
    needHelpBody: "استخدم التقييم السريع لمدة 60 ثانية لتحديد أفضل نقطة انطلاق لمؤسستك.",
    takeAssessment: "ابدأ التقييم",
    formTitle: "قائمة انتظار أكاديمية الذكاء الاصطناعي",
    formSubtitle: "أخبرنا من أنت وماذا يريد فريقك أن يتعلم. البرنامج سيُطلق قريبًا.",
    name: "الاسم",
    namePlaceholder: "اسمك",
    workEmail: "البريد الإلكتروني للعمل",
    emailPlaceholder: "name@company.com",
    company: "الشركة",
    companyPlaceholder: "الشركة / المؤسسة",
    role: "الدور الوظيفي",
    trackInterest: "المسار المهتم به",
    learnLabel: "ماذا تريد أن يتعلم فريقك؟",
    learnPlaceholder: "صف باختصار احتياجات فريقك التعليمية في مجال الذكاء الاصطناعي، أو حالات الاستخدام، أو الأهداف.",
    submit: "انضم إلى قائمة الانتظار"
  }
} as const;

const whyFeaturesEn = [
  {
    title: "Reduce AI confusion",
    body: "Teams often need more than occasional sessions or one-day workshops. Adopters AI Academy gives leaders, practitioners, and builders a shared, accurate mental model of how AI actually works in production."
  },
  {
    title: "Connect business and technical teams",
    body: "AI decisions live at the intersection of strategy, systems, and operations. The curriculum is designed so that both sides of the table can reason and decide together."
  },
  {
    title: "Build with production in mind",
    body: "Most training stops at awareness. Adopters AI Academy focuses on what teams actually need to design, evaluate, deploy, and monitor AI in real enterprise environments."
  }
];

const whyFeaturesAr = [
  {
    title: "تقليل الغموض حول الذكاء الاصطناعي",
    body: "مساعدة فرق العمل على استيعاب القدرات الحقيقية للذكاء الاصطناعي، ومواضع تحقيق القيمة الفعلية، وتحديد العوائق المحتملة مثل جاهزية البيانات أو المخاطر قبل البدء."
  },
  {
    title: "ربط الفرق التقنية وفرق الأعمال",
    body: "بناء لغة مشتركة ومفهوم موحد بين الإدارة التنفيذية، ومديري المنتجات، والمهندسين، وفرق البيانات؛ لضمان تحديد نطاق مبادرات الذكاء الاصطناعي بدقة ووضوح."
  },
  {
    title: "بناء أنظمة جاهزة للإنتاج",
    body: "ترسيخ الممارسات الأساسية لبناء أنظمة ذكاء اصطناعي موثوقة وآمنة؛ من خلال التركيز على آليات التقييم، الحوكمة، المراقبة المستمرة، والمراجعة البشرية لضمان جودة الأداء."
  }
];

const tracksEn = [
  {
    number: "01",
    status: "COMING SOON",
    live: false,
    title: "AI Foundations for Leaders",
    body: "For executives, directors, managers, product owners, and decision-makers. Understand AI capabilities, opportunity mapping, governance basics, vendor evaluation, and how to prioritize use cases responsibly.",
    topics: [
      "AI opportunities and limits",
      "Business case and investment logic",
      "Governance, risk, and responsible AI",
      "Build vs. buy decision-making"
    ],
    outcome: "Make clearer AI decisions and lead initiatives with stronger confidence."
  },
  {
    number: "02",
    status: "COMING SOON",
    live: false,
    title: "Applied AI Engineering",
    body: "For engineers, data teams, product teams, and technical builders. Move from AI concepts to practical workflows including RAG systems, copilots, evaluation, deployment basics, and operational readiness.",
    topics: [
      "RAG and knowledge systems",
      "Prompting, workflow design, and evaluation",
      "Data pipelines and AI integration",
      "Deployment and monitoring foundations"
    ],
    outcome: "Design and prototype AI workflows that are easier to validate and prepare for production."
  },
  {
    number: "03",
    status: "PLANNED",
    live: false,
    title: "Agentic AI Systems",
    body: "For advanced product, data, and engineering teams. Learn how to plan and evaluate multi-step AI workflows with tools, memory, human review, safety controls, and monitoring.",
    topics: [
      "Agent patterns and orchestration",
      "Tool use, context, and memory",
      "Human-in-the-loop design",
      "Safety and production controls"
    ],
    outcome: "Understand how to approach complex AI workflows without losing control or trust."
  }
];

const tracksAr = [
  {
    number: "01",
    status: "قريبًا",
    live: false,
    title: "مبادئ الذكاء الاصطناعي وصناعة القرار (للقادة)",
    body: "الفئة المستهدفة: المدراء التنفيذيون، رؤساء الأقسام، مديرو المنتجات، وصنّاع القرار الاستراتيجي. فهم حقيقي لإمكانات ومحددات الذكاء الاصطناعي، ورسم خرائط الفرص، وأساسيات الحوكمة، بالإضافة إلى تقييم الحلول الخارجية وكيفية تحديد أولويات حالات الاستخدام بمسؤولية وجدوى استثمارية.",
    topics: [
      "فرص وحدود الذكاء الاصطناعي",
      "الجدوى التجارية ومنطق الاستثمار",
      "الحوكمة وإدارة المخاطر",
      "قرار البناء أم الشراء"
    ],
    outcome: "اتخاذ قرارات استراتيجية مدروسة وواضحة، وقيادة مبادرات الذكاء الاصطناعي داخل مؤسستك بثقة ورؤية مستندة إلى واقع السوق التقني."
  },
  {
    number: "02",
    status: "قريبًا",
    live: false,
    title: "هندسة الذكاء الاصطناعي التطبيقي",
    body: "الفئة المستهدفة: المهندسون، فرق البيانات، فرق تطوير المنتجات، والمطورون التقنيون. الانتقال من المفاهيم والنظريات العامة إلى بناء مسارات عمل عملية وتطبيقية؛ تشمل تطوير أنظمة التوليد المعزز بالاسترجاع (RAG)، المساعدين الأذكياء (Copilots)، آليات التقييم، وأساسيات النشر والجاهزية التشغيلية للأنظمة.",
    topics: [
      "أنظمة الـ RAG وقواعد المعرفة",
      "هندسة الأوامر وتصميم مسارات العمل",
      "خطوط تدفق البيانات وتكامل الأنظمة",
      "أساسيات النشر والمراقبة"
    ],
    outcome: "القدرة على تصميم وبناء نماذج أولية لمسارات عمل ذكية يسهل اختبارها، والتحقق من دقتها، وإعدادها بالكامل للتفعيل في بيئة الإنتاج والتشغيل الفعلي."
  },
  {
    number: "03",
    status: "مخطط",
    live: false,
    title: "أنظمة الذكاء الاصطناعي المستقلة (Agentic AI)",
    body: "الفئة المستهدفة: فرق المنتجات والبيانات المتقدمة، ومهندسو الأنظمة والبرمجيات المحترفون. تعمّق في كيفية تخطيط وتقييم مسارات عمل الذكاء الاصطناعي متعددة الخطوات والمستقلة، المدعومة بالأدوات الرقمية الخارجية، إدارة الذاكرة، آليات الحوكمة والمراجعة البشرية، وضوابط الأمان والمراقبة المستمرة.",
    topics: [
      "أنماط وتنسيق عمل الوكلاء (Agent Patterns)",
      "استخدام الأدوات والسياق والذاكرة",
      "تصميم الدمج والمراجعة البشرية (Human-in-the-loop)",
      "ضوابط الأمان والتشغيل الفعلي"
    ],
    outcome: "استيعاب كيفية هندسة وإدارة مسارات عمل الذكاء الاصطناعي المعقدة وعالية الأتمتة، والتحكم بها بكفاءة تامة دون التضحية بالموثوقية أو أمان البيانات."
  }
];

const journeyStepsEn = [
  {
    label: "01",
    title: "Understand",
    body: "Build shared AI language, identify opportunities, and understand constraints."
  },
  {
    label: "02",
    title: "Design",
    body: "Translate use cases into workflows, data requirements, evaluation plans, and risks."
  },
  {
    label: "03",
    title: "Practice",
    body: "Work through hands-on labs, examples, and team exercises using real AI patterns."
  },
  {
    label: "04",
    title: "Apply",
    body: "Connect learning back to business needs, governance, and production readiness."
  }
];

const journeyStepsAr = [
  {
    label: "01",
    title: "الاستيعاب والفهم",
    body: "بناء لغة مشتركة وفهم موحد داخل الفريق، مع تحديد الفرص المتاحة واستيعاب القيود التشغيلية الحالية."
  },
  {
    label: "02",
    title: "التصميم",
    body: "ترجمة حالات الاستخدام إلى مسارات عمل واضحة، وتحديد متطلبات البيانات، وخطط التقييم، ورصد المخاطر المحتملة."
  },
  {
    label: "03",
    title: "الممارسة والتطبيق",
    body: "الانتقال إلى الجانب العملي عبر مختبرات تطبيقية، وأمثلة تفاعلية، وتمارين جماعية تحاكي أنظمة الذكاء الاصطناعي الحقيقية."
  },
  {
    label: "04",
    title: "التفعيل والمطابقة",
    body: "ربط المخرجات التعليمية بالاحتياجات الفعلية لشركتك، والتأكد من توافقها مع متطلبات الحوكمة وجاهزيتها للتشغيل الفعلي."
  }
];

const curriculumModulesEn = [
  {
    title: "AI opportunity mapping",
    body: "Understand where AI creates value in your specific industry and operations."
  },
  {
    title: "Responsible AI and governance",
    body: "Learn the controls systems need for auditing, accountability, and safe deployment."
  },
  {
    title: "RAG and knowledge systems",
    body: "Understand how AI can search, reason, and retrieve from enterprise knowledge bases."
  },
  {
    title: "AI workflow and copilot design",
    body: "Design effective human-AI collaboration patterns for real enterprise workflows."
  },
  {
    title: "Evaluation and quality",
    body: "Measure accuracy, consistency, and safety in AI systems across production environments."
  },
  {
    title: "Production readiness",
    body: "Deploy, monitor, and maintain AI systems across cloud, sovereign, and hybrid environments."
  }
];

const curriculumModulesAr = [
  {
    title: "تحديد فرص الذكاء الاصطناعي",
    body: "ترتيب أولويات حالات الاستخدام بناءً على جدواها الاستثمارية، ومدى جاهزية البيانات، والمخاطر المحتملة، مقارنةً بالقدرات الحالية للمؤسسة."
  },
  {
    title: "الحوكمة والذكاء الاصطناعي المسؤول",
    body: "استيعاب السياسات التنظيمية، وإدارة بروتوكولات البيانات والمخاطر، مع تحديد أدوار المراجعة والمساءلة البشرية لضمان أمان النظام."
  },
  {
    title: "أنظمة RAG وقواعد المعرفة",
    body: "التعرف على كيفية بناء أنظمة ذكاء اصطناعي موثوقة ومستندة إلى مصادر واضحة، لمساعدة المؤسسة على استغلال معرفتها وبياناتها الداخلية بأمان."
  },
  {
    title: "تصميم سير العمل والمساعدات الذكية",
    body: "ابتكار مسارات عمل ذكية تتمحور حول احتياجات المستخدمين الفعليين، لتدعم اتخاذ القرارات وتحسين العمليات التشغيلية اليومية."
  },
  {
    title: "التقييم وضبط الجودة",
    body: "قياس وتحليل المخرجات بدقة، مقارنة واختبار الأوامر (Prompts)، ومراجعة النتائج لتحديد معايير القبول الفني والنقدي للنظام."
  },
  {
    title: "الجاهزية للإنتاج",
    body: "فهم آليات المراقبة المستمرة، بناء حلقات تجميع الملاحظات وتغذية النظام (Feedback Loops)، وإدارة التغيير المؤسسي لضمان التحسين المستمر."
  }
];

const formatsEn = [
  {
    tag: "LIVE",
    live: true,
    title: "Online cohorts",
    body: "Instructor-led sessions, peer learning, assignments, and office hours."
  },
  {
    tag: "ON-SITE",
    live: false,
    title: "Team intensives",
    body: "Focused workshops for organizations that want to align teams quickly."
  },
  {
    tag: "SELF-PACED",
    live: false,
    title: "Learning modules",
    body: "Flexible content for busy professionals and internal enablement programs."
  },
  {
    tag: "ENTERPRISE",
    live: false,
    title: "Custom packages",
    body: "Tailored curriculum options for larger teams and organization-wide adoption."
  }
];

const formatsAr = [
  {
    tag: "التعلم المباشر",
    live: true,
    title: "مجموعات رقمية مشتركة",
    body: "جلسات مباشرة تحت إشراف خبراء، بيئة تعلم تشاركية، تكليفات عملية، وساعات مكتبية مخصصة للمراجعة والدعم."
  },
  {
    tag: "في المقر",
    live: false,
    title: "ورش عمل مكثفة للفرق",
    body: "ورش عمل مركزة وعملية للمؤسسات التي تسعى لتأهيل وتوحيد مهارات فرقها بسرعة وكفاءة."
  },
  {
    tag: "تعلّم ذاتي",
    live: false,
    title: "وحدات تعليمية مرنة",
    body: "محتوى تعليمي مرن يتناسب مع جداول المهنيين المزدحمة ويدعم برامج التمكين الداخلي في الشركات."
  },
  {
    tag: "للمؤسسات الكبرى",
    live: false,
    title: "باقات وحلول مخصصة",
    body: "مناهج وتجارب تعليمية مصممة خصيصاً لتلبية متطلبات الفرق الكبيرة ودعم استراتيجيات التبني الرقمي الشامل."
  }
];

const heroProgramRowsEn: [string, string][] = [
  ["AUDIENCE", "Leaders, product teams, engineers, data teams"],
  ["FOCUS", "Enterprise AI strategy, building, governance, and operations"],
  ["FORMAT", "Live cohorts, team workshops, and self-paced modules planned"],
  ["ACTION", "Join the waitlist to receive curriculum and launch updates"]
];

const heroProgramRowsAr: [string, string][] = [
  ["الفئة المستهدفة", "القادة والتنفيذيون، فرق المنتجات، مهندسو البرمجيات، وفرق البيانات"],
  ["التركيز", "استراتيجيات الذكاء الاصطناعي للمؤسسات، آليات البناء، الحوكمة، والعمليات التشغيلية"],
  ["نمط الدراسة", "مجموعات تعليمية تفاعلية حية (Live Cohorts)، ورش عمل للفرق، ومسارات تعليمية ذاتية التوجيه"],
  ["الخطوة القادمة", "انضم إلى قائمة الانتظار لتصلك تفاصيل المنهج التدريبي وتحديثات الإطلاق أولاً بأول"]
];

const heroTrackCardsEn: [string, string][] = [
  ["Foundations", "For leaders and decision makers"],
  ["Applied AI", "For product and engineering teams"],
  ["Agentic AI", "For advanced AI system teams"]
];

const heroTrackCardsAr: [string, string][] = [
  ["المبادئ الأساسية", "مخصص للقادة وصنّاع القرار الاستراتيجي في الشركات"],
  ["الذكاء الاصطناعي التطبيقي", "مخصص لفرق المنتجات والهندسة التقنية"],
  ["الأنظمة الذكية المستقلة", "مخصص للفرق المتقدمة التي تبني أنظمة ووكلاء ذكاء اصطناعي معقدة"]
];

const roleOptionsEn = ["Leader / Executive", "Manager / Director", "Engineer / Developer", "Other"];
const roleOptionsAr = ["قائد / تنفيذي", "مدير / رئيس قسم", "مهندس / مطوّر", "أخرى"];

function AcademyHero({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const heroProgramRows = isAr ? heroProgramRowsAr : heroProgramRowsEn;
  const heroTrackCards = isAr ? heroTrackCardsAr : heroTrackCardsEn;

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
      <Container className={`relative z-10 grid min-h-[560px] items-center gap-14 lg:grid-cols-[1fr_0.92fr] ${isAr ? "text-right" : ""}`}>
        <div className="max-w-[560px]">
          <Label dark>{copy.heroLabel}</Label>
          <h1
            className={`mt-7 font-black tracking-normal ${
              isAr ? "text-[30px] sm:text-[40px] md:text-[58px]" : "text-[34px] leading-[1.0] sm:text-[44px] md:text-[72px]"
            }`}
          >
            {copy.heroTitleBefore}{" "}
            <em className="not-italic text-gradient-green">{copy.heroTitleAccent}</em>
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-8 text-muted-dark">{copy.heroBody}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#waitlist">
              {copy.joinWaitlist} {arrow(locale)}
            </Button>
            <Button href="#tracks" variant="outline">
              {copy.viewTracks}
            </Button>
          </div>
        </div>

        <article className="flex w-full max-w-[539px] flex-col items-start justify-self-end gap-[26px] rounded-[28px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-[34px] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="flex w-full flex-wrap items-start justify-between gap-3">
            <div>
              <p className={`text-[11px] font-black text-white opacity-40 ${isAr ? "" : "uppercase tracking-[0.18em]"}`}>{copy.launchOverview}</p>
              <h2 className="mt-3 text-[25px] font-black leading-tight">{copy.programPrep}</h2>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(91,228,94,0.32)] bg-[rgba(91,228,94,0.08)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#5be45e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5be45e]" />
              {copy.comingSoonBadge}
            </span>
          </div>
          <div className="w-full divide-y divide-[rgba(135,190,175,0.18)]">
            {heroProgramRows.map(([track, desc]) => (
              <div className={`grid gap-2 py-[22px] first:pt-0 last:pb-0 sm:gap-5 ${isAr ? "sm:grid-cols-[160px_1fr]" : "sm:grid-cols-[128px_1fr]"}`} key={track}>
                <span className={`pt-0.5 text-[11px] font-black text-white opacity-42 ${isAr ? "" : "uppercase tracking-[0.16em]"}`}>
                  {track}
                </span>
                <p className="text-[15px] font-semibold leading-6 text-white opacity-90">{desc}</p>
              </div>
            ))}
          </div>
          <div className="grid w-full gap-[10px] sm:grid-cols-3">
            {heroTrackCards.map(([title, body]) => (
              <div className="min-h-[92px] rounded-[12px] border border-[rgba(135,190,175,0.18)] bg-[rgba(3,25,21,0.18)] p-4" key={title}>
                <h3 className="text-[13px] font-black leading-tight text-white">{title}</h3>
                <p className="mt-3 text-[12px] font-semibold leading-4 text-white opacity-42">{body}</p>
              </div>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}

function WhySection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const whyFeatures = isAr ? whyFeaturesAr : whyFeaturesEn;

  return (
    <section className="bg-[#f7f8f7] py-20 text-[#031915] md:py-[86px]">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
          <div className={`grid ${isAr ? "max-w-[750px] gap-5" : "gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-end"}`}>
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-brand-green" />
                <span className={`text-[12px] font-black text-[#1d695e] ${isAr ? "" : "uppercase tracking-[0.18em]"}`}>
                  {copy.whyLabel}
                </span>
              </div>
              <h2
                className={`mt-8 max-w-[650px] font-black tracking-normal text-[#031915] ${
                  isAr ? "text-[26px] sm:text-[36px] md:text-[46px] lg:text-[48px]" : "text-[30px] leading-[1.12] sm:text-[42px] md:text-[56px] lg:text-[58px]"
                }`}
              >
                {copy.whyTitle}
              </h2>
            </div>
            <p className={`text-[20px] leading-[1.62] text-[#50615c] ${isAr ? "mt-5 max-w-[700px]" : "max-w-[650px] lg:pb-4"}`}>{copy.whyBody}</p>
          </div>
        </AnimateIn>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {whyFeatures.map(({ title, body }, i) => (
            <AnimateIn delay={i * 120} key={title} variant="up">
            <article
              className="h-full rounded-[14px] border border-border-light bg-white p-7 shadow-[0_8px_28px_rgba(0,31,24,0.05)]"
            >
              <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-md bg-[linear-gradient(135deg,rgba(91,228,94,0.5),rgba(37,217,157,0.5))] text-[13px] font-black text-[#031915]">
                {i + 1}
              </div>
              <h3 className="text-[19px] font-black leading-[1.2]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-light">{body}</p>
            </article>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TracksSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const tracks = isAr ? tracksAr : tracksEn;

  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]" id="tracks">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
          <div className={`grid ${isAr ? "max-w-[780px] gap-5" : "gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-start"}`}>
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-brand-green" />
                <span className={`text-[12px] font-black text-brand-green ${isAr ? "" : "uppercase tracking-[0.18em]"}`}>
                  {copy.tracksLabel}
                </span>
              </div>
              <h2
                className={`mt-7 max-w-[700px] font-black tracking-normal text-white ${
                  isAr ? "text-[26px] sm:text-[36px] md:text-[46px] lg:text-[48px]" : "text-[30px] leading-[1.05] sm:text-[42px] md:text-[56px] lg:text-[58px]"
                }`}
              >
                {copy.tracksTitle}
              </h2>
            </div>
            <p className={`text-[20px] leading-[1.62] text-muted-dark ${isAr ? "mt-5 max-w-[700px]" : "max-w-[650px] lg:pt-14"}`}>{copy.tracksBody}</p>
          </div>
        </AnimateIn>
        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {tracks.map((track, index) => (
            <AnimateIn delay={index * 120} key={track.number} variant="up">
            <article
              className="flex min-h-[430px] h-full flex-col rounded-[18px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-7 md:p-[34px] lg:min-h-[565px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className={`text-[12px] font-black text-brand-green ${isAr ? "" : "uppercase tracking-[0.16em]"}`}>
                  {copy.trackWord} {track.number}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 pb-[10.59px] pt-[9px] text-[11px] font-black uppercase tracking-[0.08em] ${
                    track.live
                      ? "bg-brand-green text-[#031915]"
                      : track.status === (isAr ? "مخطط" : "PLANNED")
                        ? "border-[rgba(135,190,175,0.18)] bg-white/[0.05] text-[#93aaa3]"
                        : `justify-center border-[rgba(37,217,157,0.32)] bg-[rgba(37,217,157,0.12)] px-[14.933px] text-[#64e3af] ${isAr ? "" : "w-[145.09px]"}`
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      track.status === (isAr ? "مخطط" : "PLANNED") ? "bg-[#93aaa3]" : "bg-[#64e3af]"
                    }`}
                  />
                  {track.status}
                </span>
              </div>
              <h3 className={`mt-8 text-[25px] font-black leading-[1.16] ${isAr ? "min-h-[155px] xl:min-h-[80px]" : ""}`}>{track.title}</h3>
              <p className={`mt-5 text-[17px] leading-8 text-white opacity-86 ${isAr ? "min-h-[330px] xl:min-h-[240px]" : ""}`}>{track.body}</p>
              <ul className="mt-7 flex-1 space-y-4">
                {track.topics.map((topic) => (
                  <li className="flex items-start gap-4 text-[16px] leading-6 text-white opacity-86" key={topic}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {topic}
                  </li>
                ))}
              </ul>
              <div className={`mt-8 flex flex-col items-start gap-[7.425px] rounded-2xl border border-[rgba(135,190,175,0.18)] bg-[rgba(3,25,21,0.44)] px-[14px] pb-[32.84px] pt-[17px] ${isAr ? "min-h-[210px]" : "min-h-[165px]"}`}>
                <span className="text-[15px] font-black leading-tight text-white">{copy.outcome}</span>
                <p className="text-[14px] leading-5 text-white opacity-42">{track.outcome}</p>
              </div>
            </article>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function JourneySection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const journeySteps = isAr ? journeyStepsAr : journeyStepsEn;

  return (
    <section className="bg-[#06251f] py-24 text-white md:py-[118px]">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
          <div className={`grid ${isAr ? "max-w-[780px] gap-5" : "gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center"}`}>
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-[#5be45e]" />
                <span className={`text-[12px] font-black text-[#5be45e] ${isAr ? "" : "uppercase tracking-[0.18em]"}`}>
                  {copy.journeyLabel}
                </span>
              </div>
              <h2
                className={`mt-7 max-w-[730px] font-black tracking-normal text-white ${
                  isAr ? "text-[26px] sm:text-[36px] md:text-[46px] lg:text-[48px]" : "text-[30px] leading-[1.08] sm:text-[42px] md:text-[56px] lg:text-[58px]"
                }`}
              >
                {copy.journeyTitle}
              </h2>
            </div>
            <p className={`text-[20px] leading-[1.6] text-white opacity-50 ${isAr ? "mt-5 max-w-[700px]" : "max-w-[640px] lg:justify-self-end"}`}>{copy.journeyBody}</p>
          </div>
        </AnimateIn>
        <AnimateIn className="mt-16" variant="up">
        <div className="overflow-hidden rounded-[28px] border border-[rgba(135,190,175,0.18)] bg-[rgba(8,49,41,0.48)] lg:grid lg:grid-cols-4">
          {journeySteps.map((step) => (
            <article
              className="min-h-[210px] border-b border-[rgba(135,190,175,0.18)] p-8 last:border-b-0 md:p-10 lg:border-b-0 lg:border-e lg:last:border-e-0"
              key={step.label}
            >
              <span className={`text-[13px] font-black text-[#5be45e] ${isAr ? "" : "uppercase tracking-[0.12em]"}`}>{step.label}</span>
              <h3 className="mt-7 text-[20px] font-black leading-[1.2] text-white">{step.title}</h3>
              <p className="mt-5 text-[15px] leading-6 text-white opacity-42">{step.body}</p>
            </article>
          ))}
        </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function CurriculumSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const curriculumModules = isAr ? curriculumModulesAr : curriculumModulesEn;

  return (
    <section className="bg-white py-24 text-[#031915] md:py-[92px]">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
        <div className={`grid ${isAr ? "max-w-[800px] gap-5" : "gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-end"}`}>
          <div>
            <div className="inline-flex items-center gap-5">
              <span className="h-0.5 w-8 shrink-0 bg-[#5be45e]" />
              <span className={`text-[12px] font-black text-[#1d695e] ${isAr ? "" : "uppercase tracking-[0.18em]"}`}>
                {copy.curriculumLabel}
              </span>
            </div>
            {isAr ? (
              <h2 className="mt-8 max-w-[820px] text-[26px] font-black leading-[1.3] tracking-normal text-[#031915] sm:text-[36px] md:text-[46px] lg:text-[48px]">
                محاور مدروسة تهمّ الشركات في رحلة تبني الذكاء الاصطناعي.
              </h2>
            ) : (
              <h2 className="mt-8 max-w-[820px] text-[30px] font-black leading-[1.08] tracking-normal text-[#031915] sm:text-[42px] md:text-[56px] lg:text-[58px]">
                <span className="block">Planned topics that</span>
                <span className="block">matter for enterprise AI</span>
                <span className="block">adoption.</span>
              </h2>
            )}
          </div>
          <p className={`text-[20px] leading-[1.6] text-[#50615c] ${isAr ? "mt-5 max-w-[700px]" : "max-w-[700px] lg:pb-4"}`}>{copy.curriculumBody}</p>
        </div>
        </AnimateIn>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculumModules.map((mod, index) => (
            <AnimateIn delay={index * 80} key={mod.title} variant="up">
            <article
              className="h-full rounded-[14px] border border-border-light bg-white p-7 shadow-[0_4px_20px_rgba(0,31,24,0.04)]"
            >
              <span className={`text-[11px] font-black text-[#0f7f63] ${isAr ? "" : "uppercase tracking-[0.12em]"}`}>{copy.moduleWord}</span>
              <h3 className="mt-3 text-[19px] font-black leading-[1.25]">{mod.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-light">{mod.body}</p>
            </article>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FormatsSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const formats = isAr ? formatsAr : formatsEn;

  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]">
      <Container className={isAr ? "text-right" : ""}>
        <AnimateIn variant="up">
          <div className={`grid ${isAr ? "max-w-[780px] gap-5" : "gap-8 lg:grid-cols-[760px_1fr] lg:items-start"}`}>
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-[#25d99d]" />
                <span className={`text-[12px] font-black text-[#25d99d] ${isAr ? "" : "uppercase tracking-[0.18em]"}`}>
                  {copy.formatsLabel}
                </span>
              </div>
              {isAr ? (
                <h2 className="mt-7 max-w-none text-[26px] font-black leading-[1.3] tracking-normal text-white sm:text-[36px] md:text-[46px] lg:text-[48px]">
                  خيارات مرنة مصممة لتلائم الأفراد وفرق العمل.
                </h2>
              ) : (
                <h2 className="mt-7 max-w-none text-[32px] font-black leading-[1.08] tracking-normal text-white sm:text-[42px] md:text-[56px] lg:text-[58px]">
                  <span className="block">Flexible formats for</span>
                  <span className="block">individuals and teams.</span>
                </h2>
              )}
            </div>
            <p className={`text-[20px] leading-[1.62] text-muted-dark ${isAr ? "mt-5 max-w-[700px]" : "max-w-[650px] lg:pt-16"}`}>{copy.formatsBody}</p>
          </div>
        </AnimateIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((fmt, index) => (
            <AnimateIn delay={index * 100} key={fmt.tag} variant="up">
            <article
              className="min-h-[230px] h-full rounded-[18px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-8"
            >
              <span className={`text-[12px] font-black text-[#25d99d] ${isAr ? "" : "uppercase tracking-[0.16em]"}`}>{fmt.tag}</span>
              <h3 className="mt-8 text-[22px] font-black leading-[1.2]">{fmt.title}</h3>
              <p className="mt-5 text-[16px] leading-7 text-white opacity-42">{fmt.body}</p>
            </article>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

const darkInputClass =
  "w-full rounded-xl border border-white/[0.18] bg-[rgba(3,25,21,0.5)] px-4 py-3 text-sm text-white placeholder:text-muted-dark focus:border-brand-green focus:outline-none";

const darkLabelClass = "mb-1.5 block text-[11px] font-black uppercase tracking-[0.1em] text-muted-dark";

function CustomSelect({ options, defaultValue }: { options: string[]; defaultValue: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.18] bg-[rgba(3,25,21,0.5)] px-4 py-3 text-start text-sm text-white transition focus:border-brand-green focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <span>{selected}</span>
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
        <ul className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-xl border border-white/10 bg-[#0d2820] shadow-xl">
          {options.map((opt) => (
            <li key={opt}>
              <button
                className={`w-full px-4 py-3 text-start text-sm transition hover:bg-white/[0.06] ${
                  selected === opt ? "font-bold text-brand-green" : "text-white"
                }`}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
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

function WaitlistSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const copy = pageCopy[locale];
  const tracks = isAr ? tracksAr : tracksEn;
  const roleOptions = isAr ? roleOptionsAr : roleOptionsEn;
  const trackOptions = tracks.map((t) => t.title);

  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]" id="waitlist">
      <Container className={isAr ? "text-right" : ""}>
        <div className="grid gap-12 lg:grid-cols-[520px_minmax(0,1fr)] lg:items-start lg:gap-[59px]">
          {/* Left: text + help card */}
          <AnimateIn variant="left">
          <div>
            <Label dark>{copy.waitlistLabel}</Label>
            {isAr ? (
              <h2 className="mt-5 max-w-[520px] text-[32px] font-black leading-[1.3] text-white md:text-[42px]">
                قائمة انتظار أكاديمية الذكاء الاصطناعي.
              </h2>
            ) : (
              <h2 className="mt-5 max-w-[520px] text-[40px] font-black leading-[1.05] text-white md:text-[50px]">
                <span className="block">Get AI Academy launch</span>
                <span className="block">updates.</span>
              </h2>
            )}
            <p className="mt-7 max-w-[500px] text-base leading-7 text-muted-dark">{copy.waitlistBody}</p>
            <div className="mt-12 max-w-[500px] rounded-[20px] border border-[rgba(135,190,175,0.18)] bg-[#163a33] p-8">
              <span className={`text-[11px] font-black text-[#25d99d] ${isAr ? "" : "uppercase tracking-[0.12em]"}`}>
                {copy.goodNextStep}
              </span>
              <h3 className="mt-3 text-[19px] font-black text-white">{copy.needHelp}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-dark">{copy.needHelpBody}</p>
              <a
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-5 py-2.5 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
                href="/assessment"
              >
                {copy.takeAssessment} {arrow(locale)}
              </a>
            </div>
          </div>
          </AnimateIn>

          {/* Right: form card */}
          <AnimateIn variant="right">
          <div className="w-full rounded-[22px] border border-[rgba(135,190,175,0.2)] bg-[#163a33] px-6 py-8 sm:px-10 lg:px-[59px] lg:py-[35px]">
            <h3 className="text-xl font-black text-white">{copy.formTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-dark">{copy.formSubtitle}</p>
            <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={darkLabelClass}>{copy.name}</label>
                  <input className={darkInputClass} placeholder={copy.namePlaceholder} type="text" />
                </div>
                <div>
                  <label className={darkLabelClass}>{copy.workEmail}</label>
                  <input className={darkInputClass} placeholder={copy.emailPlaceholder} type="email" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={darkLabelClass}>{copy.company}</label>
                  <input className={darkInputClass} placeholder={copy.companyPlaceholder} type="text" />
                </div>
                <div>
                  <label className={darkLabelClass}>{copy.role}</label>
                  <CustomSelect defaultValue={roleOptions[0]} key={`role-${locale}`} options={roleOptions} />
                </div>
              </div>
              <div>
                <label className={darkLabelClass}>{copy.trackInterest}</label>
                <CustomSelect defaultValue={trackOptions[0]} key={`track-${locale}`} options={trackOptions} />
              </div>
              <div>
                <label className={darkLabelClass}>{copy.learnLabel}</label>
                <textarea
                  className={`${darkInputClass} resize-none`}
                  placeholder={copy.learnPlaceholder}
                  rows={5}
                />
              </div>
              <div>
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-8 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
                  type="submit"
                >
                  {copy.submit} {arrow(locale)}
                </button>
              </div>
            </form>
          </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}

export function AiAcademyPage() {
  const [locale, setLocale] = usePersistentLocale();

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader active="AI Academy" locale={locale} setLocale={setLocale} />
      <main>
        <AcademyHero locale={locale} />
        <WhySection locale={locale} />
        <TracksSection locale={locale} />
        <JourneySection locale={locale} />
        <CurriculumSection locale={locale} />
        <FormatsSection locale={locale} />
        <WaitlistSection locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
