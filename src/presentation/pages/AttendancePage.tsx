import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/presentation/components/AppShell";
import { AttendanceForm } from "@/presentation/features/attendance/AttendanceForm";
import { useAttendanceListQuery } from "@/presentation/features/attendance/useAttendanceListQuery";
import { useI18n } from "@/shared/i18n/I18nProvider";

export function AttendancePage() {
  const { t } = useI18n();
  const { data, isLoading, isError } = useAttendanceListQuery();

  return (
    <AppShell>
      <AttendanceForm />
      <Card>
        <CardHeader>
          <CardDescription>{t("attendance.recentRecordsDescription")}</CardDescription>
          <CardTitle>{t("attendance.recentRecordsTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton className="h-28 rounded-[1.5rem]" key={index} />
              ))}
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertTitle>{t("attendance.listErrorTitle")}</AlertTitle>
              <AlertDescription>{t("attendance.listErrorDescription")}</AlertDescription>
            </Alert>
          )}

          {data && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.map((record) => (
                <article
                  className="rounded-[1.75rem] border border-border/70 bg-background/70 p-5 shadow-sm"
                  key={record.date}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {record.date}
                  </p>
                  <p className="mt-3 text-lg font-semibold">
                    {record.actualStartAt} - {record.actualEndAt}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("attendance.breakMinutesValue", { minutes: record.breakMinutes })}
                  </p>
                  {record.note ? <p className="mt-3 text-sm leading-6 text-foreground/80">{record.note}</p> : null}
                </article>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
