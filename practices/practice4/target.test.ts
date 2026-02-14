/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest'
import { divide, validateUsername, average } from './target'

// Practice 4: 異常系・例外テスト
// 正常系だけでなく、エラーケースもテストしましょう。
// ヒント: expect(() => 関数呼び出し).toThrow() の形式で書きます。

describe('divide', () => {
  // 正常系: 普通の割り算
  // 異常系: 0で割る場合
})

describe('validateUsername', () => {
  // 正常系: 有効なユーザー名
  // 異常系: 空文字、短すぎ、長すぎ
  // ヒント: toThrowError でエラーメッセージも検証しましょう
})

describe('average', () => {
  // 正常系: 数値の配列
  // 異常系: 空配列
})
