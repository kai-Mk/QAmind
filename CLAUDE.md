# CLAUDE.md

QAmindプロジェクトにおけるClaude Codeの作業ガイドライン。

## プロジェクト概要

テスト設計学習CLIアプリ。Ink + vitest + TypeScript (ESM) で構成。
詳細は [docs/requirements.md](./docs/requirements.md) と [docs/design.md](./docs/design.md) を参照。

## 開発方針

- スペック駆動開発: テスト設計書を先に作成し、テストを書いてから実装する
- 作業の進捗は [docs/TODO.md](./docs/TODO.md) で管理する
- タスクを開始する前にTODO.mdのステータスを更新する
- タスク完了後もTODO.mdのステータスを更新する

## コマンド

```bash
pnpm install          # 依存インストール
pnpm run build        # ビルド（tsup）
pnpm run dev          # 開発モード（watch）
pnpm run test         # CLIアプリのテスト（vitest）
pnpm run lint         # ESLint
pnpm run lint:fix     # ESLint 自動修正
pnpm run format       # Prettier 整形
pnpm run format:check # Prettier 差分チェック
```

## コーディング規約

- 言語: TypeScript (ESM, import/export)
- パッケージマネージャー: pnpm
- フォーマット: Prettier
- リント: ESLint + @typescript-eslint + eslint-plugin-react + eslint-plugin-react-hooks
- テスト: vitest + ink-testing-library
- Inkコンポーネントは `.tsx` で作成
- ユーティリティは `.ts` で作成

## ディレクトリ構成

- `src/` - Ink CLIアプリのソースコード
- `src/components/` - Ink UIコンポーネント
- `src/utils/` - ロジック（進捗管理、テスト実行等）
- `src/__tests__/` - CLIアプリのテスト
- `practices/` - 学習コンテンツ（practice1〜10）
- `data/` - 実行時データ（progress.json, mistakes.md, wrong-answers.json）
- `docs/` - ドキュメント

## 注意事項

- practices/ 内のテストは学習者が書くものなので、CLIアプリのテストとは分離する
- vitest設定は2つ: `vitest.config.ts`（アプリ用）と `vitest.practice.config.ts`（演習用）
- レビュー機能はClaude Code限定。カスタムコマンドは `.claude/commands/test-review.md`
