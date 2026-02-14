import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { Menu } from '../../components/Menu.js'
import { KEYS, press } from '../helpers.js'

describe('Menu', () => {
  it('タイトル「QAmind へようこそ！」が表示される', () => {
    const { lastFrame } = render(<Menu onSelect={() => {}} />)

    expect(lastFrame()).toContain('QAmind へようこそ！')
  })

  it('4つのメニュー項目が全て表示される', () => {
    const { lastFrame } = render(<Menu onSelect={() => {}} />)
    const frame = lastFrame()

    expect(frame).toContain('最初から学習する')
    expect(frame).toContain('途中から再開する')
    expect(frame).toContain('プラクティスを選択する')
    expect(frame).toContain('間違えた問題を復習する')
  })

  it('メニュー項目を選択するとonSelectが正しい値で呼ばれる', async () => {
    const handleSelect = vi.fn()
    const { stdin } = render(<Menu onSelect={handleSelect} />)

    await press(stdin, KEYS.ENTER)

    expect(handleSelect).toHaveBeenCalledWith('start')
  })

  it('2番目の項目を選択するとresumeが渡される', async () => {
    const handleSelect = vi.fn()
    const { stdin } = render(<Menu onSelect={handleSelect} />)

    await press(stdin, KEYS.DOWN)
    await press(stdin, KEYS.ENTER)

    expect(handleSelect).toHaveBeenCalledWith('resume')
  })
})
