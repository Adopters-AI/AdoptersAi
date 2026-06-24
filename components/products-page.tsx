"use client";

import { useState } from "react";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label } from "@/components/ui";
import { AnimateIn } from "@/components/animate-in";
import watermarkLogo from "@/assets/watermark.png.png";

const heroProductTags = ["Institutional intelligence", "GraphRAG", "White-label"];

const intelligentMeta = [
  ["Type", "White-label SaaS platform"],
  ["Deployment", "Cloud · Sovereign · Hybrid"],
  ["Language", "Arabic + English"],
  ["Instances", "5 active verticals"],
  ["Data control", "Local sovereignty"],
  ["Status", "Live — In development"]
] as const;

const architectureLayers = [
  ["L1", "Ingestion", "Connects to APIs, web sources, documents, feeds, and institutional systems."],
  ["L2", "Processing", "Turns unstructured data into structured signals such as entities, events, sentiment, and relationships."],
  ["L3", "Knowledge Graph", "Connects actors, events, claims, and sources into the defensible core of the platform."],
  ["L4", "AI Intelligence", "Uses GraphRAG to answer complex questions with traceable, source-backed reasoning."],
  ["L5", "Delivery", "Delivers dashboards, automated briefings, APIs, and partner-branded products."]
] as const;

const intelligentFeatures = [
  ["01", "Multi-source ingestion", "Pull from APIs, documents, web sources, market feeds, and institutional systems."],
  ["02", "Arabic-native NLP", "Extract entities, sentiment, and relationships from Arabic and English sources."],
  ["03", "GraphRAG intelligence", "Answer complex questions using connected knowledge and traceable sources."],
  ["04", "Automated briefings", "Generate recurring intelligence summaries, watchlists, and anomaly alerts."],
  ["05", "White-label delivery", "Run the platform under the partner's own brand, domain, and user experience."],
  ["06", "Sovereign data control", "Support deployment models that keep sensitive data under institutional governance."]
] as const;

const intelligentImpact = [
  ["Speed", "From days to minutes", "Analysts move faster because intelligence is automatically collected, connected, and summarized."],
  ["Reach", "One engine, many institutions", "A shared engine can serve multiple branded products without rebuilding the platform each time."],
  ["Depth", "Relationships, not just records", "The knowledge graph reveals links, dependencies, and risks that document search can miss."]
] as const;

const pulseMeta = [
  ["Type", "MLOps observability SaaS"],
  ["Deployment", "Cloud · Self-hosted"],
  ["Integrations", "Any ML stack"],
  ["Monitoring", "Real-time + scheduled"],
  ["Alerting", "Slack · Email · API"],
  ["Status", "Coming soon"]
] as const;

const pulseFeatures = [
  ["01", "Model performance monitoring", "Track accuracy, precision, recall, and custom business metrics across production models."],
  ["02", "Data & concept drift detection", "Flag shifts in incoming data or user behavior before model quality drops."],
  ["03", "Explainability & bias auditing", "Surface fairness indicators, feature-importance shifts, and audit-ready reports."],
  ["04", "Incident detection & alerting", "Notify teams when model behavior moves outside expected thresholds."],
  ["05", "Retraining triggers & automation", "Connect drift or performance signals to retraining workflows and rollout controls."],
  ["06", "Business impact dashboard", "Translate model health into business language: risk, decisions affected, and SLA impact."]
] as const;

const pulseImpact = [
  ["Reliability", "AI that stays accurate", "Teams can catch degradation before stakeholders feel the impact."],
  ["Governance", "Audit trails by default", "Drift events, retraining runs, and model decisions become easier to review."],
  ["Efficiency", "Less firefighting", "Structured alerts reduce manual monitoring and help teams focus on improvement."]
] as const;

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
          {label === "Status" && !dark ? (
            <strong className="text-right text-[15px] font-extrabold text-gradient-green">{value}</strong>
          ) : (
            <strong className="text-right text-[15px] font-extrabold">{value}</strong>
          )}
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
      className={`rounded-[14px] border p-[26px] ${
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
  dark = false
}: {
  item: readonly [string, string, string];
  dark?: boolean;
}) {
  const [label, title, body] = item;

  return (
    <article className={`p-[29px] ${dark ? "text-white" : "text-[#031915]"}`}>
      <p className={`text-[11px] font-black uppercase tracking-[0.16em] ${dark ? "text-brand-green" : "text-[#1d695e]"}`}>{label}</p>
      <h3 className="mt-3 text-2xl font-black leading-[1.2]">{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-muted-dark" : "text-muted-light"}`}>{body}</p>
    </article>
  );
}

