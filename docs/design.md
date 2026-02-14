# QAmind デザインドック

## 技術スタック

| カテゴリ | 技術 | 用途 |
|---------|------|------|
| 言語 | TypeScript (ESM) | アプリ全体 |
| CLIフレームワーク | Ink | ターミナルUI（メニュー、選択問題、結果表示） |
| テストフレームワーク | vitest | 学習演習 + CLIアプリ自体のテスト |
| ビルドツール | tsup | TSX → JS の変換 |
| パッケージマネージャー | pnpm | 依存管理 |
| Markdown表示 | marked + marked-terminal | CLI上でTEXT.mdを装飾付き表示 |
| 選択UI | ink-select-input | メニュー・選択問題のUI |
| CLIテスト | ink-testing-library | Inkコンポーネントのテスト |
| Lint | ESLint + @typescript-eslint + eslint-plugin-react + eslint-plugin-react-hooks | コード品質チェック |
| Format | Prettier | コード整形 |
| Git hooks | husky + lint-staged | コミット時にlint/format実行 |
| CI | GitHub Actions | lint / format / test の自動実行 |

---

## プロジェクト構成

```
QAmind/
├── src/                        ← Ink CLIアプリ
│   ├── index.tsx               ← エントリポイント（bin用）
│   ├── app.tsx                 ← ルートコンポーネント
│   ├── components/             ← UIコンポーネント
│   │   ├── Menu.tsx            ← メインメニュー
│   │   ├── PracticeSelect.tsx  ← プラクティス選択画面
│   │   ├── TextViewer.tsx      ← TEXT.md表示
│   │   ├── Quiz.tsx            ← 選択問題
│   │   ├── QuizResult.tsx      ← 選択問題の結果サマリー
│   │   ├── Exercise.tsx        ← 演習画面（テストチェック等）
│   │   └── WrongAnswerReview.tsx ← 間違えた問題の復習
│   └── utils/                  ← ロジック
│       ├── progress.ts         ← progress.json の読み書き
│       ├── wrongAnswers.ts     ← 間違えた問題の管理
│       └── testRunner.ts       ← vitest実行
├── src/__tests__/              ← CLIアプリのテスト
│   ├── components/
│   └── utils/
├── practices/                  ← 学習コンテンツ
│   ├── practice1/
│   │   ├── TEXT.md
│   │   ├── questions.json
│   │   ├── target.ts
│   │   └── target.test.ts
│   ├── practice2/
│   │   └── ...
│   └── ...（practice10まで）
├── data/                       ← 実行時データ
│   ├── progress.json
│   ├── mistakes.md
│   └── wrong-answers.json
├── .claude/
│   └── commands/
│       └── test-review.md      ← レビュー用カスタムコマンド
├── .github/
│   └── workflows/
│       └── PR-check.yml              ← GitHub Actions（lint / format / test）
├── .husky/
│   └── pre-commit              ← コミット時にlint-staged実行
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .eslintrc.cjs
├── .prettierrc
└── docs/
    ├── idea/
    │   └── initial-requirement.md
    ├── requirements.md
    └── design.md
```

---

## 画面遷移

```
[メインメニュー]
├── 最初から学習する → [TEXT.md表示] → [選択問題] → [結果サマリー] → [演習画面]
├── 途中から再開する → [TEXT.md表示] → ...（同上）
├── プラクティスを選択する → [プラクティス一覧] → [TEXT.md表示] → ...（同上）
└── 間違えた問題を復習する → [間違えた問題一覧] → [選択問題（復習モード）]
```

### 各画面の役割

#### メインメニュー（Menu.tsx）

```
QAmind へようこそ！

> 最初から学習する
  途中から再開する
  プラクティスを選択する
  間違えた問題を復習する
```

- 「最初から学習する」: practice1から開始
- 「途中から再開する」: progress.jsonから最初の未完了プラクティスを特定して開始
- 「プラクティスを選択する」: 一覧から選択、または番号を直接入力して指定
- 「間違えた問題を復習する」: wrong-answers.jsonから出題

#### TEXT.md表示（TextViewer.tsx）

- marked + marked-terminal でMarkdownを装飾付きで表示
- スクロール可能
- 読了後「問題に進む」で次へ

#### 選択問題（Quiz.tsx）

- questions.jsonから問題を読み込み、1問ずつ出題
- 回答後に正誤を即表示
- 間違えた問題はwrong-answers.jsonに保存
- 全問回答後に結果サマリーを表示

#### 演習画面（Exercise.tsx）

```
Practice 1: テストの基本構造（AAAパターン）
演習中 - target.test.ts を編集してください

> テストをチェックする
  レビューを依頼する       ← 応用フェーズ（#8〜#10）のみ表示
  メニューに戻る
```

- 「テストをチェックする」: vitestを実行し結果を表示。全通過で完了
- 「レビューを依頼する」: Claude Codeのカスタムコマンドを呼び出す（応用フェーズのみ）
- 完了時にprogress.jsonを更新

