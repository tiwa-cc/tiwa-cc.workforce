import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/providers/queryClient";
import { I18nProvider } from "@/shared/i18n/I18nProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nProvider>
  );
}
