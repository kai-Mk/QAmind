/**
 * ユーザー情報を取得する関数（APIの代わり）
 * 本来は外部APIを呼ぶが、テストではモックに置き換える
 */
export type User = {
  id: number
  name: string
  email: string
}

export const fetchUser = async (id: number): Promise<User> => {
  // 実際にはfetch()でAPIを呼ぶ想定
  const response = await fetch(`https://api.example.com/users/${id}`)
  return response.json() as Promise<User>
}

/**
 * ユーザーの表示名を取得する
 * fetchUser に依存している
 */
export const getUserDisplayName = async (
  id: number,
  fetcher: (id: number) => Promise<User> = fetchUser,
): Promise<string> => {
  const user = await fetcher(id)
  return `${user.name} (${user.email})`
}

/**
 * 通知を送信する
 * notifier コールバックに依存している
 */
export const sendNotification = (
  message: string,
  notifier: (msg: string) => void,
): { sent: boolean; message: string } => {
  notifier(message)
  return { sent: true, message }
}

/**
 * ランダムな挨拶を返す
 * Math.random に依存している
 */
export const getRandomGreeting = (): string => {
  const greetings = ['こんにちは', 'やあ', 'おはよう', 'こんばんは']
  const index = Math.floor(Math.random() * greetings.length)
  return greetings[index]
}
