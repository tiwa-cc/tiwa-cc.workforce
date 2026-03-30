import { Navigate, Route, Routes } from "react-router-dom";
import { AttendancePage } from "@/presentation/pages/AttendancePage";
import { DashboardPage } from "@/presentation/pages/DashboardPage";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { ReportPage } from "@/presentation/pages/ReportPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/reports" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

