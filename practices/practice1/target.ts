/**
 * 2つの数値を足し算する
 */
export const sum = (a: number, b: number): number => {
  return a + b
}

/**
 * 2つの数値を掛け算する
 */
export const multiply = (a: number, b: number): number => {
  return a * b
}

/**
 * 名前と年齢からプロフィール文字列を生成する
 */
export const createProfile = (
  name: string,
  age: number,
): { name: string; age: number; greeting: string } => {
  return {
    name,
    age,
    greeting: `こんにちは、${name}さん（${age}歳）`,
  }
}
