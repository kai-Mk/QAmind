import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import { practiceTitles, TOTAL_PRACTICES } from '../constants.js'

type PracticeSelectProps = {
  onSelect: (practiceNumber: number) => void
  onBack: () => void
}

export const PracticeSelect = ({ onSelect, onBack }: PracticeSelectProps) => {
  const items = [
    ...Array.from({ length: TOTAL_PRACTICES }, (_, i) => ({
      label: `Practice ${i + 1}: ${practiceTitles[i + 1]}`,
      value: i + 1,
    })),
    { label: 'メニューに戻る', value: 0 },
  ]

  return (
    <Box flexDirection="column">
      <Text>プラクティスを選択してください</Text>
      <SelectInput
        items={items}
        onSelect={(item) => {
          if (item.value === 0) {
            onBack()
          } else {
            onSelect(item.value)
          }
        }}
      />
    </Box>
  )
}
