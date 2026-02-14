# 画面コンポーネント: 選択問題

## メタ情報

- GitHub Issue: #5
- ブランチ: feature/5-quiz-components
- 作成日: 2026-02-14

## 概要

選択問題の出題（Quiz.tsx）、結果サマリー表示（QuizResult.tsx）、間違えた問題の復習（WrongAnswerReview.tsx）を実装する。

## 実装方針

### Quiz.tsx

- practiceNumber を受け取り、practices/practiceN/questions.json を読み込む
- 1問ずつ出題し、ink-select-input で選択肢を表示
- 回答後に正誤と解説を即表示、Enter で次の問題へ
- 間違えた問題は wrongAnswers.ts の addWrongAnswer で保存
- 全問回答後に onComplete で結果を返す

### QuizResult.tsx

- 正答数/全問数、正答率を表示
- 「演習に進む」と「メニューに戻る」の選択肢を表示

### WrongAnswerReview.tsx

- wrongAnswers.ts から全プラクティスの間違えた問題を取得
- 1問ずつ再出題し、正誤を判定
- 全問回答後に結果を表示

### app.tsx の更新

- Quiz, QuizResult, WrongAnswerReview 画面を組み込む
- useNavigation に goToQuizResult, goToExercise 遷移を追加

### types.ts の更新

- QuizResult 画面に score 情報を持たせる
- Question 型を追加

## 影響範囲

- 新規作成:
  - `src/components/Quiz.tsx`
  - `src/components/QuizResult.tsx`
  - `src/components/WrongAnswerReview.tsx`
  - `src/__tests__/components/Quiz.test.tsx`
  - `src/__tests__/components/QuizResult.test.tsx`
  - `src/__tests__/components/WrongAnswerReview.test.tsx`
- 変更:
  - `src/app.tsx` - 新画面の組み込み
  - `src/hooks/useNavigation.ts` - 遷移追加
  - `src/types.ts` - Question型、Screen型更新

## テスト設計

### 単体テスト

#### Quiz.test.tsx

| テストケース                               | 確認内容                                     |
| ------------------------------------------ | -------------------------------------------- |
| 問題文が表示される                         | questions データの question が表示されること |
| 選択肢が表示される                         | 4つの選択肢が表示されること                  |
| 正解を選ぶと「正解」が表示される           | 正解選択時のフィードバック                   |
| 不正解を選ぶと「不正解」と解説が表示される | 不正解時のフィードバック                     |
| 全問回答後に onComplete が呼ばれる         | 結果データ付きでコールバック実行             |

#### QuizResult.test.tsx

| テストケース               | 確認内容                   |
| -------------------------- | -------------------------- |
| 正答数と全問数が表示される | 「3/5 問正解」のような表示 |
| 「演習に進む」選択肢がある | 遷移選択肢の表示           |

#### WrongAnswerReview.test.tsx

| テストケース             | 確認内容                                   |
| ------------------------ | ------------------------------------------ |
| 間違えた問題が出題される | wrong-answers データの問題が表示されること |
| 復習結果が表示される     | 全問回答後の結果表示                       |

### 結合テスト

| テストケース                          | 確認内容             |
| ------------------------------------- | -------------------- |
| テキスト表示→選択問題→結果→演習の遷移 | 画面遷移の一連の流れ |

## 完了条件

- [x] Quiz コンポーネントが実装されている
- [x] QuizResult コンポーネントが実装されている
- [x] WrongAnswerReview コンポーネントが実装されている
- [x] app.tsx に新画面が組み込まれている
- [x] 単体テストが全て通過する
- [x] テストが全て通過する（pnpm test -- --run）
