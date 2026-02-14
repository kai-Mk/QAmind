/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi } from 'vitest'
import {
  getUserDisplayName,
  sendNotification,
  getRandomGreeting,
} from './target'
import type { User } from './target'

// Practice 6: モック・スタブの使い方
// 外部依存をモックに置き換えてテストしましょう。

describe('getUserDisplayName', () => {
  // vi.fn().mockResolvedValue() でフェッチャーをスタブにして、
  // getUserDisplayName が正しい表示名を返すかテストしましょう
})

describe('sendNotification', () => {
  // vi.fn() でnotifierをモックにして、
  // 正しいメッセージで呼ばれたか検証しましょう
})

describe('getRandomGreeting', () => {
  // vi.spyOn(Math, 'random') でランダム値を固定して、
  // 期待する挨拶が返るかテストしましょう
})
