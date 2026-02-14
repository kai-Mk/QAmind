import { describe, it, expect, vi } from 'vitest'
import { render } from 'ink-testing-library'
import { Quiz } from '../../components/Quiz.js'
import { KEYS, press } from '../helpers.js'
import type { Question } from '../../types.js'

const sampleQuestions: Question[] = [
  {
    question: 'AAAパターンの「Arrange」に該当するのはどれですか？',
    options: [
      'テスト対象の関数を実行する',
      'テストに必要なデータや状態を準備する',
      '実行結果が期待通りか検証する',
      'テスト後にデータをクリーンアップする',
    ],
    answer: 1,
    explanation:
      'Arrangeはテストの前準備です。テストに必要な変数の宣言やオブジェクトの生成を行います。',
  },
  {
    question: 'AAAパターンの「Act」に該当するのはどれですか？',
    options: [
      'テストに必要なデータを準備する',
      'テスト対象の関数やメソッドを実行する',
      '実行結果を検証する',
      'テストをグループ化する',
    ],
    answer: 1,
    explanation:
      'Actはテスト対象の実行です。テストしたい関数やメソッドを呼び出します。',
  },
]

describe('Quiz', () => {
  it('問題文が表示される', () => {
    const { lastFrame } = render(
      <Quiz
        questions={sampleQuestions}
        practiceNumber={1}
        onComplete={() => {}}
      />,
    )

    expect(lastFrame()).toContain('AAAパターンの「Arrange」')
  })

  it('選択肢が表示される', () => {
    const { lastFrame } = render(
      <Quiz
        questions={sampleQuestions}
        practiceNumber={1}
        onComplete={() => {}}
      />,
    )
    const frame = lastFrame()

    expect(frame).toContain('テスト対象の関数を実行する')
    expect(frame).toContain('テストに必要なデータや状態を準備する')
    expect(frame).toContain('実行結果が期待通りか検証する')
    expect(frame).toContain('テスト後にデータをクリーンアップする')
  })

  it('正解を選ぶと「正解」が表示される', async () => {
    const { lastFrame, stdin } = render(
      <Quiz
        questions={sampleQuestions}
        practiceNumber={1}
        onComplete={() => {}}
      />,
    )

    // 正解（インデックス1）を選択
    await press(stdin, KEYS.DOWN)
    await press(stdin, KEYS.ENTER)

    expect(lastFrame()).toContain('正解')
  })

  it('不正解を選ぶと「不正解」と解説が表示される', async () => {
    const { lastFrame, stdin } = render(
      <Quiz
        questions={sampleQuestions}
        practiceNumber={1}
        onComplete={() => {}}
      />,
    )

    // 不正解（インデックス0）を選択
    await press(stdin, KEYS.ENTER)

    expect(lastFrame()).toContain('不正解')
    expect(lastFrame()).toContain('Arrangeはテストの前準備')
  })

  it('全問回答後にonCompleteが呼ばれる', async () => {
    const handleComplete = vi.fn()
    const { stdin } = render(
      <Quiz
        questions={sampleQuestions}
        practiceNumber={1}
        onComplete={handleComplete}
      />,
    )

    // 1問目: 正解（インデックス1）
    await press(stdin, KEYS.DOWN)
    await press(stdin, KEYS.ENTER)
    // フィードバック後にEnterで次へ
    await press(stdin, KEYS.ENTER)

    // 2問目: 正解（インデックス1）
    await press(stdin, KEYS.DOWN)
    await press(stdin, KEYS.ENTER)
    // フィードバック後にEnterで完了
    await press(stdin, KEYS.ENTER)

    expect(handleComplete).toHaveBeenCalledWith({ score: 2, total: 2 })
  })

  it('問題番号が表示される', () => {
    const { lastFrame } = render(
      <Quiz
        questions={sampleQuestions}
        practiceNumber={1}
        onComplete={() => {}}
      />,
    )

    expect(lastFrame()).toContain('1 / 2')
  })
})
