import { AppRouter } from "@/app/router/AppRouter";
import { AppErrorBoundary } from "@/presentation/components/AppErrorBoundary";

export function App() {
  return (
    <AppErrorBoundary>
      <AppRouter />
    </AppErrorBoundary>
  );
}

