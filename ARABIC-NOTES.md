# Arabic / RTL Implementation Notes

Handout for continuing Arabic work on this site. Read this before touching any `locale`/`dir`/Arabic-copy code.

## Current state

- The **home page** (`components/home-page.tsx`) and **services page** (`components/services-page.tsx`) have Arabic enabled. The remaining pages (`products-page.tsx`, `use-cases-page.tsx`, `ai-academy-page.tsx`, `assessment-page.tsx`, `contact-page.tsx`) pass `allowArabic={false}` to `SiteHeader`/`SiteFooter`, so the language toggle is hidden and they stay English-only. To add Arabic to a page: pass Arabic copy, set `allowArabic` (or remove the prop, defaults to `true`), and give the page's root wrapper `dir={locale === "ar" ? "rtl" : "ltr"}` and `lang={locale}`.
- `LocaleProvider` from `components/use-persistent-locale.ts` is mounted once in the root layout. Arabic-enabled pages consume it through `usePersistentLocale()`, while shared internal navigation uses Next `Link` so the provider stays mounted across page changes. The selection is also stored under `adopters-locale` in `localStorage` for reloads and new tabs. English-only pages still force their shell to English through `allowArabic={false}`. `Locale = "en" | "ar"` from `components/site-shell.tsx`.

## Fonts

- **English**: `Inter` (body/headings), `Poppins` (header nav links only).
- **Arabic**: `Almarai`, loaded via `next/font/google` in `app/layout.tsx`, exposed as `--font-almarai`, and wired to `--font-arabic` in `app/globals.css`. Applied automatically to anything under `[lang="ar"]`.
- Cascade: `[lang="ar"] { font-family: var(--font-arabic); font-synthesis: none; }` in `globals.css`. Any element that needs to opt OUT of Almarai (e.g. the desktop nav links, which use Poppins for English) must set its own font-family directly on that element — a directly-applied class always wins over the inherited `[lang="ar"]` rule regardless of specificity math.
- **Almarai final-yeh mitigation**: the official files reported glyph bounds down to `-378…-453` units while `hhea`/typographic descent was only `-211`. The site now self-hosts patched Almarai files from `assets/fonts/almarai-patched/` with expanded descent metrics; glyph outlines are unchanged. The official files remain in `assets/fonts/almarai-original/`, and `/font-test` renders an A/B matrix for device testing. `scripts/patch-almarai-font.mjs` reproduces the patch and validates the TrueType checksum. This is a clipping mitigation, not a guaranteed fix for browser rasterizer defects.
- `[lang="ar"] .font-black, [lang="ar"] .font-extrabold { font-weight: 700; }` — global weight cap in `globals.css`, unlayered (outside `@layer base`) so it beats Tailwind's utility layer. Lowering weight further reduced (but did not 100% eliminate) the yeh-glyph bug.
- `[lang="ar"] h1, h2, h3 { line-height: 1.5 !important; }` — Arabic diacritics (tashkeel — damma, shadda, etc.) need much more vertical room than the tight leading used for English display type. Without this, diacritics visually crowd/overlap the line above. This is also unlayered + `!important` to beat inline Tailwind `leading-[...]` utilities.
- Arabic paragraphs, links, buttons, list items, labels, and form controls use an unlayered `line-height: 1.7`. This protects lower glyphs, descenders, and diacritics from being clipped by browser-specific font metrics. Keep text containers flexible (`min-height` + padding) rather than assigning a fixed height.
- `html` fixes browser text autosizing at `100%` with `text-size-adjust`/`-webkit-text-size-adjust`, preventing mobile browsers from silently changing line boxes after layout.

## RTL layout — the one rule that matters

**`dir="rtl"` already auto-mirrors `flex-direction: row` and CSS Grid track order.** This is native browser behavior, not something you opt into.

Consequence: any `isAr ? "flex-row-reverse" : ""`, `isAr ? "lg:order-2" : ""`, or `isAr ? "lg:grid-flow-col-dense" : ""` pattern **double-flips** and cancels itself out — the Arabic layout ends up visually identical to English instead of mirrored. This was the root cause of "the toggle doesn't visually change anything" bug reported earlier and took a while to diagnose. Symptom to watch for: computed styles show the "mirrored" value applied, but the page looks unchanged — that's the double-flip.

**Rule going forward: do NOT add manual row-reverse / order / grid-flow-dense overrides for RTL.** Let plain `flex`/`grid` mirror natively. Only reach for manual overrides for things that are NOT direction-aware:
- Absolute positioning (`left-0`/`right-0`, `left-8`/`right-8`) — these are physical, not logical, and DO need `isAr ? "left-X" : "right-X"` swaps.
- Hero watermark images attach to `right-0` in English. In Arabic they attach to `left-0` and use `-scale-x-100`, keeping the same outward-facing edge against the viewport after mirroring.
- Non-logical margin/padding (`mr-2`, `ml-4`) — physical, don't auto-flip. Prefer Tailwind's logical utilities (`ms-`, `me-`, `ps-`, `pe-`) which DO auto-flip with `dir`. If you must use a physical utility, swap it manually (e.g. the services-card meta-row icon in `home-page.tsx` uses `me-2` specifically because `mr-2` broke icon-to-text spacing under RTL).
- Explicit array/content reordering in JS (e.g. `phases.reverse()`) — same double-flip trap if the visual container also auto-mirrors. Don't manually reverse array order to "fix" RTL; let the grid do it.

## Other things fixed so far (don't regress these)

- `whitespace-nowrap` on headings truncates Arabic text because Arabic translations run longer than English. Any `lg:whitespace-nowrap` on a heading that has Arabic copy needs to be conditional (`isAr ? "" : "lg:whitespace-nowrap"`) or removed outright.
- The home hero uses the animated `HeroIntelligenceCard` in both locales. Changing locale remounts the chart so the staggered bar animation replays with the translated card copy.
- Language toggle (`LanguageToggle` in `components/language-toggle.tsx`) is rendered inside `SiteHeader` gated by the `allowArabic` prop — it was previously imported but never rendered; make sure any new page wiring doesn't drop this again.

## Verification workflow

Use the `Claude Preview` MCP tools (`preview_start`/`preview_eval`/`preview_screenshot`) against a **second dev server on a different port** (e.g. 3411) so you never fight over port 3000 with the user's own `npm run dev`. Click the language toggle via `document.querySelectorAll('[aria-label="Language selector"] button')[1].click()`, then check computed styles (`getBoundingClientRect().left`, `getComputedStyle(...).fontFamily/fontWeight`) rather than trusting screenshots alone — screenshots at small viewport sizes can be misleading, and DPI/scaling artifacts have caused false reads before. Always verify BOTH locales after any layout change, not just Arabic.
