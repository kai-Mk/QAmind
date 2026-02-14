/**
 * 商品の税込価格を計算する
 */
export const calculateTax = (price: number, taxRate: number): number => {
  return Math.floor(price * (1 + taxRate / 100))
}

/**
 * 割引を適用する
 * - 10%割引: 合計5000円以上
 * - 20%割引: 合計10000円以上
 */
export const applyDiscount = (total: number): number => {
  if (total >= 10000) return Math.floor(total * 0.8)
  if (total >= 5000) return Math.floor(total * 0.9)
  return total
}

/**
 * 送料を計算する
 * - 3000円以上: 送料無料
 * - 3000円未満: 500円
 */
export const calculateShipping = (total: number): number => {
  return total >= 3000 ? 0 : 500
}

/**
 * 注文の最終金額を計算する
 * 税込価格の合計 → 割引適用 → 送料追加
 */
export const calculateOrderTotal = (
  items: { price: number; quantity: number }[],
  taxRate: number,
): { subtotal: number; discount: number; shipping: number; total: number } => {
  const subtotal = items.reduce((sum, item) => {
    return sum + calculateTax(item.price * item.quantity, taxRate)
  }, 0)

  const afterDiscount = applyDiscount(subtotal)
  const discount = subtotal - afterDiscount
  const shipping = calculateShipping(afterDiscount)
  const total = afterDiscount + shipping

  return { subtotal, discount, shipping, total }
}
