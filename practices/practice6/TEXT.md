# Practice 6: モック・スタブの使い方

## 学習目標

- モックとスタブの違いと使い分けを理解する
- `vi.fn()` / `vi.spyOn` / `vi.mock` を使えるようになる
- 外部依存を切り離してテストする方法を身につける

## モックとスタブとは？

テスト対象が外部のサービス（API、データベース等）に依存している場合、その依存を「偽物」に置き換えてテストします。

| 用語       | 説明                   | 用途                             |
| ---------- | ---------------------- | -------------------------------- |
| **スタブ** | 固定の値を返す偽物     | 「この関数は常にこの値を返す」   |
| **モック** | 呼び出しを記録する偽物 | 「この関数が呼ばれたか確認する」 |

### なぜモック・スタブが必要？

- 外部APIを毎回呼ぶとテストが遅くなる
- ネットワークエラーなど再現しにくい状況をテストしたい
- テスト対象だけに集中したい

## vitestの構文

### `vi.fn()` - モック関数を作る

```ts
const mockFn = vi.fn()
mockFn('hello')

expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith('hello')
```

### `vi.fn()` の戻り値を設定する（スタブ）

```ts
const mockFn = vi.fn().mockReturnValue(42)
expect(mockFn()).toBe(42)

// 非同期関数の場合
const mockAsync = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' })
const result = await mockAsync()
expect(result).toEqual({ id: 1, name: 'Alice' })
```

### `vi.spyOn` - 既存の関数を監視する

```ts
const spy = vi.spyOn(Math, 'random').mockReturnValue(0.5)
expect(Math.random()).toBe(0.5)
expect(spy).toHaveBeenCalled()

spy.mockRestore() // 元に戻す
```

### `vi.mock` - モジュール全体をモックする

```ts
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
}))
```

## 演習

`practices/practice6/target.ts` に定義されている関数に対して、モック・スタブを活用したテストを書いてみましょう。

`practices/practice6/target.test.ts` を開いて、外部依存をモックしながらテストを完成させてください。

### ポイント

- テスト対象の関数が「何に依存しているか」を把握する
- 依存先をモックに置き換えてテストする
- モック関数の呼び出し回数や引数も検証する
