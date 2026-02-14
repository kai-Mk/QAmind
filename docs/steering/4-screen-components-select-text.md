# 画面コンポーネント: 選択・テキスト表示

## メタ情報

- GitHub Issue: #4
- ブランチ: feature/4-screen-components-select-text
- 作成日: 2026-02-14

## 概要

プラクティス選択画面（PracticeSelect.tsx）とTEXT.md表示画面（TextViewer.tsx）を実装する。
メインメニューの「プラクティスを選択する」から遷移するプラクティス一覧と、学習テキストを表示する画面。

## 実装方針

### PracticeSelect.tsx

- ink-select-input を使用してプラクティス一覧を表示
- Practice 1〜10 の一覧を表示し、選択するとそのプラクティスの TEXT.md 表示へ遷移
- progress.json のステータスに応じてラベルに状態を表示（✓ 完了 / ◆ 進行中 / 未マーク）
- 「メニューに戻る」選択肢を末尾に追加

### TextViewer.tsx

- marked + marked-terminal で Markdown をターミナル用に装飾表示
- practices/practiceN/TEXT.md を読み込んで表示
- 全文を一括表示し、末尾に「問題に進む」の案内を表示
- Enter キーで選択問題（Quiz）画面へ遷移

### app.tsx の更新

- PracticeSelect, TextViewer を画面遷移に組み込む
- useNavigation フックを更新して practiceNumber を管理
- Screen 型に practiceNumber を持たせる（text-viewer, quiz, exercise 等で必要）

### useNavigation.ts の更新

- practiceNumber の状態管理を追加
- 「途中から再開する」で progress.ts の getFirstIncomplete() を使用
- 各画面遷移で practiceNumber を引き回す

## 影響範囲

- 新規作成:
  - `src/components/PracticeSelect.tsx`
  - `src/components/TextViewer.tsx`
  - `src/__tests__/components/PracticeSelect.test.tsx`
  - `src/__tests__/components/TextViewer.test.tsx`
- 変更:
  - `src/app.tsx` - 新画面の組み込み
  - `src/hooks/useNavigation.ts` - practiceNumber管理、遷移ロジック
  - `src/types.ts` - Screen型にpracticeNumber追加
  - `src/constants.ts` - プラクティス一覧データ追加（必要に応じて）

## テスト設計

### 単体テスト

#### PracticeSelect.test.tsx

| テストケース                           | 確認内容                                                   |
| -------------------------------------- | ---------------------------------------------------------- |
| プラクティス一覧が表示される           | Practice 1〜10 のタイトルが表示されること                  |
| プラクティス選択で onSelect が呼ばれる | 選択時に practiceNumber 付きでコールバックが実行されること |
| メニューに戻る選択肢がある             | 「メニューに戻る」が一覧に含まれること                     |

#### TextViewer.test.tsx

| テストケース                      | 確認内容                               |
| --------------------------------- | -------------------------------------- |
| Markdown テキストが表示される     | 渡されたテキスト内容が表示されること   |
| 「問題に進む」案内が表示される    | 画面下部に遷移の案内が表示されること   |
| Enter キーで onProceed が呼ばれる | キー入力でコールバックが実行されること |

### 結合テスト

#### app.test.tsx への追加

| テストケース                                         | 確認内容                                              |
| ---------------------------------------------------- | ----------------------------------------------------- |
| メニュー→プラクティス選択→テキスト表示の遷移         | 画面遷移が正しく動作すること                          |
| 「途中から再開する」で適切なプラクティスが開始される | getFirstIncomplete と連携して正しい画面に遷移すること |

## 完了条件

- [x] PracticeSelect コンポーネントが実装されている
- [x] TextViewer コンポーネントが実装されている
- [x] app.tsx に新画面が組み込まれている
- [x] useNavigation.ts が practiceNumber を管理している
- [x] 単体テストが全て通過する
- [x] 結合テストが全て通過する
- [x] テストが全て通過する（pnpm test -- --run）
