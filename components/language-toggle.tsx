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

  return (
    <button
      aria-label="Switch language"
      className="rounded-full border border-brand-green bg-brand-green px-3 py-1.5 text-[11px] font-black text-[#031915] transition hover:opacity-90"
      onClick={() => onChange(nextLocale)}
      type="button"
    >
      {locale.toUpperCase()}
    </button>
  );
}
