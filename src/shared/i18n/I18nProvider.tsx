import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { type Locale, messages, type TranslationKey } from "@/shared/i18n";

const LOCALE_STORAGE_KEY = "workforce-manager-locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps extends PropsWithChildren {
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(() => initialLocale ?? readStoredLocale() ?? "ja");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  function t(key: TranslationKey, values?: Record<string, string | number>) {
    return interpolate(messages[locale][key], values);
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  if (stored === "ja" || stored === "en") {
    return stored;
  }

  return null;
}

function interpolate(template: string, values?: Record<string, string | number>) {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}
