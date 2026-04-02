import type { PropsWithChildren, ReactElement } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createQueryClient } from "@/app/providers/queryClient";
import { I18nProvider } from "@/shared/i18n/I18nProvider";
import type { Locale } from "@/shared/i18n";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
  queryClient?: QueryClient;
  locale?: Locale;
}

export function renderWithProviders(
  ui: ReactElement,
  { route = "/", queryClient = createQueryClient(), locale = "ja", ...options }: RenderWithProvidersOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <I18nProvider initialLocale={locale}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </QueryClientProvider>
      </I18nProvider>
    );
  }

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

export * from "@testing-library/react";
