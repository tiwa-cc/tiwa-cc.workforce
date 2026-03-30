import { AppShell } from "@/presentation/components/AppShell";
import { useCurrentUserQuery } from "@/presentation/features/auth/useCurrentUserQuery";

export function LoginPage() {
  const { data, isLoading, isError } = useCurrentUserQuery();

  return (
    <AppShell>
      <section className="panel stack">
        <div>
          <p className="eyebrow">Authentication</p>
          <h2>ログインユーザ管理</h2>
        </div>
        {isLoading && <p>ユーザ情報を取得しています...</p>}
        {isError && <p className="error-text">ログインユーザ情報の取得に失敗しました。</p>}
        {data && (
          <dl className="description-list">
            <div>
              <dt>社員コード</dt>
              <dd>{data.employeeCode}</dd>
            </div>
            <div>
              <dt>氏名</dt>
              <dd>{data.name}</dd>
            </div>
            <div>
              <dt>メール</dt>
              <dd>{data.email}</dd>
            </div>
          </dl>
        )}
      </section>
    </AppShell>
  );
}

