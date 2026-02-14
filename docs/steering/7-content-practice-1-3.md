# 学習コンテンツ: Practice 1〜3

## メタ情報

- GitHub Issue: #7
- ブランチ: feature/7-content-practice-1-3
- 作成日: 2026-02-14

## 概要

インプットフェーズの最初の3問を作成する。各プラクティスに TEXT.md、questions.json、target.ts、target.test.ts を用意する。

- Practice 1: テストの基本構造（AAAパターン）
- Practice 2: 境界値分析
- Practice 3: 同値分割

## 実装方針

### 各プラクティスのファイル構成

```
practices/practiceN/
├── TEXT.md          ← 学習テキスト
├── questions.json   ← 選択問題（3〜5問）
├── target.ts        ← テスト対象コード
└── target.test.ts   ← 学習者が書くテストファイル（雛形）
```

### Practice 1: テストの基本構造（AAAパターン）

- 題材: `sum(a, b)` などの基本関数
- vitest構文: `describe` / `it` / `expect` / `toBe` / `toEqual`
- TEXT.md: AAAパターンの解説、vitest基本構文、コード例

### Practice 2: 境界値分析

- 題材: 年齢判定、配列の範囲チェック
- vitest構文: `each` / `toBeLessThan` 等
- TEXT.md: 境界値分析の考え方、テスト設計の観点

### Practice 3: 同値分割

- 題材: 成績ランク分類
- vitest構文: `toContain` / `toMatch` 等
- TEXT.md: 同値分割の考え方、テストケースの効率化

## 影響範囲

- 新規作成:
  - `practices/practice1/TEXT.md`
  - `practices/practice1/questions.json`
  - `practices/practice1/target.ts`
  - `practices/practice1/target.test.ts`
  - `practices/practice2/TEXT.md`
  - `practices/practice2/questions.json`
  - `practices/practice2/target.ts`
  - `practices/practice2/target.test.ts`
  - `practices/practice3/TEXT.md`
  - `practices/practice3/questions.json`
  - `practices/practice3/target.ts`
  - `practices/practice3/target.test.ts`

## テスト設計

### 動作確認

| テストケース                        | 確認内容                     |
| ----------------------------------- | ---------------------------- |
| questions.json が有効なJSONである   | パース可能であること         |
| target.ts がimportできる            | シンタックスエラーがないこと |
| target.test.ts が雛形として存在する | ファイルが存在すること       |

## 完了条件

- [x] Practice 1 の全ファイルが作成されている
- [x] Practice 2 の全ファイルが作成されている
- [x] Practice 3 の全ファイルが作成されている
- [x] questions.json が有効なJSONである
- [x] target.ts が正しいTypeScriptである
- [x] テストが全て通過する（pnpm test -- --run）
