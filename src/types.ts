export type Screen =
  | { type: 'menu' }
  | { type: 'text-viewer'; practiceNumber: number }
  | { type: 'quiz'; practiceNumber: number }
  | { type: 'quiz-result'; practiceNumber: number }
  | { type: 'exercise'; practiceNumber: number }
  | { type: 'practice-select' }
  | { type: 'wrong-answer-review' }

export type MenuAction = 'start' | 'resume' | 'select' | 'review'

export type PracticeStatus = 'not_started' | 'in_progress' | 'completed'

export type PracticeProgress = {
  status: PracticeStatus
  reviewCount?: number
  completedAt?: string
}

export type ProgressData = Record<string, PracticeProgress>

export type WrongAnswer = {
  questionIndex: number
  question: string
  selectedAnswer: string
  correctAnswer: string
  answeredAt: string
}

export type WrongAnswersData = Record<string, WrongAnswer[]>

export type TestResult = {
  success: boolean
  output: string
}
