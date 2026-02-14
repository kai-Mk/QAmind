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
pnpm run build
```

## 使い方

```bash
npx qamind
```

## 開発

```bash
pnpm run dev       # 開発モード（watch）
pnpm run test      # CLIアプリのテスト
pnpm run lint      # ESLint
pnpm run format    # Prettier
```

## ドキュメント

- [要件定義](./docs/requirements.md)
- [デザインドック](./docs/design.md)
- [TODO](./docs/TODO.md)
