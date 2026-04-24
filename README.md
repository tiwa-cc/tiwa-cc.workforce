# Workforce Manager

## English Summary

Workforce Manager is a frontend portfolio project for workforce management.  
It is built with React, Zustand, React Query, and a Hexagonal Architecture approach.  
The current scope includes demo sign-in, attendance input, and a report screen backed by mock repositories.

Workforce Manager は、Demo 用ログイン、勤怠入力、レポートの基盤を持つ勤怠管理ポートフォリオです。  
現在はモックデータを用いたフロントエンド先行開発段階で、Hexagonal Architecture を前提に UI、状態管理、API 境界、テスト基盤を先に整備しています。

## 公開先

- Demo: <https://tiwa-cc-workforce.vercel.app/>
- Repository: <https://github.com/tiwa-cc/tiwa-cc.workforce>

## 採用方針

- UI: React + Vite + TypeScript
- Design System: shadcn/ui + Tailwind CSS v4
- 状態管理: Zustand
- API キャッシュ: React Query
- l10n: Context ベースの最小構成 (`ja` / `en`)
- a11y: `eslint-plugin-jsx-a11y` + `aria-live` / `aria-busy` の最小対応
- テスト: Vitest + Testing Library + jsdom
- CI: GitHub Actions (`develop` / `master` の push・PR)
- アーキテクチャ: Hexagonal Architecture
- 初期 API 実装: Mock Repository

## 開発環境

- Node.js: `.nvmrc` で `24` 系を指定
- npm: lockfile による依存再現を前提

## 主要機能

- Demo 用ログイン
  - 固定メールアドレス / パスワードで認証
  - 未認証時は保護ルートから `/login` へリダイレクト
- 勤怠入力
  - 開始予定
  - 終了予定
  - 開始実績
  - 終了実績
  - 休憩
  - 備考
- レポート画面
  - 検索条件は今後詳細化予定

## 実行コマンド

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
npm run test:watch
```

## ディレクトリ構成

```text
docs
├─ architecture.md
├─ api-design.md
├─ decisions.md
├─ state-machine.md
├─ anomaly-detection.md
└─ roadmap.md

src
├─ app              # アプリ起動、Provider、Router
├─ domain           # エンティティ、ドメインルール
├─ application      # ユースケース、Port
├─ infrastructure   # API クライアント、Repository 実装
├─ components/ui    # shadcn/ui ベースの共通 UI
├─ lib              # UI 共通ユーティリティ
├─ presentation     # ページ、機能別 UI、コンポーネント
├─ test             # テストセットアップ、共通 render
└─ shared           # 共通型、共通ユーティリティ、i18n
```

## 現在の画面構成

- `/login`: ログイン画面
  - Demo 用アカウントを画面下部に表示
- `/`: ダッシュボード
  - 認証済みユーザのみ表示
- `/attendance`: 勤怠入力と保存済みレコード
  - 認証済みユーザのみ表示
- `/reports`: レポート画面の受け皿
  - 認証済みユーザのみ表示

## Demo 認証

- メールアドレス: `taro@example.com`
- パスワード: `demo1234`
- 認証状態: `localStorage` に保存する簡易モック実装

## 設計ドキュメント

- [Architecture](docs/architecture.md)
- [API Design](docs/api-design.md)
- [Decisions](docs/decisions.md)
- [State Machine](docs/state-machine.md)
- [Anomaly Detection](docs/anomaly-detection.md)
- [Roadmap](docs/roadmap.md)

## テスト

- Test Runner: Vitest
- UI Test: Testing Library
- DOM Environment: jsdom
- 現在のサンプル:
  - `AppShell`
  - `AttendanceForm`
  - `AppRouter`

## l10n

- 初期対応言語: `ja`, `en`
- 実装方式: `I18nProvider + useI18n + shared/i18n/{ja,en}/messages.ts`
- 言語切替 UI: サイドバー内の `日本語 / English`

## a11y

- Lint: `eslint-plugin-jsx-a11y`
- 保存中状態: 勤怠入力フォームに `aria-busy`
- 状態通知: 保存中メッセージに `role="status"` + `aria-live="polite"`
- 成功 / 失敗通知: `Alert` ベースで表示

## 今後の実装候補

- 詳細は [docs/roadmap.md](docs/roadmap.md) を参照
- API クライアントの本実装
- 本番認証フローへの差し替え
- 異常検知ルールの実装
