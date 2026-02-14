/**
 * シンプルなカウンター
 */
export class Counter {
  private count = 0

  get value(): number {
    return this.count
  }

  increment(): void {
    this.count++
  }

  decrement(): void {
    if (this.count > 0) this.count--
  }

  reset(): void {
    this.count = 0
  }
}

/**
 * ショッピングカート
 */
export type CartItem = {
  name: string
  price: number
  quantity: number
}

export class ShoppingCart {
  private items: CartItem[] = []

  addItem(name: string, price: number, quantity = 1): void {
    const existing = this.items.find((item) => item.name === name)
    if (existing) {
      existing.quantity += quantity
    } else {
      this.items.push({ name, price, quantity })
    }
  }

  removeItem(name: string): void {
    this.items = this.items.filter((item) => item.name !== name)
  }

  getItems(): CartItem[] {
    return [...this.items]
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }

  getItemCount(): number {
    return this.items.reduce((count, item) => count + item.quantity, 0)
  }

  clear(): void {
    this.items = []
  }
}
