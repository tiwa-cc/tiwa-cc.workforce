# Decisions

## 2026-03-31

### 1. フロントエンド基盤は React + Vite + TypeScript を採用

理由:

- 画面追加とビルド速度のバランスが良い
- Vitest との親和性が高い
- Vite 8 系と Node 20 系で開発環境を揃えやすい

### 2. アーキテクチャは Hexagonal Architecture を採用

理由:

- UI、UseCase、Repository 実装を分離しやすい
- Mock 実装から本 API 実装へ置換しやすい
- ポートフォリオとして責務分離を明示しやすい

### 3. 状態管理は Zustand と React Query を分離して利用

理由:

- React Query はサーバ状態に集中させる
- Zustand はセッション的なローカル状態に限定する
- 役割を混ぜないことで設計が説明しやすい

現時点の使い分け:

- React Query: `current-user`, `attendance-records`
- Zustand: `currentUser`

### 4. UI システムは shadcn/ui + Tailwind CSS v4 を採用

理由:

- 業務画面向けの共通 UI を素早く揃えられる
- コンポーネントコードを自前管理できる
- デザイン変更に対して閉じた修正にしやすい

### 5. 初期データ供給は Mock Repository を採用

理由:

- API 未確定の段階でも UI と状態管理を先に進められる
- Port 設計を先に固められる

### 6. テスト基盤は Vitest + Testing Library を採用

理由:

- Vite との相性が良い
- UI レベルの振る舞いを確認しやすい
- jsdom を使って画面コンポーネントをそのまま検証できる

## 保留中の意思決定

- レポート検索クエリの仕様
- 認証方式とトークン保管戦略
- 異常検知をどの層で責務分離するか
- レポート集計をクライアント計算に寄せるか、API に寄せるか
