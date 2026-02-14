# 学習コンテンツ: Practice 8〜10（応用フェーズ）

## メタ情報

- GitHub Issue: #9
- ブランチ: feature/9-content-practice-8-10
- 作成日: 2026-02-14

## 概要

応用フェーズの3問を作成する。TDD形式で、テストと実装の両方を学習者が書く。

- Practice 8: 要件からのテスト設計
- Practice 9: 単体/結合の責務分担
- Practice 10: AI生成コードに対するテスト設計

## 実装方針

応用フェーズではtarget.tsを事前に用意せず、学習者がテスト→実装の順で書く（Practice 10は意図的にバグを含むコードを提供）。

## 影響範囲

- 新規作成: practices/practice8〜10/ 各ディレクトリ（TEXT.md, questions.json, 要件/バグコード）

## 完了条件

- [x] Practice 8〜10 の全ファイルが作成されている
- [x] questions.json が有効なJSONである
- [x] テストが全て通過する（pnpm test -- --run）
