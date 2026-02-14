/**
 * 割り算を行う
 * 0で割ろうとするとエラーを投げる
 */
export const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error('0で割ることはできません')
  return a / b
}

/**
 * ユーザー名のバリデーション
 * - 空文字はエラー
 * - 3文字未満はエラー
 * - 20文字超はエラー
 * - 有効な場合はそのまま返す
 */
export const validateUsername = (name: string): string => {
  if (name.length === 0) throw new Error('ユーザー名は必須です')
  if (name.length < 3) throw new Error('ユーザー名は3文字以上必要です')
  if (name.length > 20) throw new Error('ユーザー名は20文字以内にしてください')
  return name
}

/**
 * 配列の平均値を計算する
 * 空配列はエラーを投げる
 */
export const average = (numbers: number[]): number => {
  if (numbers.length === 0) throw new Error('空の配列の平均値は計算できません')
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length
}
