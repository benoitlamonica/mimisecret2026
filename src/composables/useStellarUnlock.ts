import { ref } from 'vue'
import type { Card } from '@/data/cards'

const unlockedCard = ref<Card | null>(null)

export function notifyStellarUnlock(card: Card) {
  unlockedCard.value = card
}

export function useStellarUnlock() {
  return {
    unlockedCard,
  }
}
