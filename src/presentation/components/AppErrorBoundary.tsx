import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

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
        <main className="screen-center">
          <section className="panel stack">
            <p className="eyebrow">Application Error</p>
            <h1>予期しないエラーが発生しました</h1>
            <p className="muted">画面を再読み込みし、問題が続く場合は調査ログを確認してください。</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

