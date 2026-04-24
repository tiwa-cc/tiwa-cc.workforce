import { Navigate, Route, Routes } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { AttendancePage } from "@/presentation/pages/AttendancePage";
import { useCurrentUserQuery } from "@/presentation/features/auth/useCurrentUserQuery";
import { DashboardPage } from "@/presentation/pages/DashboardPage";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { ReportPage } from "@/presentation/pages/ReportPage";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={
          <RequireGuest>
            <LoginPage />
          </RequireGuest>
        }
      />
      <Route
        path="/attendance"
        element={
          <RequireAuth>
            <AttendancePage />
          </RequireAuth>
        }
      />
      <Route
        path="/reports"
        element={
          <RequireAuth>
            <ReportPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isLoading) {
    return <AuthLoadingScreen />;
  }

  if (!currentUserQuery.data) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function RequireGuest({ children }: { children: JSX.Element }) {
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isLoading) {
    return <AuthLoadingScreen />;
  }

  if (currentUserQuery.data) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,226,172,0.24),transparent_24%),linear-gradient(160deg,rgba(15,23,42,0.96),rgba(39,60,87,0.92))] px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_30px_90px_-40px_rgba(15,23,42,1)] backdrop-blur">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28 rounded-full bg-white/15" />
          <Skeleton className="h-10 w-full rounded-[1.5rem] bg-white/15" />
          <Skeleton className="h-10 w-full rounded-[1.5rem] bg-white/15" />
          <Skeleton className="h-11 w-full rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  );
}
