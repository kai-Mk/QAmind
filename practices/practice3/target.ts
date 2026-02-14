/**
 * BMI値からカテゴリを判定する
 * - 18.5未満: 'やせ'
 * - 18.5以上25未満: '普通体重'
 * - 25以上30未満: '肥満（1度）'
 * - 30以上: '肥満（2度以上）'
 */
export const getBmiCategory = (bmi: number): string => {
  if (bmi < 18.5) return 'やせ'
  if (bmi < 25) return '普通体重'
  if (bmi < 30) return '肥満（1度）'
  return '肥満（2度以上）'
}

/**
 * パスワード強度を判定する
 * - 8文字未満: 'weak'
 * - 8文字以上で数字を含む: 'strong'
 * - 8文字以上で数字を含まない: 'medium'
 */
export const getPasswordStrength = (
  password: string,
): 'weak' | 'medium' | 'strong' => {
  if (password.length < 8) return 'weak'
  if (/\d/.test(password)) return 'strong'
  return 'medium'
}

/**
 * 商品のカテゴリに応じた税率を返す
 * - 'food': 8（軽減税率）
 * - 'book': 10
 * - 'luxury': 15
 * - その他: 10
 */
export const getTaxRate = (category: string): number => {
  switch (category) {
    case 'food':
      return 8
    case 'book':
      return 10
    case 'luxury':
      return 15
    default:
      return 10
  }
}