function ArchitectureLayers() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(37,217,157,0.08)] bg-white">
      {architectureLayers.map(([layer, title, body], index) => (
        <div
          className={`grid min-h-[112px] items-center gap-4 px-6 py-6 md:gap-6 md:py-0 md:grid-cols-[76px_240px_1fr] md:px-0 ${
            index < architectureLayers.length - 1 ? "border-b border-[rgba(37,217,157,0.08)]" : ""
          } bg-[linear-gradient(90deg,rgba(91,228,94,0.08)_0%,#ffffff_36%)]`}
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

function ProductsHero() {
  return (
    <section className="hero-grid relative overflow-hidden bg-brand-dark py-20 text-white md:py-[86px]">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 w-[52%] max-w-[800px] select-none opacity-[0.38]" src={watermarkLogo.src} />
      <Container className="relative z-10 grid min-h-[552px] items-center gap-14 lg:grid-cols-[1fr_0.96fr]">
        <div className="max-w-[540px]">
          <Label dark>Products</Label>
          <h1 className="mt-7 text-[40px] font-black leading-[1.05] tracking-normal md:text-[52px]">
            Adopters Intelligent with <span className="text-gradient-green">clear roles</span> and <span className="text-gradient-green">clear status.</span>
          </h1>
          <p className="mt-6 max-w-[532px] text-lg leading-8 text-muted-dark">
            AdoptersAI products help institutions turn complex data into decision-ready intelligence, then monitor AI
            systems after they go live.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#adopters-intelligent">Discover more →</Button>
            <Button href="/contact" variant="outline">
              Request a demo
            </Button>
          </div>
        </div>
        <article className="flex w-full max-w-[539px] flex-col items-start gap-[26px] justify-self-end rounded-[28px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-[34px] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <h2 className="text-[26px] font-black leading-tight">Adopters Intelligent</h2>
            <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand-mint/[0.32] bg-[#0a2e27] px-[15px] py-[9px] text-[11px] font-extrabold uppercase tracking-[0.88px] text-[#25d99d]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Live — In development
            </span>
          </div>
          <p className="max-w-[455px] text-base leading-7 text-muted-dark">
            White-label intelligence platform for institutions that need dashboards, briefings, knowledge graph
            intelligence, and branded delivery.
          </p>
          <div className="flex flex-wrap gap-2">
            {heroProductTags.map((tag) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-semibold text-white/78"
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

function IntelligentSection() {
  return (
    <section className="bg-paper py-24 text-[#031915] md:py-[92px]" id="adopters-intelligent">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:gap-[56px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/[0.32] bg-[#e8f8f2] px-[13px] py-2 text-[11px] font-extrabold uppercase tracking-[0.88px] text-[#1d695e]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Live — In development
            </span>
            <h2 className="mt-5 text-[44px] font-black leading-[1] md:text-[64px]">Adopters <span className="font-light">Intelligent</span></h2>
            <p className="mt-5 max-w-[586px] text-lg leading-8 text-muted-light">
              A white-label intelligence platform that helps institutions collect data, connect relationships, and
              deliver decision-ready intelligence under their own brand.
            </p>
          </div>
          <ProductMetaCard items={intelligentMeta} />
        </div>

        <AnimateIn className="mt-16" variant="up">
          <Label>Platform architecture</Label>
          <h3 className="mt-4 max-w-[532px] text-[34px] font-black leading-[1.15]">Five layers, one defensible core.</h3>
          <div className="mt-8">
            <ArchitectureLayers />
          </div>
        </AnimateIn>

        <div className="mt-16">
          <AnimateIn variant="up">
            <Label>Features & capabilities</Label>
            <h3 className="mt-4 text-[34px] font-black leading-[1.15]">What Adopters Intelligent enables.</h3>
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
            <Label>Impact</Label>
            <h3 className="mt-4 text-[34px] font-black leading-[1.15]">Why Adopters Intelligent matters.</h3>
          </AnimateIn>
          <div className="mt-8 overflow-hidden rounded-[18px] border border-border-light bg-white md:grid md:grid-cols-3">
            {intelligentImpact.map((item, index) => (
              <AnimateIn delay={index * 120} key={item[0]} variant="up">
                <div className={`h-full ${index < intelligentImpact.length - 1 ? "border-b border-border-light md:border-b-0 md:border-r" : ""}`}>
                  <ImpactCard item={item} />
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}


function ProductsCTA() {
  return (
    <section className="bg-brand-dark py-24">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(100deg,#52f35f_0%,#46ef93_58%,#55efbd_100%)] p-8 text-[#031915] md:p-14">
          <div className="grid gap-8 md:grid-cols-[1fr_345px] md:items-center">
            <div>
              <h2 className="text-3xl font-black md:text-[38px]">Need a demo or early access?</h2>
              <p className="mt-4 max-w-[600px] text-sm font-semibold leading-6 text-[#083429]/80">
                See how Adopters Intelligent or Pulse can fit your institution, use case, and data environment.
              </p>
            </div>
            <div className="grid gap-3">
              <Button className="w-full !text-white" href="/contact" variant="dark">
                Request a demo →
              </Button>
              <Button className="w-full" href="/assessment" variant="light">
                Take assessment
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProductsPage() {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <div lang="en">
      <SiteHeader active="Products" allowArabic={false} locale={locale} setLocale={setLocale} />
      <main>
        <ProductsHero />
        <IntelligentSection />
        <ProductsCTA />
      </main>
      <SiteFooter allowArabic={false} locale={locale} />
    </div>
  );
}
