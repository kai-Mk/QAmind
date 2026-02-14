/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest'
import { getBmiCategory, getPasswordStrength, getTaxRate } from './target'

// Practice 3: 同値分割
// 入力値を「同じ動きをするグループ」に分けて、各グループの代表値をテストしましょう。

describe('getBmiCategory', () => {
  // 同値クラス: やせ / 普通体重 / 肥満（1度）/ 肥満（2度以上）
  // 各クラスの代表値を選んでテストしましょう
})

describe('getPasswordStrength', () => {
  // 同値クラス: weak / medium / strong
  // 各クラスの条件を整理してからテストしましょう
})

describe('getTaxRate', () => {
  // 同値クラス: food / book / luxury / その他
  // 各カテゴリの代表値をテストしましょう
  // ヒント: toContain や toMatch は文字列の検証に便利です
})
