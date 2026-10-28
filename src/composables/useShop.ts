import { cards, type Card, type Rarity } from '@/data/cards'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { CARD_COST_BY_RARITY, EXTRAORDINARY_CARD_COST, usePoints } from '@/composables/usePoints'

export function useShop() {
  const { value: collection } = useLocalStorage<Card[]>('mimi-secret-collection', [])
  const { spendPoints } = usePoints()

  function getCardCost(rarity: Rarity) {
    if (rarity === 'Extraordinaire') return null
    return CARD_COST_BY_RARITY[rarity]
  }

  function buyCard(card: Card) {
    const cost = getCardCost(card.rarity)
    if (cost === null || !spendPoints(cost)) return false

    collection.value = [...collection.value, card]
    return true
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
    buyRandomExtraordinaryCard,
    getOwnedCount: (card: Card) => collection.value.filter((ownedCard) => ownedCard.id === card.id).length,
    getCardCost,
  }
}
