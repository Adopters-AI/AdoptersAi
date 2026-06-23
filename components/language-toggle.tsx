"use client";

export type Locale = "en" | "ar";

export function LanguageToggle({
  locale,
  onChange
}: {
  locale: Locale;
  onChange: (locale: Locale) => void;
}) {
  const options =
    locale === "ar"
      ? [
          { value: "en" as const, label: "EN" },
          { value: "ar" as const, label: "عربي" }
        ]
      : [
          { value: "en" as const, label: "EN" },
          { value: "ar" as const, label: "AR" }
        ];

  return (
    <div className="flex rounded-full bg-white/[0.06] p-1 text-[11px] font-black" aria-label="Language selector">
      {options.map((item) => (
        <button
          aria-pressed={locale === item.value}
          className={`rounded-full px-3 py-1 transition ${
            locale === item.value ? "bg-brand-green text-[#031915]" : "text-white/65 hover:text-white"
          }`}
          key={item.value}
          onClick={() => onChange(item.value)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
