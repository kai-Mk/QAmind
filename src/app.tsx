import { useState, useEffect } from 'react'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import { Menu } from './components/Menu.js'
import { PracticeSelect } from './components/PracticeSelect.js'
import { TextViewer } from './components/TextViewer.js'
import { Quiz } from './components/Quiz.js'
import { QuizResult } from './components/QuizResult.js'
import { WrongAnswerReview } from './components/WrongAnswerReview.js'
import { useNavigation } from './hooks/useNavigation.js'
import { screenLabels } from './constants.js'
import type { Question, WrongAnswersData } from './types.js'
import { addWrongAnswer, loadWrongAnswers } from './utils/wrongAnswers.js'

export const App = () => {
  const {
    screen,
    handleMenuSelect,
    goToMenu,
    goToTextViewer,
    goToQuiz,
    goToQuizResult,
    goToExercise,
  } = useNavigation()

  const [textContent, setTextContent] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [wrongAnswersData, setWrongAnswersData] =
    useState<WrongAnswersData | null>(null)

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

    if (screen.type === 'quiz') {
      const filePath = join(
        process.cwd(),
        'practices',
        `practice${screen.practiceNumber}`,
        'questions.json',
      )
      readFile(filePath, 'utf-8')
        .then((raw) => {
          const data = JSON.parse(raw) as { questions: Question[] }
          setQuestions(data.questions)
        })
        .catch(() => setQuestions([]))
    } else {
      setQuestions(null)
    }

    if (screen.type === 'wrong-answer-review') {
      loadWrongAnswers().then(setWrongAnswersData)
    } else {
      setWrongAnswersData(null)
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

  if (screen.type === 'quiz') {
    if (questions === null) {
      return <Text>読み込み中...</Text>
    }
    return (
      <Quiz
        questions={questions}
        practiceNumber={screen.practiceNumber}
        onComplete={async ({ score, total }) => {
          goToQuizResult(screen.practiceNumber, score, total)
        }}
        onWrongAnswer={async (entry) => {
          await addWrongAnswer(screen.practiceNumber, {
            ...entry,
            answeredAt: new Date().toISOString(),
          })
        }}
      />
    )
  }

  if (screen.type === 'quiz-result') {
    return (
      <QuizResult
        score={screen.score}
        total={screen.total}
        onExercise={() => goToExercise(screen.practiceNumber)}
        onMenu={goToMenu}
      />
    )
  }

  if (screen.type === 'wrong-answer-review') {
    if (wrongAnswersData === null) {
      return <Text>読み込み中...</Text>
    }
    return (
      <WrongAnswerReview wrongAnswers={wrongAnswersData} onBack={goToMenu} />
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
