import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { Exercise } from '../../components/Exercise.js'
import { KEYS, press } from '../helpers.js'

vi.mock('../../utils/testRunner.js', () => ({
  runPracticeTest: vi.fn().mockResolvedValue({
    success: true,
    output: 'All tests passed',
  }),
}))

vi.mock('../../utils/progress.js', () => ({
  updateStatus: vi.fn().mockResolvedValue(undefined),
}))

describe('Exercise', () => {
  it('プラクティスタイトルが表示される', () => {
    const { lastFrame } = render(
      <Exercise practiceNumber={1} onMenu={() => {}} />,
    )

    expect(lastFrame()).toContain('テストの基本構造')
  })

  it('「テストをチェックする」選択肢がある', () => {
    const { lastFrame } = render(
      <Exercise practiceNumber={1} onMenu={() => {}} />,
    )

    expect(lastFrame()).toContain('テストをチェックする')
  })

  it('「メニューに戻る」選択肢がある', () => {
    const { lastFrame } = render(
      <Exercise practiceNumber={1} onMenu={() => {}} />,
    )

    expect(lastFrame()).toContain('メニューに戻る')
  })

  it('インプットフェーズではレビュー選択肢が表示されない', () => {
    const { lastFrame } = render(
      <Exercise practiceNumber={1} onMenu={() => {}} />,
    )

    expect(lastFrame()).not.toContain('レビューを依頼する')
  })

  it('応用フェーズではレビュー選択肢が表示される', () => {
    const { lastFrame } = render(
      <Exercise practiceNumber={8} onMenu={() => {}} />,
    )

    expect(lastFrame()).toContain('レビューを依頼する')
  })

  it('テスト実行で結果が表示される', async () => {
    const { lastFrame, stdin } = render(
      <Exercise practiceNumber={1} onMenu={() => {}} />,
    )

    await press(stdin, KEYS.ENTER)
    // テスト実行の非同期処理を待つ
    await new Promise((r) => setTimeout(r, 200))

    expect(lastFrame()).toContain('All tests passed')
  })

  it('演習案内が表示される', () => {
    const { lastFrame } = render(
      <Exercise practiceNumber={1} onMenu={() => {}} />,
    )

    expect(lastFrame()).toContain('target.test.ts')
  })
})
