# Workforce Manager

Workforce Manager は、React + Zustand + React Query をベースにした勤怠管理ポートフォリオです。

## 採用方針

- UI: React + Vite + TypeScript
- 状態管理: Zustand
- API キャッシュ: React Query
- アーキテクチャ: Hexagonal Architecture
- 初期 API 実装: Mock Repository

## ディレクトリ構成

```text
src
├─ app              # アプリ起動、Provider、Router
├─ domain           # エンティティ、ドメインルール
├─ application      # ユースケース、Port
├─ infrastructure   # API クライアント、Repository 実装
├─ presentation     # ページ、機能別 UI、コンポーネント
└─ shared           # 共通型、共通ユーティリティ
```

## テスト

- Test Runner: Vitest
- UI Test: Testing Library
- DOM Environment: jsdom

```bash
npm test
npm run test:watch
```

## 今後の実装候補

- API クライアントの本実装
- 認証フローの接続
- 勤怠一覧・検索クエリの詳細化
- テスト、Lint、CI の追加
