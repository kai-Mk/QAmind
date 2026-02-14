import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { WrongAnswer, WrongAnswersData } from '../types.js'

const WRONG_ANSWERS_FILE = 'wrong-answers.json'

const getDataDir = (dataDir?: string) => dataDir ?? join(process.cwd(), 'data')

export const loadWrongAnswers = async (
  dataDir?: string,
): Promise<WrongAnswersData> => {
  const filePath = join(getDataDir(dataDir), WRONG_ANSWERS_FILE)
  try {
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as WrongAnswersData
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return {}
    }
    throw err
  }
}

export const getWrongAnswers = async (
  practiceNumber: number,
  dataDir?: string,
): Promise<WrongAnswer[]> => {
  const data = await loadWrongAnswers(dataDir)
  return data[`practice${practiceNumber}`] ?? []
}

export const addWrongAnswer = async (
  practiceNumber: number,
  entry: WrongAnswer,
  dataDir?: string,
): Promise<void> => {
  const dir = getDataDir(dataDir)
  await mkdir(dir, { recursive: true })

  const data = await loadWrongAnswers(dataDir)
  const key = `practice${practiceNumber}`
  const existing = data[key] ?? []

  data[key] = [...existing, entry]

  await writeFile(join(dir, WRONG_ANSWERS_FILE), JSON.stringify(data, null, 2))
}

export const hasWrongAnswers = async (dataDir?: string): Promise<boolean> => {
  const data = await loadWrongAnswers(dataDir)
  return Object.values(data).some((answers) => answers.length > 0)
}
