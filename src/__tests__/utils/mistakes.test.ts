import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { appendMistake } from '../../utils/mistakes.js'

describe('mistakes', () => {
  let dataDir: string

  beforeEach(async () => {
    dataDir = await mkdtemp(join(tmpdir(), 'qamind-mistakes-'))
  })

  afterEach(async () => {
    await rm(dataDir, { recursive: true })
  })

  describe('appendMistake', () => {
    it('指摘内容がMarkdown形式で書き込まれる', async () => {
      await appendMistake(
        {
          practiceNumber: 3,
          reviewCount: 1,
          feedback: '境界値のテストが不足しています。',
        },
        dataDir,
      )

      const content = await readFile(join(dataDir, 'mistakes.md'), 'utf-8')
      expect(content).toContain('# 間違いノート')
      expect(content).toContain('## Practice 3 - レビュー 1回目')
      expect(content).toContain('境界値のテストが不足しています。')
    })

    it('複数回の書き込みで追記される', async () => {
      await appendMistake(
        {
          practiceNumber: 3,
          reviewCount: 1,
          feedback: '1回目の指摘。',
        },
        dataDir,
      )

      await appendMistake(
        {
          practiceNumber: 3,
          reviewCount: 2,
          feedback: '2回目の指摘。',
        },
        dataDir,
      )

      const content = await readFile(join(dataDir, 'mistakes.md'), 'utf-8')
      expect(content).toContain('## Practice 3 - レビュー 1回目')
      expect(content).toContain('1回目の指摘。')
      expect(content).toContain('## Practice 3 - レビュー 2回目')
      expect(content).toContain('2回目の指摘。')
    })
  })
})
