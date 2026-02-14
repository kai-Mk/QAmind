import { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import SelectInput from 'ink-select-input'
import type { WrongAnswer } from '../types.js'

type WrongAnswerReviewProps = {
  wrongAnswers: Record<string, WrongAnswer[]>
  onBack: () => void
}

type ReviewItem = {
  practiceKey: string
  entry: WrongAnswer
}

export const WrongAnswerReview = ({
  wrongAnswers,
  onBack,
}: WrongAnswerReviewProps) => {
  const allItems: ReviewItem[] = Object.entries(wrongAnswers).flatMap(
    ([key, entries]) => entries.map((entry) => ({ practiceKey: key, entry })),
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<{
    correct: boolean
    correctAnswer: string
  } | null>(null)
  const [finished, setFinished] = useState(false)

  useInput((_input, key) => {
    if (feedback && key.return) {
      const nextIndex = currentIndex + 1
      if (nextIndex >= allItems.length) {
        setFinished(true)
        setFeedback(null)
      } else {
        setCurrentIndex(nextIndex)
        setFeedback(null)
      }
    }
  })

  if (allItems.length === 0) {
    return (
      <Box flexDirection="column">
        <Text>間違えた問題はありません</Text>
        <Box marginTop={1}>
          <SelectInput
            items={[{ label: 'メニューに戻る', value: 'back' }]}
            onSelect={onBack}
          />
        </Box>
      </Box>
    )
  }

  if (finished) {
    return (
      <Box flexDirection="column">
        <Text bold>復習完了</Text>
        <Box marginTop={1}>
          <Text>
            {score} / {allItems.length} 問正解
          </Text>
        </Box>
        <Box marginTop={1}>
          <SelectInput
            items={[{ label: 'メニューに戻る', value: 'back' }]}
            onSelect={onBack}
          />
        </Box>
      </Box>
    )
  }

  const current = allItems[currentIndex]
  const options = [current.entry.correctAnswer, current.entry.selectedAnswer]
    .sort()
    .map((opt, i) => ({ label: opt, value: i }))

  return (
    <Box flexDirection="column">
      <Text>
        復習 {currentIndex + 1} / {allItems.length}
      </Text>
      <Box marginTop={1}>
        <Text bold>{current.entry.question}</Text>
      </Box>

      {feedback ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color={feedback.correct ? 'green' : 'red'}>
            {feedback.correct ? '✓ 正解！' : '✗ 不正解'}
          </Text>
          <Text>正解: {feedback.correctAnswer}</Text>
          <Box marginTop={1}>
            <Text color="cyan">Enter キーで次へ</Text>
          </Box>
        </Box>
      ) : (
        <Box marginTop={1}>
          <SelectInput
            items={options}
            onSelect={(item) => {
              const selectedText = item.label
              const correct = selectedText === current.entry.correctAnswer
              if (correct) {
                setScore((s) => s + 1)
              }
              setFeedback({
                correct,
                correctAnswer: current.entry.correctAnswer,
              })
            }}
          />
        </Box>
      )}
    </Box>
  )
}
