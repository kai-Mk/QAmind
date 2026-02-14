GitHub issueからタスク設計書を作成し、PRまで準備するコマンド。

## 引数

$ARGUMENTS: GitHub issueの番号（例: #3）

## 実行手順

1. `gh issue view $ARGUMENTS` でissueの内容を取得する
2. 現在のブランチがmainであることを確認し、最新の状態にする（`git checkout main && git pull`）
3. issueの内容に基づき新規ブランチを作成する（`git checkout -b feature/{issue番号}-{概要の短縮名（英語）}`）
4. `.claude/templates/steering.md` のテンプレートに従い、`docs/steering/{issue番号}-{概要の短縮名（英語）}.md` を作成する（ブランチ名と同じ命名規則）
   - メタ情報にissue番号、ブランチ名、作成日を記入する
   - issueの内容をもとに概要・実装方針・影響範囲・テスト設計・完了条件を記述する
   - テスト設計は単体テストと結合テストに分けて具体的なテストケースを書く
5. ステアリングファイルをコミットする
6. リモートにpushし、Draft PRを作成する（`gh pr create --draft`）
   - PRのbodyは `.github/pull_request_template.md` の形式に従う
   - 関連Issueとして `closes #N` を含める
7. 作成したPRのURLを出力する

## 注意事項

- ブランチは必ずmainから切ること
- ブランチ名は必ず英語にすること（issueが日本語タイトルでも英訳する）
- ステアリングファイルの内容は具体的に書くこと。曖昧な記述は避ける
- テスト設計は実装前に書くものなので、実装の詳細ではなく「何を検証するか」に焦点を当てる
