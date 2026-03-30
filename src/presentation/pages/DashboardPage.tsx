import { AppShell } from "@/presentation/components/AppShell";
import { useCurrentUserQuery } from "@/presentation/features/auth/useCurrentUserQuery";
import { useAttendanceListQuery } from "@/presentation/features/attendance/useAttendanceListQuery";

export function DashboardPage() {
  const userQuery = useCurrentUserQuery();
  const attendanceQuery = useAttendanceListQuery();

  return (
    <AppShell>
      <section className="hero">
        <p className="eyebrow">Dashboard</p>
        <h2>Workforce Manager の基盤</h2>
        <p className="muted">ログインユーザ管理、勤怠入力、レポート画面のベースを Hexagonal Architecture で分離しています。</p>
      </section>

      <section className="cards">
        <article className="panel stack">
          <h3>ログインユーザ</h3>
          {userQuery.isLoading && <p>読み込み中...</p>}
          {userQuery.isError && <p className="error-text">ユーザ取得に失敗しました。</p>}
          {userQuery.data && (
            <>
              <p>{userQuery.data.name}</p>
              <p className="muted">{userQuery.data.email}</p>
            </>
          )}
        </article>

        <article className="panel stack">
          <h3>勤怠レコード</h3>
          {attendanceQuery.isLoading && <p>読み込み中...</p>}
          {attendanceQuery.isError && <p className="error-text">勤怠取得に失敗しました。</p>}
          {attendanceQuery.data && <p>{attendanceQuery.data.length} 件のレコードを保持しています。</p>}
        </article>
      </section>
    </AppShell>
  );
}

