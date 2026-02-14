import { useState } from 'react'
import { Box, Text, useInput } from 'ink'
import SelectInput from 'ink-select-input'
import type { Question, WrongAnswer } from '../types.js'

type QuizProps = {
  questions: Question[]
  practiceNumber: number
  onComplete: (result: { score: number; total: number }) => void
  onWrongAnswer?: (entry: Omit<WrongAnswer, 'answeredAt'>) => void
}

export const Quiz = ({ questions, onComplete, onWrongAnswer }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<{
    correct: boolean
    explanation: string
  } | null>(null)

  const current = questions[currentIndex]

  useInput((_input, key) => {
    if (feedback && key.return) {
      const nextIndex = currentIndex + 1
      if (nextIndex >= questions.length) {
        onComplete({ score, total: questions.length })
      } else {
        setCurrentIndex(nextIndex)
        setFeedback(null)
      }
    }
  })

  if (!current) return null

  const items = current.options.map((option, i) => ({
    label: option,
    value: i,
  }))

  return (
    <Box flexDirection="column">
      <Text>
        問題 {currentIndex + 1} / {questions.length}
      </Text>
      <Box marginTop={1}>
        <Text bold>{current.question}</Text>
      </Box>

      {feedback ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color={feedback.correct ? 'green' : 'red'}>
            {feedback.correct ? '✓ 正解！' : '✗ 不正解'}
          </Text>
          <Box marginTop={1}>
            <Text>{current.explanation}</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="cyan">Enter キーで次へ</Text>
          </Box>
        </Box>
      ) : (
        <Box marginTop={1}>
          <SelectInput
            items={items}
            onSelect={(item) => {
              const correct = item.value === current.answer
              if (correct) {
                setScore((s) => s + 1)
              } else {
                onWrongAnswer?.({
                  questionIndex: currentIndex,
                  question: current.question,
                  selectedAnswer: current.options[item.value],
                  correctAnswer: current.options[current.answer],
                })
              }
              setFeedback({ correct, explanation: current.explanation })
            }}
          />
        </Box>
      )}
    </Box>
  )
}
