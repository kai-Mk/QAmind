import { useState, useEffect } from 'react'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import { Menu } from './components/Menu.js'
import { PracticeSelect } from './components/PracticeSelect.js'
import { TextViewer } from './components/TextViewer.js'
import { useNavigation } from './hooks/useNavigation.js'
import { screenLabels } from './constants.js'

export const App = () => {
  const { screen, handleMenuSelect, goToMenu, goToTextViewer, goToQuiz } =
    useNavigation()

  const [textContent, setTextContent] = useState<string | null>(null)

  useEffect(() => {
    if (screen.type === 'text-viewer') {
      const filePath = join(
        process.cwd(),
        'practices',
        `practice${screen.practiceNumber}`,
        'TEXT.md',
      )
      readFile(filePath, 'utf-8')
        .then(setTextContent)
        .catch(() => setTextContent('テキストファイルが見つかりません。'))
    } else {
      setTextContent(null)
    }
  }, [screen])

  if (screen.type === 'menu') {
    return <Menu onSelect={handleMenuSelect} />
  }

  if (screen.type === 'practice-select') {
    return <PracticeSelect onSelect={goToTextViewer} onBack={goToMenu} />
  }

  if (screen.type === 'text-viewer') {
    if (textContent === null) {
      return <Text>読み込み中...</Text>
    }
    return (
      <TextViewer
        content={textContent}
        onProceed={() => goToQuiz(screen.practiceNumber)}
      />
    )
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
