import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import type { MenuAction } from '../types.js'
import { menuItems } from '../constants.js'

type MenuProps = {
  onSelect: (action: MenuAction) => void
}

export const Menu = ({ onSelect }: MenuProps) => {
  return (
    <Box flexDirection="column">
      <Text>QAmind へようこそ！</Text>
      <SelectInput
        items={menuItems}
        onSelect={(item) => onSelect(item.value)}
      />
    </Box>
  )
}
