# QAmind

ジュニアエンジニアが「品質思考」を身につけるためのテスト設計学習CLIアプリ。

AIがコードを書く時代に、エンジニアに求められる「何を守るべきか」「どうテストすべきか」を判断する力を育てる。

## 概要

- テスト設計の観点を段階的に学べる全10問のカリキュラム
- Inkによるインタラクティブな選択問題 + vitestによるテスト演習
- 日本語・IDE完結の学習体験

## 技術スタック

- TypeScript (ESM)
- Ink (CLIフレームワーク)
- vitest (テストフレームワーク)
- pnpm (パッケージマネージャー)

## セットアップ

```bash
pnpm install
pnpm build
```

## 使い方

```bash
npx qamind
```

## 開発

```bash
pnpm dev       # 開発モード（watch）
pnpm test      # CLIアプリのテスト
pnpm lint      # ESLint
pnpm format    # Prettier
pnpm typecheck # 型チェック
pnpm build     # ビルド
```

## 開発フロー

Claude Codeのカスタムコマンドを使ったスペック駆動開発で進める。

```
1. /task-design #N   → issueからブランチ作成 → ステアリングファイル作成 → Draft PR作成
2. ステアリングファイルを確認
3. /text-create N    → TEXT.md下書き作成（コンテンツ系issueの場合）
   /task-run <path>  → ステアリングファイルに基づき実装（実装系issueの場合）
4. /task-check       → テスト実行・完了条件照合 → TODO.md更新
5. push → PRマージ
```

### カスタムコマンド一覧

| コマンド | 用途 |
|---------|------|
| `/task-design #N` | issueからタスク設計書作成 → ブランチ・PR作成 |
| `/task-run <path>` | ステアリングファイルに基づきテスト → 実装 |
| `/task-check` | テスト実行・完了条件照合 |
| `/text-create N` | 学習コンテンツTEXT.mdの下書き作成 |
| `/test-review N` | 応用フェーズの学習者コード添削 |

## ドキュメント

- [要件定義](./docs/requirements.md)
- [デザインドック](./docs/design.md)
- [TODO](./docs/TODO.md)
