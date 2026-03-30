import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { GlobalLoadingBar } from "@/presentation/components/GlobalLoadingBar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Workforce Manager</p>
          <h1>勤怠管理</h1>
        </div>
        <nav className="nav">
          <NavLink to="/">ダッシュボード</NavLink>
          <NavLink to="/attendance">勤怠入力</NavLink>
          <NavLink to="/reports">レポート</NavLink>
          <NavLink to="/login">ログイン</NavLink>
        </nav>
      </aside>
      <main className="content">
        <GlobalLoadingBar />
        {children}
      </main>
    </div>
  );
}

