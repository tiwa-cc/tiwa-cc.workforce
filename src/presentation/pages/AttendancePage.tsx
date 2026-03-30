import { AppShell } from "@/presentation/components/AppShell";
import { AttendanceForm } from "@/presentation/features/attendance/AttendanceForm";
import { useAttendanceListQuery } from "@/presentation/features/attendance/useAttendanceListQuery";

export function AttendancePage() {
  const { data, isLoading, isError } = useAttendanceListQuery();

  return (
    <AppShell>
      <AttendanceForm />
      <section className="panel stack">
        <div>
          <p className="eyebrow">Recent Records</p>
          <h2>保存済みレコード</h2>
        </div>
        {isLoading && <p>レコードを取得しています...</p>}
        {isError && <p className="error-text">レコード取得に失敗しました。</p>}
        {data && (
          <div className="record-list">
            {data.map((record) => (
              <article className="record-card" key={record.date}>
                <strong>{record.date}</strong>
                <p>
                  {record.actualStartAt} - {record.actualEndAt}
                </p>
                <p className="muted">休憩 {record.breakMinutes} 分</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}

