import { enMessages } from "@/shared/i18n/en/messages";
import { jaMessages } from "@/shared/i18n/ja/messages";

export const messages = {
  ja: jaMessages,
  en: enMessages,
} as const;

export type Locale = keyof typeof messages;
export type TranslationKey = keyof typeof jaMessages;

