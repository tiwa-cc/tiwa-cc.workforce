import { Layers3, UsersRound } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/presentation/components/AppShell";
import { useCurrentUserQuery } from "@/presentation/features/auth/useCurrentUserQuery";
import { useAttendanceListQuery } from "@/presentation/features/attendance/useAttendanceListQuery";
import { useI18n } from "@/shared/i18n/I18nProvider";

export function DashboardPage() {
  const { t } = useI18n();
  const userQuery = useCurrentUserQuery();
  const attendanceQuery = useAttendanceListQuery();

  return (
    <AppShell>
      <Card className="overflow-hidden border-0 bg-[radial-gradient(circle_at_top_left,rgba(255,226,172,0.38),transparent_22%),linear-gradient(135deg,rgba(15,23,42,0.95),rgba(32,58,95,0.92))] text-primary-foreground shadow-[0_30px_90px_-40px_rgba(15,23,42,1)]">
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="space-y-4">
            <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75">
              {t("dashboard.badge")}
            </div>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{t("dashboard.heroTitle")}</h2>
              <p className="max-w-2xl text-sm leading-7 text-white/78">{t("dashboard.heroDescription")}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                {t("dashboard.stateLayer")}
              </p>
              <p className="mt-3 text-lg font-semibold">{t("dashboard.stateLayerTitle")}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{t("dashboard.stateLayerDescription")}</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/12 bg-white/6 p-5 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                {t("dashboard.uiSystem")}
              </p>
              <p className="mt-3 text-lg font-semibold">{t("dashboard.uiSystemTitle")}</p>
              <p className="mt-2 text-sm leading-6 text-white/72">{t("dashboard.uiSystemDescription")}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardDescription>{t("dashboard.currentSession")}</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <UsersRound className="size-5 text-accent" />
              {t("dashboard.currentUser")}
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
                <AlertTitle>{t("dashboard.userErrorTitle")}</AlertTitle>
                <AlertDescription>{t("dashboard.userErrorDescription")}</AlertDescription>
              </Alert>
            )}

            {userQuery.data && (
              <div className="space-y-2">
                <p className="text-2xl font-semibold tracking-tight">{userQuery.data.name}</p>
                <p className="text-sm text-muted-foreground">{userQuery.data.email}</p>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard.employeeCode", { employeeCode: userQuery.data.employeeCode })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>{t("dashboard.attendanceSummary")}</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Layers3 className="size-5 text-accent" />
              {t("dashboard.attendanceRecords")}
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
                <AlertTitle>{t("dashboard.attendanceErrorTitle")}</AlertTitle>
                <AlertDescription>{t("dashboard.attendanceErrorDescription")}</AlertDescription>
              </Alert>
            )}

            {attendanceQuery.data && (
              <div className="space-y-2">
                <p className="text-3xl font-semibold tracking-tight">{attendanceQuery.data.length}</p>
                <p className="text-sm text-muted-foreground">{t("dashboard.savedRecordCount")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
