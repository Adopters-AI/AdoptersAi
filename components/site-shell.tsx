"use client";

import { useState } from "react";
import Link from "next/link";
import { LanguageToggle, type Locale } from "@/components/language-toggle";
import { Button, Container, Logo } from "@/components/ui";

const shellContent = {
  en: {
    nav: [
      ["Services", "/services"],
      ["Products", "/products"],
      ["Use Cases", "/use-cases"],
      ["AI Academy", "/ai-academy"]
    ],
    bookCall: "Book a call",
    footerBody: "Helping Enterprises Implement AI Solutions.",
    columns: [
      ["Company", "Home", "Services", "Products", "Use Cases"],
      ["Explore", "AI Academy", "AI Assessment", "Contact"],
      ["Next Step", "Join AI Academy waitlist", "Take assessment", "Book a call"]
    ],
    copyright: "© 2026 Adopters®. All rights reserved.",
    tagline: "Enterprise AI systems · Cloud · Sovereign · Hybrid"
  },
  ar: {
    nav: [
      ["الخدمات", "/services"],
      ["المنتجات", "/products"],
      ["حالات الاستخدام", "/use-cases"],
      ["أكاديمية الذكاء الاصطناعي", "/ai-academy"]
    ],
    bookCall: "احجز موعد اتصال",
    footerBody: "نُمكّن المؤسسات من تبني وتفعيل حلول الذكاء الاصطناعي.",
    columns: [
      ["شركة", "الرئيسية", "الخدمات", "المنتجات", "حالات الاستخدام"],
      ["استكشف", "أكاديمية الذكاء الاصطناعي", "تقييم الذكاء الاصطناعي", "اتصل"],
      ["الخطوة التالية", "انضم إلى قائمة انتظار الأكاديمية", "ابدأ التقييم", "احجز موعد اتصال"]
    ],
    copyright: "© 2026 Adopters®. جميع الحقوق محفوظة.",
    tagline: "أنظمة ذكاء اصطناعي مؤسسية · سحابي · سيادي · هجين"
  }
} as const;

const footerLinks: Record<string, string> = {
  // EN
  Home: "/",
  Services: "/services",
  Products: "/products",
  "Use Cases": "/use-cases",
  "AI Academy": "/ai-academy",
  "AI Assessment": "/assessment",
  Contact: "/contact",
  "Join AI Academy waitlist": "/ai-academy#waitlist",
  "Take assessment": "/assessment",
  "Book a call": "/contact",
  // AR
  "الرئيسية": "/",
  "الخدمات": "/services",
  "المنتجات": "/products",
  "حالات الاستخدام": "/use-cases",
  "أكاديمية الذكاء الاصطناعي": "/ai-academy",
  "تقييم الذكاء الاصطناعي": "/assessment",
  "اتصل": "/contact",
  "انضم إلى قائمة انتظار الأكاديمية": "/ai-academy#waitlist",
  "ابدأ التقييم": "/assessment",
  "احجز مكالمة": "/contact",
  "احجز موعد اتصال": "/contact",
};

function footerItemHref(item: string): string {
  return footerLinks[item] ?? "#";
}

function arrow(locale: Locale) {
  return locale === "ar" ? "←" : "→";
}

function isActiveItem(active: string, item: string) {
  return (
    active === item ||
    (active === "Services" && (item === "Services" || item === "الخدمات")) ||
    (active === "Products" && (item === "Products" || item === "المنتجات")) ||
    (active === "Use Cases" && (item === "Use Cases" || item === "حالات الاستخدام")) ||
    (active === "AI Academy" && (item === "AI Academy" || item === "أكاديمية الذكاء الاصطناعي"))
  );
}

export function SiteHeader({
  locale,
  setLocale,
  active = "Home",
  allowArabic = true
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  active?: string;
  allowArabic?: boolean;
}) {
  const effectiveLocale = allowArabic ? locale : "en";
  const content = shellContent[effectiveLocale];
  const isAr = effectiveLocale === "ar";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.14] bg-brand-darker text-white">
      <Container className="flex h-[77px] items-center justify-between">
        <Link href="/" aria-label="Return to Adopters home">
          <Logo />
        </Link>
        {/* Desktop nav */}
        <nav
          className={`hidden items-center text-center font-semibold text-[#A7BDB6] md:flex ${
            isAr ? "gap-6 text-[13px] leading-6" : "gap-9 text-[14px] leading-[21px] font-poppins"
          }`}
        >
          {content.nav.map(([item, href]) => (
            <Link
              className={`border-b py-2 transition hover:text-brand-green ${
                isActiveItem(active, item) ? "border-brand-green text-brand-green" : "border-transparent"
              }`}
              href={href}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>
        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {allowArabic ? <LanguageToggle locale={locale} onChange={setLocale} /> : null}
          <Button className="min-h-10 px-5 text-xs" href="/contact">
            {content.bookCall} {arrow(effectiveLocale)}
          </Button>
        </div>
        {/* Mobile: hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {allowArabic ? <LanguageToggle locale={locale} onChange={setLocale} /> : null}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white transition hover:bg-white/[0.06]"
            onClick={() => setMenuOpen((v) => !v)}
            type="button"
          >
            {menuOpen ? (
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            ) : (
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="border-t border-white/[0.06] bg-brand-darker pb-5 md:hidden">
          <Container>
            <nav className={`flex flex-col ${isAr ? "text-right" : ""}`}>
              {content.nav.map(([item, href]) => (
                <Link
                  className={`border-b border-white/[0.06] py-4 text-sm font-extrabold transition hover:text-brand-green ${
                    isActiveItem(active, item) ? "text-brand-green" : "text-white opacity-80"
                  }`}
                  href={href}
                  key={item}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <Link
              className="mt-4 inline-flex w-full min-h-11 items-center justify-center rounded-full bg-[linear-gradient(93deg,#5be45e_2.36%,#25d99d_97.64%)] px-6 text-sm font-extrabold text-brand-dark shadow-[0_10px_28px_rgba(91,228,94,0.18)] transition hover:opacity-90"
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              {content.bookCall} {arrow(effectiveLocale)}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ locale, allowArabic = true }: { locale: Locale; allowArabic?: boolean }) {
  const effectiveLocale = allowArabic ? locale : "en";
  const content = shellContent[effectiveLocale];
  const isAr = effectiveLocale === "ar";

  return (
    <footer className="border-t border-white/[0.08] bg-brand-dark py-20 text-white" id="contact">
      <Container className={isAr ? "text-right" : ""}>
        <div className="grid gap-12 lg:grid-cols-[350px_1fr]">
          <div>
            <Logo className={isAr ? "justify-end" : ""} />
            <p className="mt-5 max-w-[320px] text-sm leading-7 text-muted-dark">{content.footerBody}</p>
          </div>
          <div className="grid gap-9 sm:grid-cols-3">
            {content.columns.map(([title, ...items]) => (
              <div key={title}>
                <h3 className="text-xs font-black uppercase tracking-[0.12em] text-white opacity-[0.55]">{title}</h3>
                <ul className="mt-5 space-y-4 text-sm text-muted-dark">
                  {items.map((item) => (
                    <li key={item}>
                      <Link className="transition hover:text-brand-green" href={footerItemHref(item)}>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.08] pt-7 text-xs text-[#6E867E] md:flex-row md:justify-between">
          <p>{content.copyright}</p>
          <p>{content.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}

export type { Locale };
