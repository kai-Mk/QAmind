import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { App } from '../app.js'
import { KEYS, press } from './helpers.js'

const mockQuestions = JSON.stringify({
  questions: [
    {
      question: 'テスト問題',
      options: ['A', 'B', 'C', 'D'],
      answer: 0,
      explanation: '解説テキスト',
    },
  ],
})

vi.mock('node:fs/promises', () => ({
  readFile: vi.fn().mockImplementation((filePath: string) => {
    if (filePath.endsWith('questions.json')) {
      return Promise.resolve(mockQuestions)
    }
    return Promise.resolve('# テスト内容\n\nサンプルテキスト')
  }),
}))

vi.mock('../utils/progress.js', () => ({
  getFirstIncomplete: vi.fn().mockResolvedValue(3),
}))

vi.mock('../utils/wrongAnswers.js', () => ({
  addWrongAnswer: vi.fn().mockResolvedValue(undefined),
  loadWrongAnswers: vi.fn().mockResolvedValue({}),
}))

describe('App', () => {
  describe('単体テスト', () => {
    it('初期表示でメインメニューが表示される', () => {
      const { lastFrame } = render(<App />)

      expect(lastFrame()).toContain('QAmind へようこそ！')
    })
  })

  describe('結合テスト: App + Menu', () => {
    it('メニューで「最初から学習する」を選択するとTextViewerに遷移する', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('問題に進む')
    })

    it('TextViewerからEnterでQuiz画面に遷移する', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.ENTER)
      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('テスト問題')
    })

    it('「プラクティスを選択する」でPracticeSelectに遷移する', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.DOWN)
      await press(stdin, KEYS.DOWN)
      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('プラクティスを選択してください')
      expect(lastFrame()).toContain('Practice 1')
    })

    it('PracticeSelectからメニューに戻れる', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.DOWN)
      await press(stdin, KEYS.DOWN)
      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('プラクティスを選択してください')

      // メニューに戻るまでスクロール（Practice 1〜10 + メニューに戻る）
      for (let i = 0; i < 10; i++) {
        await press(stdin, KEYS.DOWN)
      }
      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('QAmind へようこそ！')
    })
  })
})
