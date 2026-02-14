/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, beforeEach } from 'vitest'
import { Counter, ShoppingCart } from './target'

// Practice 5: 状態を持つもののテスト
// beforeEach を使って、各テストで独立したインスタンスを用意しましょう。

describe('Counter', () => {
  // let counter: Counter
  // beforeEach(() => { ... })
  // 初期値のテスト
  // increment のテスト
  // decrement のテスト（0以下にならないことも確認）
  // reset のテスト
})

describe('ShoppingCart', () => {
  // let cart: ShoppingCart
  // beforeEach(() => { ... })
  // 商品追加のテスト
  // 同じ商品を追加すると数量が増えることのテスト
  // 商品削除のテスト
  // 合計金額のテスト
  // カートクリアのテスト
})
