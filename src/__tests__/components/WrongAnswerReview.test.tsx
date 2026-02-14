import { describe, it, expect } from 'vitest'
import { render } from 'ink-testing-library'
import { WrongAnswerReview } from '../../components/WrongAnswerReview.js'
import { KEYS, press } from '../helpers.js'
import type { WrongAnswer } from '../../types.js'

const sampleWrongAnswers: Record<string, WrongAnswer[]> = {
  practice1: [
    {
      questionIndex: 0,
      question: 'AAAパターンの「Arrange」に該当するのはどれですか？',
      selectedAnswer: 'テスト対象の関数を実行する',
      correctAnswer: 'テストに必要なデータや状態を準備する',
      answeredAt: '2026-02-14T10:00:00Z',
    },
  ],
}

describe('WrongAnswerReview', () => {
  it('間違えた問題が出題される', () => {
    const { lastFrame } = render(
      <WrongAnswerReview wrongAnswers={sampleWrongAnswers} onBack={() => {}} />,
    )

    expect(lastFrame()).toContain('AAAパターンの「Arrange」')
  })

  it('間違えた問題がない場合はメッセージを表示する', () => {
    const { lastFrame } = render(
      <WrongAnswerReview wrongAnswers={{}} onBack={() => {}} />,
    )

    expect(lastFrame()).toContain('間違えた問題はありません')
  })

  it('「メニューに戻る」が表示される（問題がない場合）', () => {
    const { lastFrame } = render(
      <WrongAnswerReview wrongAnswers={{}} onBack={() => {}} />,
    )

    expect(lastFrame()).toContain('メニューに戻る')
  })

  it('全問回答後に結果が表示される', async () => {
    const { lastFrame, stdin } = render(
      <WrongAnswerReview wrongAnswers={sampleWrongAnswers} onBack={() => {}} />,
    )

    // 回答を選択
    await press(stdin, KEYS.ENTER)
    // フィードバック後にEnter
    await press(stdin, KEYS.ENTER)

    expect(lastFrame()).toContain('復習完了')
  })
})
