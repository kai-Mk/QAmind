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
- 1 issue = 1 ステアリングファイル = 1 PR

## コマンド

```bash
pnpm install          # 依存インストール
pnpm build            # ビルド（tsup）
pnpm dev              # 開発モード（watch）
pnpm test             # CLIアプリのテスト（vitest）
pnpm typecheck        # 型チェック（tsc --noEmit）
pnpm lint             # ESLint
pnpm lint:fix         # ESLint 自動修正
pnpm format           # Prettier 整形
pnpm format:check     # Prettier 差分チェック
```

## カスタムコマンド

- `/task-design #N` - GitHub issueからブランチ作成 → ステアリングファイル作成 → Draft PR作成
- `/task-run <path>` - ステアリングファイルに基づきテスト → 実装
- `/task-check` - テスト実行・完了条件照合 → TODO.md更新
- `/text-create N` - 学習コンテンツTEXT.mdの下書き作成
- `/test-review N` - 応用フェーズの学習者コード添削（Practice 8〜10のみ）

## コーディング規約

- 言語: TypeScript (ESM, import/export)
- パッケージマネージャー: pnpm
- フォーマット: Prettier
- リント: ESLint + @typescript-eslint + eslint-plugin-react + eslint-plugin-react-hooks
- テスト: vitest + ink-testing-library
- Inkコンポーネントは `.tsx` で作成
- ユーティリティは `.ts` で作成
- コンポーネント・関数は `export const` で名前付きエクスポート（default export 禁止）
- コンポーネントはアロー関数で定義（`export const App = () => { ... }`）
- 型のimportは `import type` を使用

## ディレクトリ構成

- `src/` - Ink CLIアプリのソースコード
- `src/components/` - Ink UIコンポーネント
- `src/utils/` - ロジック（進捗管理、テスト実行等）
- `src/__tests__/` - CLIアプリのテスト
- `practices/` - 学習コンテンツ（practice1〜10）
- `data/` - 実行時データ（progress.json, mistakes.md, wrong-answers.json）
- `docs/` - ドキュメント
- `docs/steering/` - タスク設計書（issueごとに作成）

## 注意事項

- practices/ 内のテストは学習者が書くものなので、CLIアプリのテストとは分離する
- vitest設定は2つ: `vitest.config.ts`（アプリ用）と `vitest.practice.config.ts`（演習用）
- レビュー機能はClaude Code限定。カスタムコマンドは `.claude/commands/test-review.md`
- テスト実行やビルド確認など出力が多い処理は、Taskツールでサブエージェントに委譲する
