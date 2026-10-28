import { watch } from 'vue'
import { cards, type Card, type Rarity } from '@/data/cards'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { CARD_COST_BY_RARITY, EXTRAORDINARY_CARD_COST, usePoints } from '@/composables/usePoints'
import { notifyStellarUnlock } from '@/composables/useStellarUnlock'

export const DUPLICATE_SALE_VALUE_BY_RARITY: Record<Rarity, number> = {
  Commun: 2,
  Rare: 10,
  Épique: 25,
  Légendaire: 100,
  Extraordinaire: 500,
  Stellaire: 500,
}

export function useShop() {
  const { value: collection } = useLocalStorage<Card[]>('mimi-secret-collection', [])
  const { addPoints, spendPoints } = usePoints()
  const stellarCard = cards.find((card) => card.rarity === 'Stellaire')
  const collectibleCards = cards.filter((card) => card.rarity !== 'Stellaire')

  function unlockStellarCard() {
    if (
      stellarCard
      && !collection.value.some((card) => card.id === stellarCard.id)
      && collectibleCards.every((card) => collection.value.some((ownedCard) => ownedCard.id === card.id))
    ) {
      collection.value = [...collection.value, stellarCard]
      notifyStellarUnlock(stellarCard)
    }
  }

  watch(collection, unlockStellarCard, { deep: true, immediate: true })

  function getCardCost(rarity: Rarity) {
    if (rarity === 'Extraordinaire' || rarity === 'Stellaire') return null
    return CARD_COST_BY_RARITY[rarity]
  }

  function buyCard(card: Card) {
    const cost = getCardCost(card.rarity)
    if (cost === null || !spendPoints(cost)) return false

    collection.value = [...collection.value, card]
    return true
  }

  function collectCard(card: Card) {
    collection.value = [...collection.value, card]
  }

  function getDuplicateSaleSummary() {
    const seen = new Set<string>()
    let count = 0
    let value = 0

    for (const card of collection.value) {
      if (seen.has(card.id)) {
        count += 1
        value += DUPLICATE_SALE_VALUE_BY_RARITY[card.rarity]
      } else {
        seen.add(card.id)
      }
    }

    return { count, value }
  }

  function sellDuplicates() {
    const seen = new Set<string>()
    const keptCards: Card[] = []
    let value = 0

    for (const card of collection.value) {
      if (seen.has(card.id)) {
        value += DUPLICATE_SALE_VALUE_BY_RARITY[card.rarity]
      } else {
        seen.add(card.id)
        keptCards.push(card)
      }
    }

    if (value === 0) return 0

    collection.value = keptCards
    addPoints(value)
    return value
  }

  function buyRandomExtraordinaryCard() {
    const extraordinaryCards = cards.filter((card) => card.rarity === 'Extraordinaire')
    if (extraordinaryCards.length === 0) {
      throw new Error('Impossible d’acheter une carte extraordinaire : aucune carte disponible.')
    }
    if (!spendPoints(EXTRAORDINARY_CARD_COST)) return null

    const card = extraordinaryCards[Math.floor(Math.random() * extraordinaryCards.length)]
    if (!card) throw new Error('Impossible de sélectionner la carte extraordinaire.')

    collection.value = [...collection.value, card]
    return card
  }

  return {
    buyCard,
    collectCard,
    buyRandomExtraordinaryCard,
    getOwnedCount: (card: Card) => collection.value.filter((ownedCard) => ownedCard.id === card.id).length,
    getCardCost,
    collection,
    getDuplicateSaleSummary,
    sellDuplicates,
  }
}
