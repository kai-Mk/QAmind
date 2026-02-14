# ユーティリティ実装

## メタ情報

- GitHub Issue: #3
- ブランチ: feature/3-utilities
- 作成日: 2026-02-14

## 概要

CLIアプリで使用する3つのユーティリティモジュールを実装する。

1. **進捗管理（progress.ts）** - `data/progress.json` の読み書きを担当。プラクティスの進捗状況（未着手/進行中/完了）を管理する。
2. **間違えた問題管理（wrongAnswers.ts）** - `data/wrong-answers.json` の読み書きを担当。選択問題で間違えた回答を記録・取得する。
3. **テスト実行（testRunner.ts）** - vitestをプログラムから実行し、特定プラクティスのテスト結果を取得する。演習画面の「テストをチェックする」機能で使用する。

いずれもUIコンポーネントから利用される純粋なロジック層であり、Ink/Reactに依存しない。

## 実装方針

### progress.ts

- `data/progress.json` をファイルシステム経由で読み書きする
- ファイルが存在しない場合は空オブジェクト `{}` として扱う
- プロジェクトルートからの相対パスで `data/progress.json` を参照する
- 提供する関数:
  - `loadProgress()` - progress.json全体を読み込んで返す
  - `getStatus(practiceNumber)` - 指定プラクティスのstatusを返す（未登録なら `not_started`）
  - `updateStatus(practiceNumber, status)` - statusを更新する（`completed` の場合は `completedAt` も記録）
  - `getFirstIncomplete()` - 最初の未完了プラクティス番号を返す（「途中から再開する」で使用）

### wrongAnswers.ts

- `data/wrong-answers.json` をファイルシステム経由で読み書きする
- ファイルが存在しない場合は空オブジェクト `{}` として扱う
- 提供する関数:
  - `loadWrongAnswers()` - wrong-answers.json全体を読み込んで返す
  - `getWrongAnswers(practiceNumber)` - 指定プラクティスの間違えた問題一覧を返す
  - `addWrongAnswer(practiceNumber, entry)` - 間違えた問題を追加する
  - `hasWrongAnswers()` - 間違えた問題が1件以上あるかを返す（メニューの復習ボタンの表示制御で使用）

### testRunner.ts

- vitestをchild_processの `execFile` で実行する
- `vitest run --config vitest.practice.config.ts --reporter=verbose practices/practiceN/` のように特定プラクティスのテストのみ実行する
- 提供する関数:
  - `runPracticeTest(practiceNumber)` - テストを実行し、結果を返す
- 戻り値の型: `{ success: boolean; output: string }` - 成功/失敗フラグとvitestの出力テキスト

### 型定義

`src/types.ts` に以下の型を追加する:

```ts
export type PracticeStatus = 'not_started' | 'in_progress' | 'completed'

export type PracticeProgress = {
  status: PracticeStatus
  reviewCount?: number
  completedAt?: string
}

export type ProgressData = Record<string, PracticeProgress>

export type WrongAnswer = {
  questionIndex: number
  question: string
  selectedAnswer: string
  correctAnswer: string
  answeredAt: string
}

export type WrongAnswersData = Record<string, WrongAnswer[]>

export type TestResult = {
  success: boolean
  output: string
}
```

### 共通方針

- ファイルパスはプロジェクトルートの `data/` ディレクトリを基準にする（`process.cwd()` ベース）
- ファイルI/Oは `node:fs/promises` を使用する
- child_processは `node:child_process` の `execFile` を使用する
- JSONの読み書きで不正なJSONやI/Oエラーが発生した場合はエラーをthrowする（呼び出し側で処理）
- ファイルが存在しない場合のみフォールバック（空オブジェクト）で対応する
- `data/` ディレクトリが存在しない場合は自動作成する（`mkdir -p` 相当）

## 影響範囲

