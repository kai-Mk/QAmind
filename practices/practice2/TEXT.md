# Practice 2: 境界値分析

## 学習目標

- 境界値分析の考え方を理解する
- 「境界」にこそバグが潜みやすいことを実感する
- `it.each` を使って効率的にテストケースを書けるようになる

## 境界値分析とは？

プログラムの動作が「切り替わるポイント」を **境界** と呼びます。境界値分析は、この境界の前後の値を重点的にテストする手法です。

### なぜ境界が大事？

バグは「ちょうど境界の値」で発生しやすいです。

- `>=` と `>` の書き間違い
- 配列の最初と最後の要素
- 0件、1件、上限ちょうどのケース

### 例: 年齢判定

「18歳以上なら成人」というルールの場合：

| 値  | 期待する結果 | 理由               |
| --- | ------------ | ------------------ |
| 17  | 未成年       | 境界の直前         |
| 18  | 成人         | 境界値（ちょうど） |
| 19  | 成人         | 境界の直後         |

## vitestの構文: `it.each`

同じテストロジックを異なるデータで繰り返すとき、`it.each` が便利です。

```ts
import { describe, it, expect } from 'vitest'
import { isAdult } from './target'

describe('isAdult', () => {
  it.each([
    { age: 17, expected: false },
    { age: 18, expected: true },
    { age: 19, expected: true },
  ])('年齢 $age → $expected', ({ age, expected }) => {
    expect(isAdult(age)).toBe(expected)
  })
})
```

## vitestの構文: 数値の比較マッチャー

```ts
expect(value).toBeGreaterThan(3) // > 3
expect(value).toBeGreaterThanOrEqual(3) // >= 3
expect(value).toBeLessThan(3) // < 3
expect(value).toBeLessThanOrEqual(3) // <= 3
```

## テスト設計のコツ

境界値分析では、以下の値をテストしましょう：

1. **境界値そのもの**（ちょうどの値）
2. **境界の直前**（1つ小さい/前の値）
3. **境界の直後**（1つ大きい/後の値）

## 演習

`practices/practice2/target.ts` に定義されている関数に対して、境界値を意識したテストを書いてみましょう。

`practices/practice2/target.test.ts` を開いて、境界値に注目しながらテストケースを完成させてください。

### ポイント

- まず境界がどこにあるか特定する
- 境界の前後の値をテストケースに含める
- `it.each` を使って効率的に書く
