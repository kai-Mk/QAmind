/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest'

// Practice 9: 単体/結合の責務分担
// 要件を「部品」に分解し、単体テスト→結合テストの順で設計しましょう。

// === 単体テスト ===

// describe('在庫管理', () => {
//   // 在庫の追加、取得、減算
//   // 在庫不足時のエラー
// })

// describe('価格計算', () => {
//   // 小計の計算
//   // 税込価格の計算
// })

// === 結合テスト ===

// describe('注文処理', () => {
//   // 在庫チェック → 価格計算 → 注文確定 の一連の流れ
//   // 在庫不足時の注文失敗
// })
