import { useState } from 'react'
import type { MenuAction, Screen } from '../types.js'
import { getFirstIncomplete } from '../utils/progress.js'

export const useNavigation = () => {
  const [screen, setScreen] = useState<Screen>({ type: 'menu' })

  const handleMenuSelect = async (action: MenuAction) => {
    switch (action) {
      case 'start':
        setScreen({ type: 'text-viewer', practiceNumber: 1 })
        break
      case 'resume': {
        const next = await getFirstIncomplete()
        setScreen({ type: 'text-viewer', practiceNumber: next ?? 1 })
        break
      }
      case 'select':
        setScreen({ type: 'practice-select' })
        break
      case 'review':
        setScreen({ type: 'wrong-answer-review' })
        break
    }
  }

  const goToMenu = () => setScreen({ type: 'menu' })

  const goToTextViewer = (practiceNumber: number) =>
    setScreen({ type: 'text-viewer', practiceNumber })

  const goToQuiz = (practiceNumber: number) =>
    setScreen({ type: 'quiz', practiceNumber })

  const goToQuizResult = (
    practiceNumber: number,
    score: number,
    total: number,
  ) => setScreen({ type: 'quiz-result', practiceNumber, score, total })

  const goToExercise = (practiceNumber: number) =>
    setScreen({ type: 'exercise', practiceNumber })

  return {
    screen,
    handleMenuSelect,
    goToMenu,
    goToTextViewer,
    goToQuiz,
    goToQuizResult,
    goToExercise,
  }
}
