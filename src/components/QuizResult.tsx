import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'

type QuizResultProps = {
  score: number
  total: number
  onExercise: () => void
  onMenu: () => void
}

export const QuizResult = ({
  score,
  total,
  onExercise,
  onMenu,
}: QuizResultProps) => {
  const percentage = Math.round((score / total) * 100)

  const items = [
    { label: '演習に進む', value: 'exercise' as const },
    { label: 'メニューに戻る', value: 'menu' as const },
  ]

  return (
    <Box flexDirection="column">
      <Text bold>結果サマリー</Text>
      <Box marginTop={1}>
        <Text>
          {score} / {total} 問正解（{percentage}%）
        </Text>
      </Box>
      <Box marginTop={1}>
        <SelectInput
          items={items}
          onSelect={(item) => {
            if (item.value === 'exercise') {
              onExercise()
            } else {
              onMenu()
            }
          }}
        />
      </Box>
    </Box>
  )
}
