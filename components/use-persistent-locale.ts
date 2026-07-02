"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "@/components/site-shell";

const LOCALE_STORAGE_KEY = "adopters-locale";

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ar";
}

type LocaleContextValue = readonly [Locale, (locale: Locale) => void];

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(storedLocale)) setLocaleState(storedLocale);
    } catch {
      // Keep the default locale when browser storage is unavailable.
    } finally {
      setReady(true);
    }

    const syncLocale = (event: StorageEvent) => {
      if (event.key === LOCALE_STORAGE_KEY && isLocale(event.newValue)) {
        setLocaleState(event.newValue);
      }
    };

    window.addEventListener("storage", syncLocale);
    return () => window.removeEventListener("storage", syncLocale);
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {
      // The in-memory locale still works when browser storage is unavailable.
    }
  }, []);

  const value = useMemo(() => [locale, setLocale] as const, [locale, setLocale]);

  return createElement(
    LocaleContext.Provider,
    { value },
    createElement("div", { style: { visibility: ready ? "visible" : "hidden" } }, children)
  );
}

export function usePersistentLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("usePersistentLocale must be used inside LocaleProvider");
  return context;
}
