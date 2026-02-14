import { useState } from 'react'
import type { MenuAction, Screen } from '../types.js'

export const useNavigation = () => {
  const [screen, setScreen] = useState<Screen>({ type: 'menu' })

  const handleMenuSelect = (action: MenuAction) => {
    switch (action) {
      case 'start':
        setScreen({ type: 'text-viewer', practiceNumber: 1 })
        break
      case 'resume':
        // TODO: progress.json から未完了プラクティスを特定する（Phase 3）
        setScreen({ type: 'text-viewer', practiceNumber: 1 })
        break
      case 'select':
        setScreen({ type: 'practice-select' })
        break
      case 'review':
        setScreen({ type: 'wrong-answer-review' })
        break
    }
  }

  const goToMenu = () => setScreen({ type: 'menu' })

  return { screen, handleMenuSelect, goToMenu }
}
