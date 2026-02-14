import { describe, it, expect } from 'vitest'
import { render } from 'ink-testing-library'
import { App } from '../app.js'
import { KEYS, press } from './helpers.js'

describe('App', () => {
  describe('単体テスト', () => {
    it('初期表示でメインメニューが表示される', () => {
      const { lastFrame } = render(<App />)

      expect(lastFrame()).toContain('QAmind へようこそ！')
    })
  })

  describe('結合テスト: App + Menu', () => {
    it('メニューで「最初から学習する」を選択すると画面が遷移する', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('テキスト表示')
      expect(lastFrame()).toContain('メニューに戻る')
    })

    it('プレースホルダーからメニューに戻れる', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.ENTER)
      expect(lastFrame()).toContain('テキスト表示')

      await press(stdin, KEYS.ENTER)
      expect(lastFrame()).toContain('QAmind へようこそ！')
    })

    it('「プラクティスを選択する」で対応する画面に遷移する', async () => {
      const { lastFrame, stdin } = render(<App />)

      await press(stdin, KEYS.DOWN)
      await press(stdin, KEYS.DOWN)
      await press(stdin, KEYS.ENTER)

      expect(lastFrame()).toContain('プラクティス選択')
      expect(lastFrame()).toContain('メニューに戻る')
    })
  })
})
