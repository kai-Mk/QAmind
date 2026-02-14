import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import { Menu } from './components/Menu.js'
import { useNavigation } from './hooks/useNavigation.js'
import { screenLabels } from './constants.js'

export const App = () => {
  const { screen, handleMenuSelect, goToMenu } = useNavigation()

  if (screen.type === 'menu') {
    return <Menu onSelect={handleMenuSelect} />
  }

  // 未実装画面のプレースホルダー
  return (
    <Box flexDirection="column">
      <Text>{screenLabels[screen.type] ?? screen.type}</Text>
      <SelectInput
        items={[{ label: 'メニューに戻る', value: 'back' }]}
        onSelect={goToMenu}
      />
    </Box>
  )
}
