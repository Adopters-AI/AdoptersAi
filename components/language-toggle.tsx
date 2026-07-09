"use client";

export type Locale = "en" | "ar";

export function LanguageToggle({
  locale,
  onChange
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  const nextLocale = locale === "en" ? "ar" : "en";
  const label = locale === "ar" ? "En" : "عربي";

  return (
    <button
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className="rounded-full border border-brand-green bg-brand-green px-3 py-1.5 text-[11px] font-black text-[#031915] transition hover:opacity-90"
      onClick={() => onChange(nextLocale)}
      type="button"
    >
      {label}
    </button>
  );
}
