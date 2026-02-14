# TODO

QAmindの実装タスク管理。スペック駆動開発で進める。

ステータス: `[ ]` 未着手 / `[~]` 進行中 / `[x]` 完了

---

## Phase 0: 開発環境・ワークフロー整備

- [x] カスタムコマンド作成（task-design, task-run, task-check, text-create, test-review）
- [x] ステアリングファイルテンプレート作成（.claude/templates/steering.md）
- [x] PRテンプレート作成（.github/pull_request_template.md）
- [x] GitHubリポジトリ連携（ghコマンドでリモートリポジトリ接続）
- [x] GitHub issue作成（全10 issue）

## Phase 1: プロジェクトセットアップ

- [x] pnpm init + package.json設定（name, type: module, bin, scripts）
- [x] TypeScript設定（tsconfig.json）
- [x] vitest設定（vitest.config.ts, vitest.practice.config.ts）
- [x] tsup設定
- [x] ESLint設定（@typescript-eslint, react, react-hooks）
- [x] Prettier設定
- [x] husky + lint-staged設定
- [x] GitHub Actions設定（PR-check.yml）
- [x] 依存パッケージインストール（ink, ink-select-input, ink-testing-library, marked, marked-terminal 等）

## Phase 2: CLIアプリ基盤

- [x] エントリポイント（src/index.tsx）
- [x] ルートコンポーネント（src/app.tsx）- 画面遷移の状態管理
- [x] メインメニュー（src/components/Menu.tsx）

## Phase 3: ユーティリティ

- [x] 進捗管理（src/utils/progress.ts）- progress.jsonの読み書き
- [x] 間違えた問題管理（src/utils/wrongAnswers.ts）- wrong-answers.jsonの読み書き
- [x] テスト実行（src/utils/testRunner.ts）- vitestをプログラムから実行

## Phase 4: 画面コンポーネント

- [x] プラクティス選択（src/components/PracticeSelect.tsx）- 一覧 + 番号入力
- [x] TEXT.md表示（src/components/TextViewer.tsx）- marked-terminal使用
- [~] 選択問題（src/components/Quiz.tsx）- 1問ずつ出題、正誤判定
- [~] 結果サマリー（src/components/QuizResult.tsx）- 正答率表示
- [ ] 演習画面（src/components/Exercise.tsx）- テストチェック、レビュー依頼
- [~] 間違えた問題の復習（src/components/WrongAnswerReview.tsx）

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

- [ ] mistakes.mdへの書き込みフロー
- [ ] レビュー時のprogress.json更新フロー（status, reviewCount, completedAt）
- [ ] レビュー3回後の自動完了処理

## Phase 8: 仕上げ

- [ ] 全体の動作確認
- [ ] README.mdの更新（最終版）
