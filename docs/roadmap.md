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

## 優先度 Medium

### 4. Vercel 公開向けの設定追加

狙い:

- デプロイ時の不整合を減らす
- 公開先を想定したプロジェクト整備を明示する

実装案:

- `package.json` に `engines.node: "24.x"` を追加
- `vercel.json` に SPA 用 rewrite を追加
- README にデプロイ手順の要点を追記

### 5. GitHub Actions による CI

狙い:

- `lint`、`test`、`build` が継続的に通ることを示す
- ポートフォリオとして保守性を見せる

実装案:

- `push`
- `pull_request`

実行内容:

- `npm ci`
- `npm run lint`
- `npm test -- --run`
- `npm run build`

## 優先度 Low

### 6. ユーザ情報画面の導線整理

現状:

- ルートは `/login`
- 画面内容は実質的に「ユーザ情報」

改善案:

- ルートを `/user` などへ寄せる
- もしくは簡単なモックログイン導線を追加して、画面名と内容を揃える

補足:

- 現時点では致命的ではないため、他の完了後でよい

## 当面の実装順

1. レポート画面の最小実装
2. Mock Repository の localStorage 永続化
3. 勤怠入力の最小バリデーション
4. Vercel 公開向け設定
5. GitHub Actions CI
