# Roadmap

## 目的

このドキュメントは、Workforce Manager をポートフォリオとして公開する上で、次に実装すると効果の高い項目を管理するためのメモである。  
現時点では「公開可能な土台」はあるため、ここでは見栄えと説明しやすさの両方に効く実装を優先する。

## 優先度 High

### 1. レポート画面の最小実装

狙い:

- プレースホルダ画面から脱却し、業務画面としての完成度を上げる
- 「入力して終わり」ではなく、入力結果を閲覧・集計できる導線を見せる

実装案:

- 期間指定フォーム
- 集計カード
  - 勤怠件数
  - 総労働時間
  - 異常候補件数

補足:

- 検索条件は最小構成でよく、まずはモックデータを期間で絞れるだけでも十分

### 2. Mock Repository の localStorage 永続化

対象:

- `MockAttendanceRepository`

狙い:

- ブラウザ再読み込み後も保存内容を保持し、デモ品質を上げる
- 本 API 実装前でも「保存されるアプリ」として見せやすくする

実装案:

- 初期表示時に `localStorage` から勤怠データを復元
- 保存時に最新データを `localStorage` へ反映
- データ未保存時のみ初期モックデータを利用

### 3. 勤怠入力の最小バリデーション

対象:

- `AttendanceForm`
- `saveAttendance`

狙い:

- 入力エラーを防ぎ、画面の完成度を上げる
- a11y の `aria-invalid` と整合する状態管理を作る

実装案:

- 必須入力: 日付
- 時刻整合: `actualEndAt < actualStartAt` を禁止
- 数値整合: `breakMinutes < 0` を禁止
- エラーメッセージ表示
- `aria-invalid` と `aria-describedby` の追加

## 実装済み

### Demo 用ログイン導線

- `/login` をユーザ情報画面からログイン画面へ変更済み
- 未認証時は保護ルートから `/login` へリダイレクトする構成を追加済み
- 固定メールアドレス / パスワードによるモック認証を追加済み
- Demo 用アカウントをログイン画面下部に表示済み

### Vercel 公開向け設定

- `package.json` に `engines.node: "24.x"` を追加済み
- `vercel.json` に SPA 用 rewrite を追加済み
- 公開 URL を README に記載済み

### GitHub Actions CI

- `develop` / `master` の `push` で実行
- `develop` / `master` 向けの `pull_request` でも実行
- 実行内容:
  - `npm ci`
  - `npm run lint`
  - `npm test -- --run`
  - `npm run build`

## 優先度 Low

### 4. Demo 認証から本番認証への差し替え

現状:

- 固定資格情報によるモック認証
- 認証状態は `localStorage` に保存

改善案:

- `POST /api/auth/login` と `GET /api/auth/me` に接続する
- 401 時の共通ハンドリングと再ログイン導線を整備する

補足:

- Demo としては十分だが、実運用前には差し替えが必要

## 当面の実装順

1. レポート画面の最小実装
2. Mock Repository の localStorage 永続化
3. 勤怠入力の最小バリデーション
