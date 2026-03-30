# Anomaly Detection

## 前提

現時点では異常検知は未実装であり、レポート画面もプレースホルダの段階である。
このドキュメントは、今後どのような異常を扱うかの初期設計メモとする。

## 判定対象データ

- `date`
- `scheduledStartAt`
- `scheduledEndAt`
- `actualStartAt`
- `actualEndAt`
- `breakMinutes`
- `note`

## 初期ルール候補

### 1. 打刻漏れ

条件例:

- `actualStartAt` が未入力
- `actualEndAt` が未入力

### 2. 遅刻

条件例:

- `actualStartAt > scheduledStartAt`

補足:

- 許容遅延分を何分とするかは未決定

### 3. 早退

条件例:

- `actualEndAt < scheduledEndAt`

### 4. 長時間労働

条件例:

- 実働時間が閾値を超える

補足:

- 実働時間 = `(actualEndAt - actualStartAt) - breakMinutes`

### 5. 休憩不備

条件例:

- `breakMinutes < 0`
- 休憩時間が極端に短い
- 休憩時間が極端に長い

## 想定出力モデル

初期案:

```ts
interface AttendanceAnomaly {
  code:
    | "missing-start"
    | "missing-end"
    | "late-arrival"
    | "early-leave"
    | "overtime"
    | "break-invalid";
  severity: "info" | "warning" | "critical";
  message: string;
}
```

## 実装方針の候補

### A. クライアント判定

利点:

- 実装開始が早い
- レポート画面のプロトタイプが作りやすい

懸念:

- ルールの共有がしづらい
- サーバ側集計と二重管理になりやすい

### B. サーバ判定

利点:

- ルールの一元管理がしやすい
- 集計 API と整合を取りやすい

懸念:

- API 実装待ちになる

## 当面の方針

- まずはクライアント側でルールを試作してもよい
- ただし最終的な責務は API 側へ寄せる前提で設計する
- フロントエンドでは「異常検知結果を表示するモデル」に依存する形へ寄せる
