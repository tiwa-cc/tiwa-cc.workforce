import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/shared/i18n/I18nProvider";

interface State {
  hasError: boolean;
}

interface AppErrorBoundaryInnerProps {
  children: ReactNode;
  description: string;
  title: string;
  reloadTitle: string;
  reloadDescription: string;
}

class AppErrorBoundaryInner extends Component<AppErrorBoundaryInnerProps, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled application error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center p-6">
          <Card className="w-full max-w-xl border-destructive/15 bg-card/90">
            <CardHeader>
              <CardDescription>{this.props.description}</CardDescription>
              <CardTitle>{this.props.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>{this.props.reloadTitle}</AlertTitle>
                <AlertDescription>{this.props.reloadDescription}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </main>
      );
    }

    return this.props.children;
  }
}

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  return (
    <AppErrorBoundaryInner
      description={t("error.application")}
      reloadDescription={t("error.reloadDescription")}
      reloadTitle={t("error.reloadTitle")}
      title={t("error.unexpected")}
    >
      {children}
    </AppErrorBoundaryInner>
  );
}
