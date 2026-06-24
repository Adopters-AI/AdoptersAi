"use client";

import { useState } from "react";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label, SectionHeader } from "@/components/ui";
import { AnimateIn } from "@/components/animate-in";
import watermarkLogo from "@/assets/watermark.png.png";

const serviceLines = [
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

const detailSections = [
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

function ServiceHero() {
  return (
    <section className="hero-grid relative overflow-hidden bg-brand-dark py-20 text-white md:py-[86px]">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 w-[52%] max-w-[800px] select-none opacity-[0.38]" src={watermarkLogo.src} />
      <Container className="relative z-10 grid min-h-[512px] items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-[570px]">
          <Label dark>Services</Label>
          <h1 className="mt-8 text-balance text-5xl font-black leading-[1.02] md:text-7xl">
            One <span className="text-gradient-green">production</span> path.
          </h1>
          <p className="mt-6 max-w-[570px] text-base leading-7 text-muted-dark">
            Choose the right level of support: define the AI roadmap, build production systems, or operate and improve
            deployed AI.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact">Book service consultation →</Button>
            <Button href="#compare" variant="outline">
              Compare services
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
          {[
            ["01 · Strategy", "When direction is unclear", "Assess readiness, prioritize use cases, and define governance before delivery starts."],
            ["02 · Build", "When you are ready to implement", "Deliver pilots, integrations, data platforms, and production AI engineering."],
            ["03 · Operate", "When AI is already live", "Monitor models, retrain systems, maintain compliance, and provide support."]
          ].map(([label, title, body], index) => (
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

function ServiceLinesSection() {
  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]" id="compare">
      <Container>
        <div>
          <Label dark>Service lines</Label>
          <h2 className="mt-4 text-4xl font-black leading-[1.05] md:text-[42px] lg:text-5xl">
            Simple structure. Clear role for each service.
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
  offering: (typeof detailSections)[number]["offerings"][number];
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
        <span className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-brand-green align-middle" />
        {offering.outcome}
      </div>
    </article>
  );
}

function DetailSection({ section }: { section: (typeof detailSections)[number] }) {
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

function ServicesCTA() {
  return (
    <section className="bg-brand-dark py-24" id="consultation">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#52f35f_0%,#46ef93_58%,#55efbd_100%)] p-8 text-[#031915] md:p-14">
          <div className="grid gap-8 md:grid-cols-[1fr_345px] md:items-center">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">Not sure which service fits?</h2>
              <p className="mt-4 max-w-[700px] text-sm font-semibold leading-6 text-[#083429]/80">
                Take the 60-second assessment to get a recommended starting point, or book a call to discuss the right
                sequence.
              </p>
            </div>
            <div className="grid gap-3">
              <Button className="w-full !text-white" href="/assessment" variant="dark">
                Take assessment →
              </Button>
              <Button className="w-full" href="/contact" variant="light">
                Book a call
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ServicesPage() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <div lang="en">
      <SiteHeader active="Services" allowArabic={false} locale={locale} setLocale={setLocale} />
      <main>
        <ServiceHero />
        <ServiceLinesSection />
        {detailSections.map((section) => (
          <DetailSection key={section.label} section={section} />
        ))}
        <ServicesCTA />
      </main>
      <SiteFooter allowArabic={false} locale={locale} />
    </div>
  );
}
