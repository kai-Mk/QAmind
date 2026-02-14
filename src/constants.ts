import type { MenuAction } from './types.js'

export const menuItems: { label: string; value: MenuAction }[] = [
  { label: '最初から学習する', value: 'start' },
  { label: '途中から再開する', value: 'resume' },
  { label: 'プラクティスを選択する', value: 'select' },
  { label: '間違えた問題を復習する', value: 'review' },
]

export const screenLabels: Record<string, string> = {
  'text-viewer': 'テキスト表示',
  quiz: '選択問題',
  'quiz-result': '結果サマリー',
  exercise: '演習',
  'practice-select': 'プラクティス選択',
  'wrong-answer-review': '間違えた問題の復習',
}
