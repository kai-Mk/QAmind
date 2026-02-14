# 画面コンポーネント: 演習画面

## メタ情報

- GitHub Issue: #6
- ブランチ: feature/6-exercise-component
- 作成日: 2026-02-14

## 概要

演習画面（Exercise.tsx）を実装する。学習者がテストコードを書いた後、vitestの実行とレビュー依頼を行う画面。

## 実装方針

### Exercise.tsx

- practiceNumber を受け取り、プラクティスのタイトルと演習案内を表示
- ink-select-input で以下の操作を提供:
  - 「テストをチェックする」: testRunner.ts の runPracticeTest を実行し結果を表示
  - 「レビューを依頼する」: 応用フェーズ（practice 8〜10）のみ表示。CLI上で案内メッセージを表示
  - 「メニューに戻る」
- テスト全通過時に progress.ts の updateStatus で completed に更新
- テスト結果（success/fail + output）を画面に表示

### app.tsx の更新

- Exercise 画面を組み込む（現在のプレースホルダーを置き換え）

## 影響範囲

- 新規作成:
  - `src/components/Exercise.tsx`
  - `src/__tests__/components/Exercise.test.tsx`
- 変更:
  - `src/app.tsx` - Exercise 画面の組み込み

## テスト設計

### 単体テスト

#### Exercise.test.tsx

| テストケース                                       | 確認内容                                |
| -------------------------------------------------- | --------------------------------------- |
| プラクティスタイトルが表示される                   | practiceNumber に対応するタイトルが表示 |
| 「テストをチェックする」選択肢がある               | メニュー項目の表示                      |
| 「メニューに戻る」選択肢がある                     | メニュー項目の表示                      |
| インプットフェーズではレビュー選択肢が表示されない | practice 1〜7 では非表示                |
| 応用フェーズではレビュー選択肢が表示される         | practice 8〜10 では表示                 |
| テスト実行で結果が表示される                       | runPracticeTest の結果表示              |

## 完了条件

- [x] Exercise コンポーネントが実装されている
- [x] app.tsx に Exercise 画面が組み込まれている
- [x] テストが全て通過する（pnpm test -- --run）
