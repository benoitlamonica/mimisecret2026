import { computed, onBeforeUnmount, ref } from 'vue'
import { drawSpecialBooster } from '@/config/booster'
import { useAdventCalendar } from '@/composables/useAdventCalendar'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useShop } from '@/composables/useShop'
import type { Card } from '@/data/cards'

interface ShuffleCardsProgress {
  completedDays: number[]
}

const SHUFFLE_DURATION_MS = 1800

export function useShuffleCardsGame() {
  const { unlockedDays } = useAdventCalendar()
  const { collectCard } = useShop()
  const { value: progress } = useLocalStorage<ShuffleCardsProgress>('mimi-shuffle-cards-progress', { completedDays: [] })
  const cards = ref<Card[]>([])
  const selectedCard = ref<Card | null>(null)
  const isOpen = ref(false)
  const isShuffling = ref(false)
  const hasShuffled = ref(false)
  let shuffleTimeout: ReturnType<typeof setTimeout> | undefined

  const completedDays = computed(() => (
    Array.isArray(progress.value.completedDays) ? progress.value.completedDays : []
  ))
  const availableGames = computed(() => Math.max(0, unlockedDays.value - completedDays.value.length))

  function clearShuffleTimeout() {
    if (shuffleTimeout) clearTimeout(shuffleTimeout)
    shuffleTimeout = undefined
  }

  function startGame() {
    if (isOpen.value || availableGames.value <= 0) return

    cards.value = drawSpecialBooster()
    selectedCard.value = null
    isOpen.value = true
    isShuffling.value = false
    hasShuffled.value = false
    clearShuffleTimeout()
  }

  function shuffle() {
    if (!isOpen.value || isShuffling.value || hasShuffled.value) return

    isShuffling.value = true
    shuffleTimeout = setTimeout(() => {
      isShuffling.value = false
      hasShuffled.value = true
      shuffleTimeout = undefined
    }, SHUFFLE_DURATION_MS)
  }

  function selectCard(card: Card) {
    if (isShuffling.value || selectedCard.value) return

    selectedCard.value = card
    collectCard(card)
    const day = Array.from({ length: unlockedDays.value }, (_, index) => index + 1)
      .find((candidate) => !completedDays.value.includes(candidate))
    if (!day) return

    progress.value = {
      completedDays: [...completedDays.value, day],
    }
  }

  function close() {
    if (isShuffling.value || !selectedCard.value) return
    isOpen.value = false
    cards.value = []
    selectedCard.value = null
    hasShuffled.value = false
  }

  onBeforeUnmount(clearShuffleTimeout)

  return {
    availableGames,
    cards,
    close,
    hasShuffled,
    isOpen,
    isShuffling,
    selectedCard,
    selectCard,
    shuffle,
    startGame,
  }
}
