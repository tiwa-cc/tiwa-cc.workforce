# State Machine

## 目的

画面ごとのローディング、成功、失敗を明示し、React Query の query / mutation と UI 表示を対応づける。

## ログインユーザ取得

対象:

- `useCurrentUserQuery`
- `useAuthStore`

状態:

```text
idle
  -> loading
  -> success
  -> error
```

説明:

- `loading`: `getCurrentUser()` 実行中
- `success`: `query.data` を取得し、`useAuthStore.setCurrentUser()` を同期
- `error`: 取得失敗時。画面ではエラー表示

## 勤怠一覧取得

対象:

- `useAttendanceListQuery`

状態:

```text
idle
  -> loading
  -> success
  -> error
```

説明:

- `loading`: `attendanceRepository.list()` 実行中
- `success`: 一覧を表示
- `error`: 一覧取得失敗

## 勤怠保存

対象:

- `useSaveAttendanceMutation`
- `AttendanceForm`

状態:

```text
idle
  -> pending
  -> success
  -> error
```

説明:

- `pending`: 送信中。保存ボタンは disabled。フォームに `aria-busy="true"` を付与し、live region で保存中メッセージを通知
- `success`: 成功メッセージを表示し、`attendance-records` を invalidate
- `error`: エラーメッセージを表示

補足:

- Mock Repository 側で短い待機時間を入れ、pending 状態を UI 上で確認できるようにしている

## 画面ごとの UI 対応

### Dashboard

- ユーザ情報カード
  - loading: Skeleton
  - success: ユーザ情報表示
  - error: Alert

- 勤怠件数カード
  - loading: Skeleton
  - success: 件数表示
  - error: Alert

### Attendance

- 勤怠入力フォーム
  - pending: ボタン disabled、`aria-busy=true`、保存中ステータスを `aria-live` で通知
  - success: 保存完了 Alert
  - error: 失敗 Alert

- 保存済みレコード一覧
  - loading: Skeleton
  - success: カード表示
  - error: Alert

### Login

- loading: Skeleton
- success: ユーザ情報表示
- error: Alert

### Report

- 現時点では静的プレースホルダのみ
- 将来的には検索条件の入力状態と検索結果状態を定義する

## 今後追加する状態機械

- レポート検索
- 異常検知の判定状態
- 認証切れから再ログインまでの遷移
