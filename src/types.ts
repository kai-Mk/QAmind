export type Screen =
  | { type: 'menu' }
  | { type: 'text-viewer'; practiceNumber: number }
  | { type: 'quiz'; practiceNumber: number }
  | { type: 'quiz-result'; practiceNumber: number }
  | { type: 'exercise'; practiceNumber: number }
  | { type: 'practice-select' }
  | { type: 'wrong-answer-review' }

export type MenuAction = 'start' | 'resume' | 'select' | 'review'
