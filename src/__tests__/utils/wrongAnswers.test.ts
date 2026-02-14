import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtemp, rm, writeFile, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  loadWrongAnswers,
  getWrongAnswers,
  addWrongAnswer,
  hasWrongAnswers,
} from '../../utils/wrongAnswers.js'
import type { WrongAnswer, WrongAnswersData } from '../../types.js'

const makeEntry = (overrides: Partial<WrongAnswer> = {}): WrongAnswer => ({
  questionIndex: 0,
  question: 'テスト問題',
  selectedAnswer: '選択肢A',
  correctAnswer: '選択肢B',
  answeredAt: '2026-02-14T10:00:00Z',
  ...overrides,
})

describe('wrongAnswers', () => {
  let dataDir: string

  beforeEach(async () => {
    dataDir = await mkdtemp(join(tmpdir(), 'qamind-wrong-'))
  })

  afterEach(async () => {
    await rm(dataDir, { recursive: true })
  })

  describe('loadWrongAnswers', () => {
    it('ファイルが存在する場合、JSONを正しくパースして返す', async () => {
      const data: WrongAnswersData = {
        practice1: [makeEntry()],
      }
      await writeFile(join(dataDir, 'wrong-answers.json'), JSON.stringify(data))

      const result = await loadWrongAnswers(dataDir)
      expect(result).toEqual(data)
    })

    it('ファイルが存在しない場合、空オブジェクトを返す', async () => {
      const result = await loadWrongAnswers(dataDir)
      expect(result).toEqual({})
    })
  })

  describe('getWrongAnswers', () => {
    it('記録がある場合、該当プラクティスの配列を返す', async () => {
      const entry = makeEntry()
      const data: WrongAnswersData = { practice1: [entry] }
      await writeFile(join(dataDir, 'wrong-answers.json'), JSON.stringify(data))

      const result = await getWrongAnswers(1, dataDir)
      expect(result).toEqual([entry])
    })

    it('記録がない場合、空配列を返す', async () => {
      await writeFile(join(dataDir, 'wrong-answers.json'), JSON.stringify({}))

      const result = await getWrongAnswers(5, dataDir)
      expect(result).toEqual([])
    })
  })

  describe('addWrongAnswer', () => {
    it('新規プラクティスへの追加で新しいキーが作成される', async () => {
      const entry = makeEntry()
      await addWrongAnswer(1, entry, dataDir)

      const raw = await readFile(join(dataDir, 'wrong-answers.json'), 'utf-8')
      const data = JSON.parse(raw) as WrongAnswersData
      expect(data.practice1).toEqual([entry])
    })

    it('既存プラクティスへの追加で配列に追記される', async () => {
      const entry1 = makeEntry({ questionIndex: 0 })
      const entry2 = makeEntry({ questionIndex: 2, question: '別の問題' })
      const data: WrongAnswersData = { practice1: [entry1] }
      await writeFile(join(dataDir, 'wrong-answers.json'), JSON.stringify(data))

      await addWrongAnswer(1, entry2, dataDir)

      const raw = await readFile(join(dataDir, 'wrong-answers.json'), 'utf-8')
      const updated = JSON.parse(raw) as WrongAnswersData
      expect(updated.practice1).toEqual([entry1, entry2])
    })
  })

  describe('hasWrongAnswers', () => {
    it('記録がある場合、trueを返す', async () => {
      const data: WrongAnswersData = { practice1: [makeEntry()] }
      await writeFile(join(dataDir, 'wrong-answers.json'), JSON.stringify(data))

      expect(await hasWrongAnswers(dataDir)).toBe(true)
    })

    it('記録がない場合、falseを返す', async () => {
      await writeFile(join(dataDir, 'wrong-answers.json'), JSON.stringify({}))

      expect(await hasWrongAnswers(dataDir)).toBe(false)
    })

    it('ファイルが存在しない場合、falseを返す', async () => {
      expect(await hasWrongAnswers(dataDir)).toBe(false)
    })
  })
})
