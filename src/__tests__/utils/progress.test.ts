import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm, writeFile, readFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  loadProgress,
  getStatus,
  updateStatus,
  getFirstIncomplete,
} from '../../utils/progress.js'
import type { ProgressData } from '../../types.js'

describe('progress', () => {
  let dataDir: string

  beforeEach(async () => {
    dataDir = await mkdtemp(join(tmpdir(), 'qamind-progress-'))
  })

  afterEach(async () => {
    await rm(dataDir, { recursive: true })
  })

  describe('loadProgress', () => {
    it('ファイルが存在する場合、JSONを正しくパースして返す', async () => {
      const data: ProgressData = {
        practice1: { status: 'completed', completedAt: '2026-02-14T12:30:00Z' },
      }
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify(data))

      const result = await loadProgress(dataDir)
      expect(result).toEqual(data)
    })

    it('ファイルが存在しない場合、空オブジェクトを返す', async () => {
      const result = await loadProgress(dataDir)
      expect(result).toEqual({})
    })
  })

  describe('getStatus', () => {
    it('登録済みプラクティスのstatusを返す', async () => {
      const data: ProgressData = {
        practice1: { status: 'completed', completedAt: '2026-02-14T12:30:00Z' },
        practice2: { status: 'in_progress' },
      }
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify(data))

      expect(await getStatus(1, dataDir)).toBe('completed')
      expect(await getStatus(2, dataDir)).toBe('in_progress')
    })

    it('未登録プラクティスはnot_startedを返す', async () => {
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify({}))

      expect(await getStatus(5, dataDir)).toBe('not_started')
    })
  })

  describe('updateStatus', () => {
    it('in_progressに更新するとstatusのみ変更される', async () => {
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify({}))

      await updateStatus(1, 'in_progress', dataDir)

      const raw = await readFile(join(dataDir, 'progress.json'), 'utf-8')
      const data = JSON.parse(raw) as ProgressData
      expect(data.practice1.status).toBe('in_progress')
      expect(data.practice1.completedAt).toBeUndefined()
    })

    it('completedに更新するとstatusとcompletedAtが記録される', async () => {
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify({}))

      await updateStatus(1, 'completed', dataDir)

      const raw = await readFile(join(dataDir, 'progress.json'), 'utf-8')
      const data = JSON.parse(raw) as ProgressData
      expect(data.practice1.status).toBe('completed')
      expect(data.practice1.completedAt).toBeDefined()
    })

    it('ファイルが存在しない状態から更新するとファイルが新規作成される', async () => {
      const newDir = join(dataDir, 'nested')
      await mkdir(newDir, { recursive: true })

      await updateStatus(1, 'in_progress', newDir)

      const raw = await readFile(join(newDir, 'progress.json'), 'utf-8')
      const data = JSON.parse(raw) as ProgressData
      expect(data.practice1.status).toBe('in_progress')
    })

    it('既存のデータを保持したまま更新できる', async () => {
      const data: ProgressData = {
        practice1: { status: 'completed', completedAt: '2026-02-14T12:30:00Z' },
      }
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify(data))

      await updateStatus(2, 'in_progress', dataDir)

      const raw = await readFile(join(dataDir, 'progress.json'), 'utf-8')
      const updated = JSON.parse(raw) as ProgressData
      expect(updated.practice1.status).toBe('completed')
      expect(updated.practice2.status).toBe('in_progress')
    })
  })

  describe('getFirstIncomplete', () => {
    it('全て未着手の場合、1を返す', async () => {
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify({}))

      expect(await getFirstIncomplete(dataDir)).toBe(1)
    })

    it('途中まで完了している場合、最初の未完了番号を返す', async () => {
      const data: ProgressData = {
        practice1: { status: 'completed', completedAt: '2026-02-14T12:30:00Z' },
        practice2: { status: 'completed', completedAt: '2026-02-14T13:00:00Z' },
        practice3: { status: 'in_progress' },
      }
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify(data))

      expect(await getFirstIncomplete(dataDir)).toBe(3)
    })

    it('全て完了している場合、undefinedを返す', async () => {
      const data: ProgressData = Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [
          `practice${i + 1}`,
          { status: 'completed' as const, completedAt: '2026-02-14T12:00:00Z' },
        ]),
      )
      await writeFile(join(dataDir, 'progress.json'), JSON.stringify(data))

      expect(await getFirstIncomplete(dataDir)).toBeUndefined()
    })
  })
})
