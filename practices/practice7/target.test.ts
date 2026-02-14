/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest'
import {
  calculateTax,
  applyDiscount,
  calculateShipping,
  calculateOrderTotal,
} from './target'

// Practice 7: 結合テストの役割
// まず各関数の単体テストを書き、次に組み合わせた結合テストを書きましょう。

// === 単体テスト ===

describe('calculateTax', () => {
  // 税込価格の計算が正しいかテストしましょう
})

describe('applyDiscount', () => {
  // 割引の条件分岐をテストしましょう
  // 5000円未満、5000円以上、10000円以上
})

describe('calculateShipping', () => {
  // 送料の条件分岐をテストしましょう
  // 3000円未満、3000円以上
})

// === 結合テスト ===

describe('calculateOrderTotal', () => {
  // 複数モジュールを組み合わせた結合テスト
  // 税計算 → 割引 → 送料 の一連の流れをテストしましょう
})
