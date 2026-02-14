// Practice 10: AI生成コード（意図的にバグあり）
// このコードには意図的にバグが含まれています。
// テストを書いてバグを見つけ、修正してください。

export type Reservation = {
  id: string
  startHour: number
  endHour: number
  name: string
}

const OPEN_HOUR = 9
const CLOSE_HOUR = 21
const MIN_DURATION = 1
const MAX_DURATION = 8

export class ReservationSystem {
  private reservations: Reservation[] = []
  private nextId = 1

  /**
   * 予約を追加する
   * バグ1: 予約時間のバリデーションに境界値の誤りあり
   * バグ2: 重複チェックのロジックに誤りあり
   */
  addReservation(
    startHour: number,
    endHour: number,
    name: string,
  ): Reservation {
    const duration = endHour - startHour

    // バリデーション
    if (duration < MIN_DURATION) {
      throw new Error('予約は1時間以上必要です')
    }
    // バグ1: > を使っているが、8時間ちょうどは許可すべき（>= ではなく > が正しくない）
    if (duration > MAX_DURATION) {
      throw new Error('予約は8時間以内にしてください')
    }
    if (startHour < OPEN_HOUR || endHour > CLOSE_HOUR) {
      throw new Error('営業時間外の予約はできません')
    }

    // バグ2: 重複チェックが不完全（部分的な重なりを検出できない）
    const hasConflict = this.reservations.some(
      (r) => r.startHour === startHour && r.endHour === endHour,
    )
    if (hasConflict) {
      throw new Error('この時間帯は予約済みです')
    }

    const reservation: Reservation = {
      id: `R${this.nextId++}`,
      startHour,
      endHour,
      name,
    }
    this.reservations.push(reservation)
    return reservation
  }

  /**
   * 予約をキャンセルする
   */
  cancelReservation(id: string): boolean {
    const index = this.reservations.findIndex((r) => r.id === id)
    if (index === -1) return false
    this.reservations.splice(index, 1)
    return true
  }

  /**
   * 全予約を取得する
   */
  getReservations(): Reservation[] {
    return [...this.reservations]
  }
}