- **新規作成:**
  - `src/utils/progress.ts`
  - `src/utils/wrongAnswers.ts`
  - `src/utils/testRunner.ts`
  - `src/__tests__/utils/progress.test.ts`
  - `src/__tests__/utils/wrongAnswers.test.ts`
  - `src/__tests__/utils/testRunner.test.ts`
- **変更:**
  - `src/types.ts` - 型追加（PracticeStatus, PracticeProgress, ProgressData, WrongAnswer, WrongAnswersData, TestResult）

## テスト設計

### 単体テスト

#### progress.test.ts

| テストケース                                   | 確認内容                                |
| ---------------------------------------------- | --------------------------------------- |
| loadProgress: ファイルが存在する場合           | JSONを正しくパースして返す              |
| loadProgress: ファイルが存在しない場合         | 空オブジェクトを返す                    |
| getStatus: 登録済みプラクティス                | 保存されたstatusを返す                  |
| getStatus: 未登録プラクティス                  | `not_started` を返す                    |
| updateStatus: in_progressに更新                | statusのみ更新される（completedAtなし） |
| updateStatus: completedに更新                  | statusとcompletedAtが記録される         |
| updateStatus: ファイルが存在しない状態から更新 | ファイルが新規作成される                |
| getFirstIncomplete: 全て未着手                 | 1を返す                                 |
| getFirstIncomplete: 途中まで完了               | 最初の未完了番号を返す                  |
| getFirstIncomplete: 全て完了                   | undefinedを返す（または最後の次の番号） |

#### wrongAnswers.test.ts

| テストケース                               | 確認内容                     |
| ------------------------------------------ | ---------------------------- |
| loadWrongAnswers: ファイルが存在する場合   | JSONを正しくパースして返す   |
| loadWrongAnswers: ファイルが存在しない場合 | 空オブジェクトを返す         |
| getWrongAnswers: 記録がある場合            | 該当プラクティスの配列を返す |
| getWrongAnswers: 記録がない場合            | 空配列を返す                 |
| addWrongAnswer: 新規プラクティスへの追加   | 新しいキーで配列が作成される |
| addWrongAnswer: 既存プラクティスへの追加   | 既存配列に追記される         |
| hasWrongAnswers: 記録がある場合            | trueを返す                   |
| hasWrongAnswers: 記録がない場合            | falseを返す                  |

#### testRunner.test.ts

| テストケース                                | 確認内容                                                      |
| ------------------------------------------- | ------------------------------------------------------------- |
| runPracticeTest: テスト成功時               | `{ success: true, output: ... }` を返す                       |
| runPracticeTest: テスト失敗時               | `{ success: false, output: ... }` を返す                      |
| runPracticeTest: 正しいコマンドが実行される | vitest run --config ... practices/practiceN/ の形式で呼ばれる |

### 結合テスト

このissueでは結合テストは不要。各ユーティリティは独立したモジュールであり、UIコンポーネントとの結合は後続のissue（Phase 4）でテストする。

### テスト方針

- progress.ts / wrongAnswers.ts: 一時ディレクトリ（`mkdtemp`）を使用してファイルI/Oを実際にテストする。各テストで一時ディレクトリを作成・削除して分離する。ファイルパスをDI可能にするため、内部でデータディレクトリパスを受け取れる設計にする。
- testRunner.ts: `child_process.execFile` をvi.mockでモックし、実際のvitest実行はしない。コマンド引数の正しさと戻り値の変換ロジックをテストする。

## 完了条件

- [ ] `src/types.ts` に必要な型が追加されている
- [ ] `src/utils/progress.ts` が実装され、progress.jsonの読み書きができる
- [ ] `src/utils/wrongAnswers.ts` が実装され、wrong-answers.jsonの読み書きができる
- [ ] `src/utils/testRunner.ts` が実装され、vitestをプログラムから実行できる
- [ ] 全てのテストケースが実装され、パスする
- [ ] 型チェックが通る
