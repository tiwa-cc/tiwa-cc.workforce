import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface State {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<{ children: ReactNode }, State> {
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
              <CardDescription>Application Error</CardDescription>
              <CardTitle>予期しないエラーが発生しました</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle />
                <AlertTitle>画面を再読み込みしてください</AlertTitle>
                <AlertDescription>問題が続く場合は調査ログを確認してください。</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </main>
      );
    }

    return this.props.children;
  }
}
