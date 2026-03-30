import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppShell } from "@/presentation/components/AppShell";
import { AttendanceForm } from "@/presentation/features/attendance/AttendanceForm";
import { useAttendanceListQuery } from "@/presentation/features/attendance/useAttendanceListQuery";

export function AttendancePage() {
  const { data, isLoading, isError } = useAttendanceListQuery();

  return (
    <AppShell>
      <AttendanceForm />
      <Card>
        <CardHeader>
          <CardDescription>Recent Records</CardDescription>
          <CardTitle>保存済みレコード</CardTitle>
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
              <AlertTitle>レコード取得に失敗しました</AlertTitle>
              <AlertDescription>勤怠一覧の取得でエラーが発生しました。</AlertDescription>
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
                  <p className="mt-2 text-sm text-muted-foreground">休憩 {record.breakMinutes} 分</p>
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
