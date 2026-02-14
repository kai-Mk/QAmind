import { useState } from 'react'
import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import { practiceTitles } from '../constants.js'
import { runPracticeTest } from '../utils/testRunner.js'
import { updateStatus } from '../utils/progress.js'

type ExerciseProps = {
  practiceNumber: number
  onMenu: () => void
}

const ADVANCED_START = 8

export const Exercise = ({ practiceNumber, onMenu }: ExerciseProps) => {
  const [testOutput, setTestOutput] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)

  const isAdvanced = practiceNumber >= ADVANCED_START
  const title = practiceTitles[practiceNumber] ?? `Practice ${practiceNumber}`

  const items = [
    { label: 'テストをチェックする', value: 'check' as const },
    ...(isAdvanced
      ? [
          {
            label: 'レビューを依頼する',
            value: 'review' as const,
          },
        ]
      : []),
    { label: 'メニューに戻る', value: 'menu' as const },
  ]

  const handleSelect = async (item: { value: string }) => {
    if (item.value === 'check') {
      setRunning(true)
      setTestOutput(null)
      const result = await runPracticeTest(practiceNumber)
      setTestOutput(result.output)
      setRunning(false)

      if (result.success) {
        await updateStatus(practiceNumber, 'completed')
        setCompleted(true)
      }
    } else if (item.value === 'review') {
      setTestOutput(
        'レビューを依頼するには、Claude Code で /test-review ' +
          practiceNumber +
          ' を実行してください。',
      )
    } else {
      onMenu()
    }
  }

  return (
    <Box flexDirection="column">
      <Text bold>
        Practice {practiceNumber}: {title}
      </Text>
      <Text>演習中 - target.test.ts を編集してください</Text>

      {running && (
        <Box marginTop={1}>
          <Text color="yellow">テスト実行中...</Text>
        </Box>
      )}

      {testOutput && (
        <Box flexDirection="column" marginTop={1}>
          <Text>{testOutput}</Text>
        </Box>
      )}

      {completed && (
        <Box marginTop={1}>
          <Text color="green">演習完了！</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <SelectInput items={items} onSelect={handleSelect} />
      </Box>
    </Box>
  )
}
