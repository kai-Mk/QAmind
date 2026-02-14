/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest'
import { isAdult, getGrade, getItemAt } from './target'

// Practice 2: 境界値分析
// 「境界」にこそバグが潜む。境界の前後を重点的にテストしましょう。

describe('isAdult', () => {
  // 境界値: 18歳
  // 17歳（境界の直前）、18歳（境界値）、19歳（境界の直後）をテストしましょう
  // ヒント: it.each を使うと効率的です
})

describe('getGrade', () => {
  // 境界値: 90, 70, 50
  // 各境界の前後をテストしましょう
})

describe('getItemAt', () => {
  // 境界値: インデックス 0 と items.length - 1
  // 範囲内・範囲外の境界をテストしましょう
})
