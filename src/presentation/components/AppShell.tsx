import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { Clock3, FileText, LayoutDashboard, UserRound } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GlobalLoadingBar } from "@/presentation/components/GlobalLoadingBar";

const NAV_ITEMS = [
  { to: "/", label: "ダッシュボード", icon: LayoutDashboard },
  { to: "/attendance", label: "勤怠入力", icon: Clock3 },
  { to: "/reports", label: "レポート", icon: FileText },
  { to: "/login", label: "ログイン", icon: UserRound },
] as const;

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-5 p-4 lg:flex-row lg:p-6">
        <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-80">
          <div className="flex h-full flex-col rounded-[2.25rem] border border-white/15 bg-primary/95 p-6 text-primary-foreground shadow-[0_30px_90px_-40px_rgba(15,23,42,0.9)]">
            <div className="space-y-4">
              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75">
                Workforce Manager
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">勤怠管理</h1>
                <p className="text-sm leading-6 text-white/72">
                  ログインユーザ、勤怠入力、レポートを一つの業務導線として整理します。
                </p>
              </div>
            </div>

            <Separator className="my-6 bg-white/10" />

            <nav className="grid gap-2">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "border-accent/40 bg-accent text-accent-foreground shadow-lg shadow-black/10"
                        : "border-transparent text-white/74 hover:border-white/10 hover:bg-white/5 hover:text-white",
                    )
                  }
                  to={to}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                Architecture
              </p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                React / Zustand / React Query を Hexagonal Architecture 上に分離しています。
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 py-2 lg:py-4">
          <GlobalLoadingBar />
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
