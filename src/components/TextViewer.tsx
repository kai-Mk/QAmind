import { Box, Text, useInput } from 'ink'
import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'

type TextViewerProps = {
  content: string
  onProceed: () => void
}

export const TextViewer = ({ content, onProceed }: TextViewerProps) => {
  marked.use(markedTerminal() as Parameters<typeof marked.use>[0])
  const rendered = marked.parse(content) as string

  useInput((_input, key) => {
    if (key.return) {
      onProceed()
    }
  })

  return (
    <Box flexDirection="column">
      <Text>{rendered.trimEnd()}</Text>
      <Box marginTop={1}>
        <Text color="cyan">Enter キーで問題に進む</Text>
      </Box>
    </Box>
  )
}
