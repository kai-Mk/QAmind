# CLIアプリ基盤

## メタ情報

- GitHub Issue: #2
- ブランチ: feature/2-cli-app-foundation
- 作成日: 2026-02-14

## 概要

InkベースのCLIアプリの基盤を構築する。エントリポイント（index.tsx）、画面遷移を管理するルートコンポーネント（app.tsx）、メインメニュー（Menu.tsx）を実装する。

issue #1 で作成されたスタブ（index.tsx, app.tsx）を拡張し、画面遷移の仕組みとメインメニューUIを実現する。後続issueで追加される各画面コンポーネントは、このルーティング基盤の上に接続される。

## 実装方針

### 画面遷移（Screen型 + useState）

`app.tsx` に `Screen` 型を定義し、`useState<Screen>` で現在の画面を管理する。各画面コンポーネントにナビゲーション用のコールバックを渡す。

```typescript
export type Screen =
  | { type: 'menu' }
  | { type: 'text-viewer'; practiceNumber: number }
  | { type: 'quiz'; practiceNumber: number }
  | { type: 'quiz-result'; practiceNumber: number }
  | { type: 'exercise'; practiceNumber: number }
  | { type: 'practice-select' }
  | { type: 'wrong-answer-review' }
```

- 初期画面は `{ type: 'menu' }`
- 未実装の画面はプレースホルダー（画面名を表示 + 「メニューに戻る」）を表示
- 画面切り替えは `setScreen()` で行う

### メインメニュー（Menu.tsx）

`ink-select-input` を使用して4つのメニュー項目を表示する。

```
QAmind へようこそ！

> 最初から学習する
  途中から再開する
  プラクティスを選択する
  間違えた問題を復習する
```

メニュー選択値は `MenuAction` 型で定義する。

```typescript
export type MenuAction = 'start' | 'resume' | 'select' | 'review'
```

### メニュー選択時のナビゲーション

| メニュー項目           | MenuAction | 遷移先Screen                                 | 備考                                         |
| ---------------------- | ---------- | -------------------------------------------- | -------------------------------------------- |
| 最初から学習する       | start      | `{ type: 'text-viewer', practiceNumber: 1 }` | practice1から開始                            |
| 途中から再開する       | resume     | `{ type: 'text-viewer', practiceNumber: 1 }` | 本来はprogress.jsonから特定。今回は仮で1固定 |
| プラクティスを選択する | select     | `{ type: 'practice-select' }`                | PracticeSelect.tsx は後続issueで実装         |
| 間違えた問題を復習する | review     | `{ type: 'wrong-answer-review' }`            | WrongAnswerReview.tsx は後続issueで実装      |

### エントリポイント（index.tsx）

現在のスタブで機能的には十分。変更なし。

## 影響範囲

| ファイル                                 | 変更種別 | 内容                           |
| ---------------------------------------- | -------- | ------------------------------ |
| `src/app.tsx`                            | 変更     | Screen型定義、画面遷移ロジック |
| `src/components/Menu.tsx`                | 新規     | メインメニューコンポーネント   |
| `src/__tests__/components/Menu.test.tsx` | 新規     | Menu の単体テスト              |
| `src/__tests__/app.test.tsx`             | 新規     | App の単体テスト・結合テスト   |

## テスト設計

### 単体テスト

#### Menu.tsx（`src/__tests__/components/Menu.test.tsx`）

| テストケース                                         | 確認内容                                                                                                     |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| タイトルが表示される                                 | 「QAmind へようこそ！」というテキストがレンダリングに含まれる                                                |
| 4つのメニュー項目が全て表示される                    | 「最初から学習する」「途中から再開する」「プラクティスを選択する」「間違えた問題を復習する」が全て表示される |
| メニュー項目を選択するとonSelectが正しい値で呼ばれる | 各項目の選択時に対応するMenuAction値（start/resume/select/review）がコールバックに渡される                   |

#### App（`src/__tests__/app.test.tsx`）

| テストケース                                     | 確認内容                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| 初期表示でメインメニューが表示される             | App をレンダリングすると「QAmind へようこそ！」が表示される      |
| 未実装画面のプレースホルダーに画面名が表示される | 未実装画面に遷移した際にその画面の識別テキストが表示される       |
| プレースホルダーからメニューに戻れる             | 未実装画面で「メニューに戻る」操作後にメインメニューが表示される |

### 結合テスト

#### App + Menu（`src/__tests__/app.test.tsx` 内）

| テストケース                                             | 確認内容                                                              |
| -------------------------------------------------------- | --------------------------------------------------------------------- |
| メニューで「最初から学習する」を選択すると画面が遷移する | App上でメニュー項目を選択し、プレースホルダー画面に遷移することを確認 |
| 遷移先からメニューに戻れる                               | プレースホルダーで「メニューに戻る」後にメインメニューが再表示される  |

## 完了条件

- [ ] `src/app.tsx` に Screen 型と画面遷移ロジックが実装されている
- [ ] `src/components/Menu.tsx` が ink-select-input を使って4つのメニュー項目を表示する
- [ ] メニュー項目の選択で画面状態が切り替わる
- [ ] 未実装画面にはプレースホルダー（画面名 + メニューに戻る）が表示される
- [ ] 単体テスト・結合テストが全て通過する
- [ ] 型チェック（`pnpm typecheck`）が通る
- [ ] ビルド（`pnpm build`）が成功する
