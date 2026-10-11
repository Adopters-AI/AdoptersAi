"use client";

import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { usePersistentLocale } from "@/components/use-persistent-locale";
import { Button, Container } from "@/components/ui";

const copy = {
  en: {
    code: "404",
    title: "This page could not be found.",
    body: "The page may have moved, or the link may be incorrect. Try the home page or tell us what you were looking for.",
    home: "Back to home",
    contact: "Contact us"
  },
  ar: {
    code: "404",
    title: "تعذّر العثور على هذه الصفحة.",
    body: "ربما تم نقل الصفحة أو أن الرابط غير صحيح. جرّب الصفحة الرئيسية أو أخبرنا بما كنت تبحث عنه.",
    home: "العودة إلى الرئيسية",
    contact: "تواصل معنا"
  }
} as const;

export default function NotFound() {
  const [locale, setLocale] = usePersistentLocale();
  const content = copy[locale];
  const isAr = locale === "ar";

  return (
    <div dir={isAr ? "rtl" : "ltr"} lang={locale}>
      <SiteHeader locale={locale} setLocale={setLocale} />
      <main className="bg-brand-dark py-24 text-white md:py-[140px]">
        <Container className={isAr ? "text-right" : ""}>
          <p className="text-gradient-green text-[72px] font-black leading-none md:text-[120px]">{content.code}</p>
          <h1 className="mt-6 max-w-[680px] text-[32px] font-black leading-[1.1] md:text-[48px]">{content.title}</h1>
          <p className="mt-5 max-w-[560px] text-lg leading-8 text-muted-dark">{content.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href="/">{content.home}</Button>
            <Button href="/contact" variant="outline">
              {content.contact}
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
