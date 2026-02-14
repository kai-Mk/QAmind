import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { TextViewer } from '../../components/TextViewer.js'
import { KEYS, press } from '../helpers.js'

describe('TextViewer', () => {
  const sampleContent = '# テストの基本\n\nこれはサンプルです。'

  it('テキスト内容が表示される', () => {
    const { lastFrame } = render(
      <TextViewer content={sampleContent} onProceed={() => {}} />,
    )

    expect(lastFrame()).toContain('テストの基本')
    expect(lastFrame()).toContain('サンプル')
  })

  it('「問題に進む」案内が表示される', () => {
    const { lastFrame } = render(
      <TextViewer content={sampleContent} onProceed={() => {}} />,
    )

    expect(lastFrame()).toContain('問題に進む')
  })

  it('Enterキーでテキスト内容が表示中にonProceedが呼ばれる', async () => {
    const handleProceed = vi.fn()
    const { stdin } = render(
      <TextViewer content={sampleContent} onProceed={handleProceed} />,
    )

    await press(stdin, KEYS.ENTER)

    expect(handleProceed).toHaveBeenCalled()
  })
})
