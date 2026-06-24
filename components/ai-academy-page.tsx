"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/animate-in";
import { SiteFooter, SiteHeader, type Locale } from "@/components/site-shell";
import { Button, Container, Label, SectionHeader } from "@/components/ui";
import watermarkLogo from "@/assets/watermark.png.png";

const whyFeatures = [
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

const tracks = [
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

const journeySteps = [
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

const curriculumModules = [
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

const formats = [
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

const heroProgramRows: [string, string][] = [
  ["AUDIENCE", "Leaders, product teams, engineers, data teams"],
  ["FOCUS", "Enterprise AI strategy, building, governance, and operations"],
  ["FORMAT", "Live cohorts, team workshops, and self-paced modules planned"],
  ["ACTION", "Join the waitlist to receive curriculum and launch updates"]
];

const heroTrackCards: [string, string][] = [
  ["Foundations", "For leaders and decision makers"],
  ["Applied AI", "For product and engineering teams"],
  ["Agentic AI", "For advanced AI system teams"]
];

function AcademyHero() {
  return (
    <section className="hero-grid relative overflow-hidden bg-brand-dark py-20 text-white md:py-[86px]">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 w-[52%] max-w-[800px] select-none opacity-[0.38]" src={watermarkLogo.src} />
      <Container className="relative z-10 grid min-h-[560px] items-center gap-14 lg:grid-cols-[1fr_0.92fr]">
        <div className="max-w-[560px]">
          <Label dark>Adopters AI Academy</Label>
          <h1 className="mt-7 text-[44px] font-black leading-[0.98] tracking-normal md:text-[72px]">
            Practical AI education for teams building{" "}
            <em className="not-italic text-gradient-green">real systems.</em>
          </h1>
          <p className="mt-6 max-w-[520px] text-lg leading-8 text-muted-dark">
            Adopters AI Academy is a coming-soon learning experience for leaders, product teams, engineers, and data
            teams who need to understand, design, govern, and operate AI in enterprise environments.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#waitlist">Join waitlist →</Button>
            <Button href="#tracks" variant="outline">
              View placement topics
            </Button>
          </div>
        </div>

        <article className="flex w-full max-w-[539px] flex-col items-start gap-[26px] justify-self-end rounded-[28px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-[34px] shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
          <div className="flex w-full flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/40">Launch overview</p>
              <h2 className="mt-3 text-[25px] font-black leading-tight">Program in preparation</h2>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(91,228,94,0.32)] bg-[rgba(91,228,94,0.08)] px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-[#5be45e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5be45e]" />
              Coming soon
            </span>
          </div>
          <div className="w-full divide-y divide-[rgba(135,190,175,0.18)]">
            {heroProgramRows.map(([track, desc]) => (
              <div className="grid grid-cols-[128px_1fr] gap-5 py-[22px] first:pt-0 last:pb-0" key={track}>
                <span className="pt-0.5 text-[11px] font-black uppercase tracking-[0.16em] text-white/42">
                  {track}
                </span>
                <p className="text-[15px] font-semibold leading-6 text-white/90">{desc}</p>
              </div>
            ))}
          </div>
          <div className="grid w-full gap-[10px] sm:grid-cols-3">
            {heroTrackCards.map(([title, body]) => (
              <div className="min-h-[92px] rounded-[12px] border border-[rgba(135,190,175,0.18)] bg-[rgba(3,25,21,0.18)] p-4" key={title}>
                <h3 className="text-[13px] font-black leading-tight text-white">{title}</h3>
                <p className="mt-3 text-[12px] font-semibold leading-4 text-white/42">{body}</p>
              </div>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-[#f7f8f7] py-20 text-[#031915] md:py-[86px]">
      <Container>
        <AnimateIn variant="up">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-brand-green" />
                <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[#1d695e]">
                  Why the AI Academy
                </span>
              </div>
              <h2 className="mt-8 max-w-[650px] text-[42px] font-black leading-[1.12] tracking-normal text-[#031915] md:text-[56px] lg:text-[58px]">
                AI training should help teams make better decisions and build better systems.
              </h2>
            </div>
            <p className="max-w-[650px] text-[20px] leading-[1.62] text-[#50615c] lg:pb-4">
              Teams often need more than awareness sessions. Adopters AI Academy is planned to help organizations build
              shared AI fluency, practical skills, and responsible adoption habits.
            </p>
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

function TracksSection() {
  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]" id="tracks">
      <Container>
        <AnimateIn variant="up">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-brand-green" />
                <span className="text-[12px] font-black uppercase tracking-[0.18em] text-brand-green">
                  Planned Learning Tracks
                </span>
              </div>
              <h2 className="mt-7 max-w-[700px] text-[42px] font-black leading-[1.05] tracking-normal text-white md:text-[56px] lg:text-[58px]">
                Three paths for different AI maturity levels.
              </h2>
            </div>
            <p className="max-w-[650px] text-[20px] leading-[1.62] text-muted-dark lg:pt-14">
              Each planned track is organized around a different audience and maturity level, so visitors can quickly
              understand the right starting point.
            </p>
          </div>
        </AnimateIn>
        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {tracks.map((track, index) => (
            <AnimateIn delay={index * 120} key={track.number} variant="up">
            <article
              className="flex min-h-[430px] h-full flex-col rounded-[18px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-7 md:p-[34px] lg:min-h-[565px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-black uppercase tracking-[0.16em] text-brand-green">
                  Track {track.number}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.08em] ${
                    track.live
                      ? "bg-brand-green text-[#031915]"
                      : track.status === "PLANNED"
                        ? "border-[rgba(135,190,175,0.18)] bg-white/[0.05] text-[#93aaa3]"
                        : "w-[145.09px] justify-center border-[rgba(37,217,157,0.32)] bg-[rgba(37,217,157,0.12)] px-[14.933px] pb-[10.59px] pt-[9px] text-[#64e3af]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      track.status === "PLANNED" ? "bg-[#93aaa3]" : "bg-[#64e3af]"
                    }`}
                  />
                  {track.status}
                </span>
              </div>
              <h3 className="mt-8 text-[25px] font-black leading-[1.16]">{track.title}</h3>
              <p className="mt-5 text-[17px] leading-8 text-white/86">{track.body}</p>
              <ul className="mt-7 flex-1 space-y-4">
                {track.topics.map((topic) => (
                  <li className="flex items-start gap-4 text-[16px] leading-6 text-white/86" key={topic}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex min-h-[106px] flex-col items-start gap-[7.425px] rounded-2xl border border-[rgba(135,190,175,0.18)] bg-[rgba(3,25,21,0.44)] px-[14px] pb-[32.84px] pt-[17px]">
                <span className="text-[15px] font-black leading-tight text-white">Outcome</span>
                <p className="text-[14px] leading-5 text-white/42">{track.outcome}</p>
              </div>
            </article>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="bg-[#06251f] py-24 text-white md:py-[118px]">
      <Container>
        <AnimateIn variant="up">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-[#5be45e]" />
                <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[#5be45e]">
                  Learning Journey
                </span>
              </div>
              <h2 className="mt-7 max-w-[730px] text-[42px] font-black leading-[1.08] tracking-normal text-white md:text-[56px] lg:text-[58px]">
                A simple path from understanding to application.
              </h2>
            </div>
            <p className="max-w-[640px] text-[20px] leading-[1.6] text-white/50 lg:justify-self-end">
              The AI Academy is designed to move teams from clear understanding to practical application through a
              simple, structured learning journey.
            </p>
          </div>
        </AnimateIn>
        <AnimateIn className="mt-16" variant="up">
        <div className="overflow-hidden rounded-[28px] border border-[rgba(135,190,175,0.18)] bg-[rgba(8,49,41,0.48)] lg:grid lg:grid-cols-4">
          {journeySteps.map((step) => (
            <article
              className="min-h-[210px] border-[rgba(135,190,175,0.18)] p-8 md:p-10 lg:border-r lg:last:border-r-0"
              key={step.label}
            >
              <span className="text-[13px] font-black uppercase tracking-[0.12em] text-[#5be45e]">{step.label}</span>
              <h3 className="mt-7 text-[20px] font-black leading-[1.2] text-white">{step.title}</h3>
              <p className="mt-5 text-[15px] leading-6 text-white/42">{step.body}</p>
            </article>
          ))}
        </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function CurriculumSection() {
  return (
    <section className="bg-white py-24 text-[#031915] md:py-[92px]">
      <Container>
        <AnimateIn variant="up">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-5">
              <span className="h-0.5 w-8 shrink-0 bg-[#5be45e]" />
              <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[#1d695e]">
                Curriculum Preview
              </span>
            </div>
            <h2 className="mt-8 max-w-[820px] text-[42px] font-black leading-[1.08] tracking-normal text-[#031915] md:text-[56px] lg:text-[58px]">
              <span className="block">Planned topics that</span>
              <span className="block">matter for enterprise AI</span>
              <span className="block">adoption.</span>
            </h2>
          </div>
          <p className="max-w-[700px] text-[20px] leading-[1.6] text-[#50615c] lg:pb-4">
            The planned curriculum focuses on the topics teams need most when moving from AI interest to real adoption.
          </p>
        </div>
        </AnimateIn>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {curriculumModules.map((mod, index) => (
            <AnimateIn delay={index * 80} key={mod.title} variant="up">
            <article
              className="h-full rounded-[14px] border border-border-light bg-white p-7 shadow-[0_4px_20px_rgba(0,31,24,0.04)]"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#0f7f63]">Module</span>
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

function FormatsSection() {
  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]">
      <Container>
        <AnimateIn variant="up">
          <div className="grid gap-8 lg:grid-cols-[760px_1fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-5">
                <span className="h-0.5 w-8 shrink-0 bg-[#25d99d]" />
                <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[#25d99d]">
                  Planned Formats
                </span>
              </div>
              <h2 className="mt-7 max-w-none text-[42px] font-black leading-[1.08] tracking-normal text-white md:text-[56px] lg:text-[58px]">
                <span className="block whitespace-nowrap">Flexible formats for</span>
                <span className="block whitespace-nowrap">individuals and teams.</span>
              </h2>
            </div>
            <p className="max-w-[650px] text-[20px] leading-[1.62] text-muted-dark lg:pt-16">
              Delivery formats are planned to support individuals, focused teams, and larger organizations preparing for
              AI adoption.
            </p>
          </div>
        </AnimateIn>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((fmt, index) => (
            <AnimateIn delay={index * 100} key={fmt.tag} variant="up">
            <article
              className="min-h-[230px] h-full rounded-[18px] border border-[rgba(135,190,175,0.18)] bg-[linear-gradient(180deg,rgba(8,49,41,0.82)_0%,rgba(6,36,30,0.92)_100%)] p-8"
            >
              <span className="text-[12px] font-black uppercase tracking-[0.16em] text-[#25d99d]">{fmt.tag}</span>
              <h3 className="mt-8 text-[22px] font-black leading-[1.2]">{fmt.title}</h3>
              <p className="mt-5 text-[16px] leading-7 text-white/42">{fmt.body}</p>
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
        className="flex w-full items-center justify-between rounded-xl border border-white/[0.18] bg-[rgba(3,25,21,0.5)] px-4 py-3 text-left text-sm text-white transition focus:border-brand-green focus:outline-none"
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
                className={`w-full px-4 py-3 text-left text-sm transition hover:bg-white/[0.06] ${
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

function WaitlistSection() {
  return (
    <section className="bg-brand-dark py-24 text-white md:py-[92px]" id="waitlist">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[520px_minmax(0,1fr)] lg:items-start lg:gap-[59px]">
          {/* Left: text + help card */}
          <AnimateIn variant="left">
          <div>
            <Label dark>Join the Waitlist</Label>
            <h2 className="mt-5 max-w-[520px] text-[40px] font-black leading-[1.05] text-white md:text-[50px]">
              <span className="block">Get AI Academy launch</span>
              <span className="block">updates.</span>
            </h2>
            <p className="mt-7 max-w-[500px] text-base leading-7 text-muted-dark">
              The AI Academy is coming soon. Share your details to receive updates about launch timing, planned
              tracks, and enterprise learning options.
            </p>
            <div className="mt-12 max-w-[500px] rounded-[20px] border border-[rgba(135,190,175,0.18)] bg-[#163a33] p-8">
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#25d99d]">
                Good next step
              </span>
              <h3 className="mt-3 text-[19px] font-black text-white">Need help choosing a track?</h3>
              <p className="mt-3 text-sm leading-6 text-muted-dark">
                Use the 60-second assessment to identify the best starting point for your organization.
              </p>
              <a
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-5 py-2.5 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
                href="/assessment"
              >
                Take assessment →
              </a>
            </div>
          </div>
          </AnimateIn>

          {/* Right: form card */}
          <AnimateIn variant="right">
          <div className="w-full rounded-[22px] border border-[rgba(135,190,175,0.2)] bg-[#163a33] px-[59px] py-[35px]">
            <h3 className="text-xl font-black text-white">AI Academy waitlist</h3>
            <p className="mt-2 text-sm leading-6 text-muted-dark">
              Tell us who you are and what your team wants to learn. The program is coming soon.
            </p>
            <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={darkLabelClass}>Name</label>
                  <input className={darkInputClass} placeholder="Your name" type="text" />
                </div>
                <div>
                  <label className={darkLabelClass}>Work Email</label>
                  <input className={darkInputClass} placeholder="name@company.com" type="email" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={darkLabelClass}>Company</label>
                  <input className={darkInputClass} placeholder="Company / institution" type="text" />
                </div>
                <div>
                  <label className={darkLabelClass}>Role</label>
                  <CustomSelect
                    defaultValue="Leader / Executive"
                    options={["Leader / Executive", "Manager / Director", "Engineer / Developer", "Other"]}
                  />
                </div>
              </div>
              <div>
                <label className={darkLabelClass}>Track Interest</label>
                <CustomSelect
                  defaultValue="AI Foundations for Leaders"
                  options={["AI Foundations for Leaders", "Applied AI Engineering", "Agentic AI Systems"]}
                />
              </div>
              <div>
                <label className={darkLabelClass}>What do you want your team to learn?</label>
                <textarea
                  className={`${darkInputClass} resize-none`}
                  placeholder="Briefly describe your team's AI learning needs, use cases, or goals."
                  rows={5}
                />
              </div>
              <div>
                <button
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-8 text-sm font-extrabold text-[#031915] shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
                  type="submit"
                >
                  Join waitlist →
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
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <div lang="en">
      <SiteHeader active="AI Academy" allowArabic={false} locale={locale} setLocale={setLocale} />
      <main>
        <AcademyHero />
        <WhySection />
        <TracksSection />
        <JourneySection />
        <CurriculumSection />
        <FormatsSection />
        <WaitlistSection />
      </main>
      <SiteFooter allowArabic={false} locale={locale} />
    </div>
  );
}
