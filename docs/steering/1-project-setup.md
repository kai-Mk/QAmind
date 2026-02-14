# プロジェクトセットアップ

## メタ情報

- GitHub Issue: #1
- ブランチ: feature/1-project-setup
- 作成日: 2026-02-14

## 概要

QAmindプロジェクトの初期セットアップを行う。package.jsonの作成、TypeScript・vitest・tsup・ESLint・Prettier・husky + lint-staged・GitHub Actionsの設定、および依存パッケージのインストールを完了させ、開発を開始できる状態にする。

このタスク完了後、`pnpm build`・`pnpm test`・`pnpm lint`・`pnpm typecheck`・`pnpm format:check` が正常に実行でき、コミット時にlint-stagedが動作し、PRに対してCIが走る状態にする。

## 実装方針

### package.json

- `pnpm init` で初期化後、以下を設定する
  - `name`: `qamind`
  - `type`: `module`（ESM）
  - `bin`: `{ "qamind": "./dist/index.js" }`
  - `scripts`: design.mdのCLIアプリのビルドと実行セクションに準拠
    - `build`: `tsup src/index.tsx --format esm`
    - `dev`: `tsup src/index.tsx --format esm --watch`
    - `test`: `vitest`
    - `test:practice`: `vitest run --config vitest.practice.config.ts`
    - `typecheck`: `tsc --noEmit`
    - `lint`: `eslint .`
    - `lint:fix`: `eslint . --fix`
    - `format`: `prettier --write .`
    - `format:check`: `prettier --check .`
  - `lint-staged`: design.mdのhusky + lint-stagedセクションに準拠

### TypeScript設定（tsconfig.json）

- `target`: `ES2022`
- `module`: `ESNext`
- `moduleResolution`: `bundler`
- `jsx`: `react-jsx`（Ink用）
- `jsxImportSource`: `react`
- `strict`: `true`
- `outDir`: `./dist`
- `rootDir`: `./src`
- `include`: `["src"]`
- `esModuleInterop`: `true`
- `skipLibCheck`: `true`

### vitest設定

2つの設定ファイルを作成する（design.mdのvitest設定の分離セクションに準拠）。

- `vitest.config.ts` - CLIアプリのテスト用
  - `include`: `["src/__tests__/**/*.test.{ts,tsx}"]`
  - `environment`: `node`
- `vitest.practice.config.ts` - 学習演習のテスト用
  - `include`: `["practices/**/*.test.ts"]`
  - `environment`: `node`

### tsup設定

- package.jsonのscriptsで直接指定するため、設定ファイルは不要
- build/devコマンドで `--format esm` を指定

### ESLint設定（.eslintrc.cjs）

- parser: `@typescript-eslint/parser`
- plugins: `@typescript-eslint`, `react`, `react-hooks`
- extends: `eslint:recommended`, `@typescript-eslint/recommended`, `plugin:react/recommended`, `plugin:react-hooks/recommended`
- settings: `react.version` を指定
- `react/react-in-jsx-scope` をoff（React 17+ JSX Transform）

### Prettier設定（.prettierrc）

- `semi`: `false`
- `singleQuote`: `true`
- `tabWidth`: `2`
- `trailingComma`: `all`
- `.prettierignore` で `dist/`、`node_modules/` を除外

### husky + lint-staged

- `husky install` でGit hooksを初期化
- `.husky/pre-commit` でlint-stagedを実行
- lint-stagedの設定はdesign.mdに準拠（package.json内に記述）

### GitHub Actions（.github/workflows/PR-check.yml）

- design.mdのGitHub Actionsセクションに記載のyamlをそのまま使用
- pnpmバージョンの指定を追加

### エントリポイントのスタブ

- ビルド確認のため `src/index.tsx` に最小限のスタブを作成する
- `#!/usr/bin/env node` + Ink のrender呼び出しのみ

## 影響範囲

### 新規作成ファイル

- `package.json`
- `tsconfig.json`
- `vitest.config.ts`
- `vitest.practice.config.ts`
- `.eslintrc.cjs`
- `.prettierrc`
- `.prettierignore`
- `.husky/pre-commit`
- `.github/workflows/PR-check.yml`
- `src/index.tsx`（スタブ）
- `src/app.tsx`（スタブ）

### 既存ファイルの変更

- なし

## テスト設計

このタスクは設定ファイルの作成が主であるため、コマンドの実行確認を中心にテストする。

### 単体テスト

| テストケース | 確認内容 |
|------------|---------|
| vitest実行 | `pnpm test -- --run` がエラーなく完了する |
| practice用vitest実行 | `pnpm test:practice -- --run` がエラーなく完了する（テストファイル0件でもエラーにならない） |

### 結合テスト

| テストケース | 確認内容 |
|------------|---------|
| ビルド | `pnpm build` が成功し `dist/index.js` が生成される |
| 型チェック | `pnpm typecheck` がエラーなく通過する |
| lint | `pnpm lint` がエラーなく通過する |
| format | `pnpm format:check` がエラーなく通過する |
| lint-staged | コミット時にlint-stagedが実行される |

## 完了条件

- [ ] `pnpm install` が成功する
- [ ] `pnpm build` が成功し `dist/index.js` が生成される
- [ ] `pnpm test -- --run` がエラーなく完了する
- [ ] `pnpm typecheck` がエラーなく通過する
- [ ] `pnpm lint` がエラーなく通過する
- [ ] `pnpm format:check` がエラーなく通過する
- [ ] `.husky/pre-commit` が存在し、lint-stagedが設定されている
- [ ] `.github/workflows/PR-check.yml` が存在する
- [ ] `src/index.tsx` のスタブが存在し、ビルドに成功する
