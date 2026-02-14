# QAmind

ジュニアエンジニアが「品質思考」を身につけるためのテスト設計学習CLIアプリ。

AIがコードを書く時代に、エンジニアに求められる「何を守るべきか」「どうテストすべきか」を判断する力を育てる。

## 概要

- テスト設計の観点を段階的に学べる全10問のカリキュラム
- Inkによるインタラクティブな選択問題 + vitestによるテスト演習
- 日本語・IDE完結の学習体験
- Claude Codeによる応用フェーズのコードレビュー

## カリキュラム

### インプットフェーズ（Practice 1〜7）

| #   | テーマ                 | 学ぶこと                          |
| --- | ---------------------- | --------------------------------- |
| 1   | テストの基本構造       | AAAパターン（Arrange/Act/Assert） |
| 2   | 境界値分析             | 境界値の特定とテスト設計          |
| 3   | 同値分割               | 入力の分類とテストケース削減      |
| 4   | 異常系・例外テスト     | エラーケースの網羅                |
| 5   | 状態を持つもののテスト | 状態遷移のテスト設計              |
| 6   | モック・スタブの使い方 | 外部依存の分離                    |
| 7   | 結合テストの役割       | 単体テストとの使い分け            |

### 応用フェーズ（Practice 8〜10）

| #   | テーマ                         | 学ぶこと                         |
| --- | ------------------------------ | -------------------------------- |
| 8   | 要件からのテスト設計           | 要件を読み解きテストケースを導出 |
| 9   | 単体/結合の責務分担            | テストピラミッドに基づく設計     |
| 10  | AI生成コードに対するテスト設計 | AIが書いたコードの検証観点       |

## セットアップ

```bash
pnpm install
pnpm build
```

## 使い方

```bash
npx qamind
```

メインメニューから以下の操作ができます：

- **最初から始める** - Practice 1から学習開始
- **続きから始める** - 未完了のPracticeから再開
- **練習を選ぶ** - 任意のPracticeを選択
- **間違えた問題を復習** - 過去の間違いを再挑戦

各Practiceの流れ：

1. **TEXT.md を読む** - テーマの解説を読む
2. **選択問題に答える** - 理解度を確認する3問のクイズ
3. **演習に取り組む** - `target.test.ts` にテストを書く
4. **テストを実行** - CLIからテストの合否を確認
5. **レビューを依頼**（応用フェーズのみ）- Claude Codeにコードレビューしてもらう

## 技術スタック

- TypeScript (ESM)
- [Ink](https://github.com/vadimdemedes/ink) - CLIフレームワーク
- [vitest](https://vitest.dev/) - テストフレームワーク
- [marked](https://marked.js.org/) + marked-terminal - ターミナルでのMarkdown表示
- pnpm - パッケージマネージャー

## 開発

```bash
pnpm dev       # 開発モード（watch）
pnpm test      # CLIアプリのテスト
pnpm lint      # ESLint
pnpm format    # Prettier
pnpm typecheck # 型チェック
pnpm build     # ビルド
```

## ディレクトリ構成

```
src/
├── index.tsx          # エントリポイント
├── app.tsx            # ルートコンポーネント（画面遷移）
├── types.ts           # 共通型定義
├── constants.ts       # 定数
├── components/        # UIコンポーネント
├── hooks/             # カスタムフック
├── utils/             # ユーティリティ
└── __tests__/         # テスト

practices/
├── practice1/         # テストの基本構造
│   ├── TEXT.md        # 解説テキスト
│   ├── questions.json # 選択問題
│   ├── target.ts      # 演習対象コード
│   └── target.test.ts # 学習者が書くテスト
├── practice2/         # 境界値分析
│   └── ...
└── practice10/        # AI生成コードに対するテスト設計

data/                  # 実行時データ（gitignore対象）
├── progress.json      # 学習進捗
├── wrong-answers.json # 間違えた問題
└── mistakes.md        # レビュー指摘メモ

docs/
├── requirements.md    # 要件定義
├── design.md          # デザインドック
├── TODO.md            # タスク管理
└── steering/          # タスク設計書
```

## ライセンス

MIT
