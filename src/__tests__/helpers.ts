const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const press = async (
  stdin: { write: (data: string) => void },
  key: string,
) => {
  stdin.write(key)
  await delay(100)
}

export const KEYS = {
  ENTER: '\r',
  DOWN: '\x1B[B',
  UP: '\x1B[A',
} as const
