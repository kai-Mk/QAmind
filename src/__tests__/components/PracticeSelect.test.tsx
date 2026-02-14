import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { PracticeSelect } from '../../components/PracticeSelect.js'
import { KEYS, press } from '../helpers.js'
import { practiceTitles } from '../../constants.js'

describe('PracticeSelect', () => {
  it('プラクティス一覧が表示される', () => {
    const { lastFrame } = render(
      <PracticeSelect onSelect={() => {}} onBack={() => {}} />,
    )
    const frame = lastFrame()

    expect(frame).toContain('プラクティスを選択')
    for (let i = 1; i <= 10; i++) {
      expect(frame).toContain(practiceTitles[i])
    }
  })

  it('プラクティス選択でonSelectが正しい番号で呼ばれる', async () => {
    const handleSelect = vi.fn()
    const { stdin } = render(
      <PracticeSelect onSelect={handleSelect} onBack={() => {}} />,
    )

    await press(stdin, KEYS.ENTER)

    expect(handleSelect).toHaveBeenCalledWith(1)
  })

  it('2番目のプラクティスを選択すると2が渡される', async () => {
    const handleSelect = vi.fn()
    const { stdin } = render(
      <PracticeSelect onSelect={handleSelect} onBack={() => {}} />,
    )

    await press(stdin, KEYS.DOWN)
    await press(stdin, KEYS.ENTER)

    expect(handleSelect).toHaveBeenCalledWith(2)
  })

  it('「メニューに戻る」選択肢がある', () => {
    const { lastFrame } = render(
      <PracticeSelect onSelect={() => {}} onBack={() => {}} />,
    )

    expect(lastFrame()).toContain('メニューに戻る')
  })

  it('「メニューに戻る」を選択するとonBackが呼ばれる', async () => {
    const handleBack = vi.fn()
    const { stdin } = render(
      <PracticeSelect onSelect={() => {}} onBack={handleBack} />,
    )

    // Practice 1〜10 の後の「メニューに戻る」まで移動
    for (let i = 0; i < 10; i++) {
      await press(stdin, KEYS.DOWN)
    }
    await press(stdin, KEYS.ENTER)

    expect(handleBack).toHaveBeenCalled()
  })
})
