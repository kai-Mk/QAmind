# 仕上げ: Claude Code連携・全体動作確認

## メタ情報

- GitHub Issue: #10
- ブランチ: feature/10-finishing-touches
- 作成日: 2026-02-14

## 概要

Claude Code連携機能の仕上げと全体の動作確認を行う。
mistakes.mdへの書き込みフロー実装、全画面の通し確認、README.md更新。

## 実装方針

### mistakes.md への書き込みフロー

- src/utils/mistakes.ts を作成
- レビュー時の指摘内容を data/mistakes.md に追記するユーティリティ
- Practice番号、レビュー回数、指摘内容を Markdown 形式で書き込む

### data/ ディレクトリ

- .gitkeep を配置して空ディレクトリをコミットに含める
- progress.json, wrong-answers.json, mistakes.md は .gitignore で除外

### README.md の更新

- プロジェクト概要、セットアップ手順、使い方を記載

## 影響範囲

- 新規作成:
  - `src/utils/mistakes.ts`
  - `src/__tests__/utils/mistakes.test.ts`
  - `data/.gitkeep`
- 変更:
  - `.gitignore` - data/ 内の実行時データを除外
  - `README.md` - 最終版に更新

## テスト設計

### 単体テスト

#### mistakes.test.ts

| テストケース                 | 確認内容                                     |
| ---------------------------- | -------------------------------------------- |
| 指摘内容が追記される         | mistakes.md にMarkdown形式で書き込まれること |
| 複数回の書き込みで追記される | 既存内容を壊さず追記されること               |

## 完了条件

- [x] mistakes.ts が実装されている
- [x] data/.gitkeep が存在する
- [x] .gitignore が更新されている
- [x] README.md が更新されている
- [x] テストが全て通過する（pnpm test -- --run）
