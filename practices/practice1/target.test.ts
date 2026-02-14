/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest'
import { sum, multiply, createProfile } from './target'

// Practice 1: テストの基本構造（AAAパターン）
// AAAパターン（Arrange / Act / Assert）を意識してテストを書いてみましょう。

describe('sum', () => {
  it('1 + 2 は 3 になる', () => {
    // Arrange
    // Act
    // Assert
  })

  // 他のテストケースも追加してみましょう
})

describe('multiply', () => {
  // multiply のテストを書いてみましょう
})

describe('createProfile', () => {
  // createProfile のテストを書いてみましょう
  // ヒント: オブジェクトの比較には toEqual を使います
})
