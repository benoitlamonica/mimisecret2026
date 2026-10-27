import { onBeforeUnmount, ref } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { Card, Rarity } from '@/data/cards'
import { drawBooster } from '@/config/booster'

export function useBoosterOpening() {
  const boosterCards = ref<Card[]>([])
  const revealedCards = ref<Set<number>>(new Set())
  const isOpening = ref(false)
  const boosterPhase = ref<'pack' | 'cards'>('pack')
  const isCutting = ref(false)
  const isDraggingPack = ref(false)
  const packDragProgress = ref(0)
  const { value: collection } = useLocalStorage<Card[]>('mimi-secret-collection', [])
  let cutTimeout: ReturnType<typeof setTimeout> | undefined
  let dragStartX = 0

  function openBooster() {
    if (isOpening.value) return

    boosterCards.value = drawBooster()
    collection.value = [...collection.value, ...boosterCards.value]
    revealedCards.value = new Set()
    boosterPhase.value = 'pack'
    isCutting.value = false
    isDraggingPack.value = false
    packDragProgress.value = 0
    isOpening.value = true
  }

  function startPackDrag(clientX: number) {
    if (boosterPhase.value !== 'pack' || isCutting.value) return

    dragStartX = clientX
    isDraggingPack.value = true
  }

  function movePackDrag(clientX: number) {
    if (!isDraggingPack.value) return

    packDragProgress.value = Math.min(100, Math.abs(clientX - dragStartX) / 1.2)
  }

  function endPackDrag() {
    if (!isDraggingPack.value) return

    isDraggingPack.value = false
    if (packDragProgress.value >= 100) {
      cutBooster()
    } else {
      packDragProgress.value = 0
    }
  }

  function cutBooster() {
    if (isCutting.value) return

    isCutting.value = true
    packDragProgress.value = 100
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
    isDraggingPack,
    movePackDrag,
    isOpening,
    openBooster,
    packDragProgress,
    rarityEffect,
    revealCard,
    revealedCards,
    startPackDrag,
    endPackDrag,
  }
}