---

## データ設計

### progress.json

```json
{
  "practice1": {
    "status": "completed",
    "completedAt": "2026-02-14T12:30:00Z"
  },
  "practice8": {
    "status": "completed",
    "reviewCount": 2,
    "completedAt": "2026-02-15T10:00:00Z"
  }
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| status | string | `not_started` / `in_progress` / `completed` |
| reviewCount | number | レビュー回数（応用フェーズのみ、最大3） |
| completedAt | string | 完了日時（ISO 8601、完了時のみ） |

### wrong-answers.json

```json
{
  "practice1": [
    {
      "questionIndex": 2,
      "question": "AAAパターンのArrangeに該当するのはどれ？",
      "selectedAnswer": "expect(result).toBe(3)",
      "correctAnswer": "const result = sum(1, 2)",
      "answeredAt": "2026-02-14T10:15:00Z"
    }
  ]
}
```

### mistakes.md

レビュー指摘内容をMarkdown形式で蓄積（応用フェーズのみ）。

```markdown
## Practice 8: 要件からのテスト設計

### レビュー1回目
- 指摘: 境界値のテストが漏れていた
- コード例:
  ```ts
  // 漏れていたケース
  it('0件の場合', () => { ... })
  ```
```

### questions.json

```json
{
  "questions": [
    {
      "question": "AAAパターンの「Arrange」に該当するのはどれですか？",
      "options": [
        "テスト対象の関数を実行する",
        "テストに必要なデータや状態を準備する",
        "実行結果が期待通りか検証する",
        "テスト後にデータをクリーンアップする"
      ],
      "answer": 1,
      "explanation": "Arrangeはテストの前準備です。テストに必要な変数の宣言やオブジェクトの生成を行います。"
    }
  ]
}
```

| フィールド | 型 | 説明 |
|-----------|-----|------|
| question | string | 問題文 |
| options | string[] | 選択肢（4択） |
| answer | number | 正解のインデックス（0始まり） |
| explanation | string | 解説（正誤問わず回答後に表示） |

---

## CLIアプリのビルドと実行

### package.json（抜粋）

```json
{
  "name": "qamind",
  "type": "module",
  "bin": {
    "qamind": "./dist/index.js"
  },
  "scripts": {
    "build": "tsup src/index.tsx --format esm",
    "dev": "tsup src/index.tsx --format esm --watch",
    "test": "vitest",
    "test:practice": "vitest run --config vitest.practice.config.ts"
  }
}
```

### vitest設定の分離

CLIアプリのテストと学習演習のテストを分離する。

- `vitest.config.ts` - CLIアプリ自体のテスト（`src/__tests__/`）
- `vitest.practice.config.ts` - 学習演習のテスト（`practices/`）

演習画面の「テストをチェックする」はpractice用の設定で特定のプラクティスのテストのみ実行する。

---

## テスト方針

### CLIアプリのテスト

| 対象 | テスト内容 | ツール |
|------|-----------|--------|
| UIコンポーネント | 画面の表示内容、選択操作の動作 | ink-testing-library + vitest |
| utils（progress.ts等） | JSON読み書き、状態管理ロジック | vitest |
| testRunner | vitest実行と結果パースの動作 | vitest |

※ 詳細なテスト設計書は実装時に作成する。

### 学習演習のテスト

- 学習者が `target.test.ts` に書いたテストをvitestで実行する
- CLIの「テストをチェックする」から実行される

---

## CI / Git hooks

### husky + lint-staged（ローカル）

コミット時に変更ファイルに対してlintとformatを自動実行する。

```json
// package.json（抜粋）
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### GitHub Actions（CI）

プルリクエストに対して以下を実行する。

```yaml
# .github/workflows/PR-check.yml
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run typecheck
      - run: pnpm run build
      - run: pnpm run test -- --run
```

| ジョブ | 内容 |
|--------|------|
| lint | ESLintによるコード品質チェック |
| typecheck | tscによる型チェック（`tsc --noEmit`） |
| build | tsupによるビルド成功確認 |
| test | CLIアプリのテスト実行 |

---

## レビュー機能（Claude Code限定）

### カスタムコマンド: `.claude/commands/test-review.md`

応用フェーズ（practice8〜10）でのみ使用する。
CLIの「レビューを依頼する」選択時にClaude Codeのカスタムコマンドを呼び出す。

レビュー観点（プロンプトに含める）:
- テスト観点の網羅性（正常系・異常系・境界値）
- 単体テストと結合テストの役割分担の適切さ
- テストの可読性・保守性
- 要件に対する漏れの有無

レビューOKの場合:
- progress.jsonのstatusをcompletedに更新
- completedAtを記録

レビューNGの場合:
- reviewCountをインクリメント
- 指摘内容をmistakes.mdに追記
- 3回目のレビュー後は結果に関わらず完了とする
