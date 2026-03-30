import { Layers3, UsersRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/presentation/components/AppShell";
import { useCurrentUserQuery } from "@/presentation/features/auth/useCurrentUserQuery";
import { useAttendanceListQuery } from "@/presentation/features/attendance/useAttendanceListQuery";

export function DashboardPage() {
  const userQuery = useCurrentUserQuery();
  const attendanceQuery = useAttendanceListQuery();

  return (
    <AppShell>
      <Card className="overflow-hidden border-0 bg-[radial-gradient(circle_at_top_left,rgba(255,226,172,0.38),transparent_22%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(32,58,95,0.92))] text-primary-foreground shadow-[0_30px_90px_-40px_rgba(15,23,42,1)]">
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="space-y-4">
            <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">
              Dashboard
            </div>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Workforce Manager の基盤を shadcn/ui へ移行
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/78">
                ログインユーザ管理、勤怠入力、レポート画面を、Hexagonal Architecture の責務分離を崩さずに
                `shadcn/ui` ベースの UI に載せ替えています。
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                State Layer
              </p>
              <p className="mt-3 text-lg font-semibold">Zustand + React Query</p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                UI 状態と API キャッシュを分離し、ローディングとエラー制御をコンポーネント側へ明示しています。
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                UI System
              </p>
              <p className="mt-3 text-lg font-semibold">shadcn/ui + Tailwind v4</p>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Card、Input、Alert などの共通 UI を揃え、今後の画面追加を同じトーンで拡張できます。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>Current Session</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <UsersRound className="size-5 text-accent" />
              ログインユーザ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userQuery.isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-56" />
              </div>
            )}

            {userQuery.isError && (
              <Alert variant="destructive">
                <AlertTitle>ユーザ取得に失敗しました</AlertTitle>
                <AlertDescription>ログイン状態を確認して再読み込みしてください。</AlertDescription>
              </Alert>
            )}

            {userQuery.data && (
              <div className="space-y-2">
                <p className="text-2xl font-semibold tracking-tight">{userQuery.data.name}</p>
                <p className="text-sm text-muted-foreground">{userQuery.data.email}</p>
                <p className="text-sm text-muted-foreground">社員コード: {userQuery.data.employeeCode}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Attendance Summary</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Layers3 className="size-5 text-accent" />
              勤怠レコード
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceQuery.isLoading && (
              <div className="space-y-3">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-48" />
              </div>
            )}

            {attendanceQuery.isError && (
              <Alert variant="destructive">
                <AlertTitle>勤怠取得に失敗しました</AlertTitle>
                <AlertDescription>モックデータの取得に失敗しています。</AlertDescription>
              </Alert>
            )}

            {attendanceQuery.data && (
              <div className="space-y-2">
                <p className="text-3xl font-semibold tracking-tight">{attendanceQuery.data.length}</p>
                <p className="text-sm text-muted-foreground">保存済みレコード件数</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
