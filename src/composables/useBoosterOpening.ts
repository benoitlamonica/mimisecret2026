import { onBeforeUnmount, ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { Card, Rarity } from '@/data/cards'
import { drawBooster } from '@/utils/booster'

export function useBoosterOpening(cardPool: Card[]) {
  const boosterCards = ref<Card[]>([])
  const revealedCards = ref<Set<number>>(new Set())
  const isOpening = ref(false)
  const boosterPhase = ref<'pack' | 'cards'>('pack')
  const isCutting = ref(false)
  const { value: collection } = useLocalStorage<Card[]>('mimi-secret-collection', [])
  let cutTimeout: ReturnType<typeof setTimeout> | undefined

  function openBooster() {
    if (isOpening.value) return

    boosterCards.value = drawBooster(cardPool)
    collection.value = [...collection.value, ...boosterCards.value]
    revealedCards.value = new Set()
    boosterPhase.value = 'pack'
    isCutting.value = false
    isOpening.value = true
  }

  function cutBooster() {
    if (isCutting.value) return

    isCutting.value = true
    cutTimeout = setTimeout(() => {
      boosterPhase.value = 'cards'
      isCutting.value = false
      cutTimeout = undefined
    }, 850)
  }

  function revealCard(index: number) {
    if (boosterPhase.value !== 'cards' || revealedCards.value.has(index)) return

    revealedCards.value = new Set(revealedCards.value).add(index)
  }

  function isCardRevealed(index: number) {
    return revealedCards.value.has(index)
  }

  function closeBooster() {
    if (revealedCards.value.size === boosterCards.value.length) {
      isOpening.value = false
    }
  }

  function rarityEffect(rarity: Rarity) {
    return {
      Commun: 'effect-common',
      Rare: 'effect-rare',
      Épique: 'effect-epic',
      Légendaire: 'effect-legendary',
      Extraordinaire: 'effect-extraordinary',
    }[rarity]
  }

  onBeforeUnmount(() => {
    if (cutTimeout) clearTimeout(cutTimeout)
  })

  return {
    boosterCards,
    boosterPhase,
    closeBooster,
    cutBooster,
    isCardRevealed,
    isCutting,
    isOpening,
    openBooster,
    rarityEffect,
    revealCard,
    revealedCards,
  }
}
