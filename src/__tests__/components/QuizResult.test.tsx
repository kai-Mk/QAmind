import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { QuizResult } from '../../components/QuizResult.js'
import { KEYS, press } from '../helpers.js'

describe('QuizResult', () => {
  it('正答数と全問数が表示される', () => {
    const { lastFrame } = render(
      <QuizResult
        score={3}
        total={5}
        onExercise={() => {}}
        onMenu={() => {}}
      />,
    )

    expect(lastFrame()).toContain('3')
    expect(lastFrame()).toContain('5')
  })

  it('「演習に進む」選択肢がある', () => {
    const { lastFrame } = render(
      <QuizResult
        score={3}
        total={5}
        onExercise={() => {}}
        onMenu={() => {}}
      />,
    )

    expect(lastFrame()).toContain('演習に進む')
  })

  it('「メニューに戻る」選択肢がある', () => {
    const { lastFrame } = render(
      <QuizResult
        score={3}
        total={5}
        onExercise={() => {}}
        onMenu={() => {}}
      />,
    )

    expect(lastFrame()).toContain('メニューに戻る')
  })

  it('「演習に進む」を選択するとonExerciseが呼ばれる', async () => {
    const handleExercise = vi.fn()
    const { stdin } = render(
      <QuizResult
        score={3}
        total={5}
        onExercise={handleExercise}
        onMenu={() => {}}
      />,
    )

    await press(stdin, KEYS.ENTER)

    expect(handleExercise).toHaveBeenCalled()
  })

  it('「メニューに戻る」を選択するとonMenuが呼ばれる', async () => {
    const handleMenu = vi.fn()
    const { stdin } = render(
      <QuizResult
        score={3}
        total={5}
        onExercise={() => {}}
        onMenu={handleMenu}
      />,
    )

    await press(stdin, KEYS.DOWN)
    await press(stdin, KEYS.ENTER)

    expect(handleMenu).toHaveBeenCalled()
  })
})
