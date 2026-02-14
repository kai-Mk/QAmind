import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const MISTAKES_FILE = 'mistakes.md'

const getDataDir = (dataDir?: string) => dataDir ?? join(process.cwd(), 'data')

export type MistakeEntry = {
  practiceNumber: number
  reviewCount: number
  feedback: string
}

export const appendMistake = async (
  entry: MistakeEntry,
  dataDir?: string,
): Promise<void> => {
  const dir = getDataDir(dataDir)
  await mkdir(dir, { recursive: true })

  const filePath = join(dir, MISTAKES_FILE)

  let existing = ''
  try {
    existing = await readFile(filePath, 'utf-8')
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw err
    }
  }

  const header = `## Practice ${entry.practiceNumber} - レビュー ${entry.reviewCount}回目`
  const section = `${header}\n\n${entry.feedback}\n\n`

  const content = existing
    ? `${existing}${section}`
    : `# 間違いノート\n\n${section}`

  await writeFile(filePath, content)
}
