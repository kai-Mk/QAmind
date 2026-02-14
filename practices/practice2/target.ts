/**
 * 18歳以上かどうかを判定する
 */
export const isAdult = (age: number): boolean => {
  return age >= 18
}

/**
 * 点数に応じてランクを返す
 * - 90以上: 'A'
 * - 70以上: 'B'
 * - 50以上: 'C'
 * - 50未満: 'D'
 */
export const getGrade = (score: number): string => {
  if (score >= 90) return 'A'
  if (score >= 70) return 'B'
  if (score >= 50) return 'C'
  return 'D'
}

/**
 * 配列から指定したインデックスの要素を取得する
 * 範囲外の場合は undefined を返す
 */
export const getItemAt = <T>(items: T[], index: number): T | undefined => {
  if (index < 0 || index >= items.length) return undefined
  return items[index]
}
