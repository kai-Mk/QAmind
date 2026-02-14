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

export const practiceTitles: Record<number, string> = {
  1: 'テストの基本構造（AAAパターン）',
  2: '境界値分析',
  3: '同値分割',
  4: '異常系・例外テスト',
  5: '状態を持つもののテスト',
  6: 'モック・スタブの使い方',
  7: '結合テストの役割',
  8: '要件からのテスト設計',
  9: '単体/結合の責務分担',
  10: 'AI生成コードに対するテスト設計',
}

export const TOTAL_PRACTICES = 10
