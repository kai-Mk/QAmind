import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { PracticeStatus, ProgressData } from '../types.js'

const TOTAL_PRACTICES = 10
const PROGRESS_FILE = 'progress.json'

const getDataDir = (dataDir?: string) => dataDir ?? join(process.cwd(), 'data')

export const loadProgress = async (dataDir?: string): Promise<ProgressData> => {
  const filePath = join(getDataDir(dataDir), PROGRESS_FILE)
  try {
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as ProgressData
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return {}
    }
    throw err
  }
}

export const getStatus = async (
  practiceNumber: number,
  dataDir?: string,
): Promise<PracticeStatus> => {
  const data = await loadProgress(dataDir)
  return data[`practice${practiceNumber}`]?.status ?? 'not_started'
}

export const updateStatus = async (
  practiceNumber: number,
  status: PracticeStatus,
  dataDir?: string,
): Promise<void> => {
  const dir = getDataDir(dataDir)
  await mkdir(dir, { recursive: true })

  const data = await loadProgress(dataDir)
  const key = `practice${practiceNumber}`
  const existing = data[key] ?? { status: 'not_started' }

  data[key] = {
    ...existing,
    status,
    ...(status === 'completed'
      ? { completedAt: new Date().toISOString() }
      : {}),
  }

  await writeFile(join(dir, PROGRESS_FILE), JSON.stringify(data, null, 2))
}

export const getFirstIncomplete = async (
  dataDir?: string,
): Promise<number | undefined> => {
  const data = await loadProgress(dataDir)

  for (let i = 1; i <= TOTAL_PRACTICES; i++) {
    const entry = data[`practice${i}`]
    if (!entry || entry.status !== 'completed') {
      return i
    }
  }

  return undefined
}
