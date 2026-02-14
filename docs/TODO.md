# TODO

QAmindの実装タスク管理。スペック駆動開発で進める。

ステータス: `[ ]` 未着手 / `[~]` 進行中 / `[x]` 完了

---

## Phase 1: プロジェクトセットアップ

- [ ] pnpm init + package.json設定（name, type: module, bin, scripts）
- [ ] TypeScript設定（tsconfig.json）
- [ ] vitest設定（vitest.config.ts, vitest.practice.config.ts）
- [ ] tsup設定
- [ ] ESLint設定（@typescript-eslint, react, react-hooks）
- [ ] Prettier設定
- [ ] husky + lint-staged設定
- [ ] GitHub Actions設定（PR-check.yml）
- [ ] 依存パッケージインストール（ink, ink-select-input, ink-testing-library, marked, marked-terminal 等）

## Phase 2: CLIアプリ基盤

- [ ] エントリポイント（src/index.tsx）
- [ ] ルートコンポーネント（src/app.tsx）- 画面遷移の状態管理
- [ ] メインメニュー（src/components/Menu.tsx）

## Phase 3: ユーティリティ

- [ ] 進捗管理（src/utils/progress.ts）- progress.jsonの読み書き
- [ ] 間違えた問題管理（src/utils/wrongAnswers.ts）- wrong-answers.jsonの読み書き
- [ ] テスト実行（src/utils/testRunner.ts）- vitestをプログラムから実行

## Phase 4: 画面コンポーネント

- [ ] プラクティス選択（src/components/PracticeSelect.tsx）- 一覧 + 番号入力
- [ ] TEXT.md表示（src/components/TextViewer.tsx）- marked-terminal使用
- [ ] 選択問題（src/components/Quiz.tsx）- 1問ずつ出題、正誤判定
- [ ] 結果サマリー（src/components/QuizResult.tsx）- 正答率表示
- [ ] 演習画面（src/components/Exercise.tsx）- テストチェック、レビュー依頼
- [ ] 間違えた問題の復習（src/components/WrongAnswerReview.tsx）

## Phase 5: 学習コンテンツ（インプットフェーズ）

- [ ] Practice 1: テストの基本構造（AAAパターン）- TEXT.md, questions.json, target.ts, target.test.ts
- [ ] Practice 2: 境界値分析
- [ ] Practice 3: 同値分割
- [ ] Practice 4: 異常系・例外テスト
- [ ] Practice 5: 状態を持つもののテスト
- [ ] Practice 6: モック・スタブの使い方
- [ ] Practice 7: 結合テストの役割

## Phase 6: 学習コンテンツ（応用フェーズ）

- [ ] Practice 8: 要件からのテスト設計
- [ ] Practice 9: 単体/結合の責務分担
- [ ] Practice 10: AI生成コードに対するテスト設計

## Phase 7: Claude Code連携

- [ ] レビュー用カスタムコマンド（.claude/commands/test-review.md）
- [ ] mistakes.mdへの書き込みフロー

## Phase 8: 仕上げ

- [ ] 全体の動作確認
- [ ] README.mdの更新（最終版）
