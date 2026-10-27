import type { Card, Rarity } from '@/data/cards'

const STANDARD_RARITIES: Array<{ rarity: Rarity; threshold: number }> = [
  { rarity: 'Extraordinaire', threshold: 0.1 },
  { rarity: 'Légendaire', threshold: 1.1 },
  { rarity: 'Épique', threshold: 6.1 },
  { rarity: 'Rare', threshold: 16.1 },
  { rarity: 'Commun', threshold: 100 },
]

const GUARANTEED_RARITIES: Array<{ rarity: Rarity; threshold: number }> = [
  { rarity: 'Extraordinaire', threshold: 1 },
  { rarity: 'Légendaire', threshold: 11 },
  { rarity: 'Épique', threshold: 46 },
  { rarity: 'Rare', threshold: 100 },
]

function chooseRarity(guaranteedRare: boolean): Rarity {
  const table = guaranteedRare ? GUARANTEED_RARITIES : STANDARD_RARITIES
  const roll = Math.random() * 100

  return table.find(({ threshold }) => roll < threshold)?.rarity ?? 'Commun'
}

function chooseCard(cards: Card[], rarity: Rarity): Card {
  const matchingCards = cards.filter((card) => card.rarity === rarity)
  const availableCards = matchingCards.length > 0 ? matchingCards : cards
  const card = availableCards[Math.floor(Math.random() * availableCards.length)]

  if (!card) {
    throw new Error('Impossible d’ouvrir un booster : aucune carte n’est disponible.')
  }

  return card
}

export function drawBooster(cards: Card[]): Card[] {
  if (cards.length === 0) {
    throw new Error('Impossible d’ouvrir un booster : le catalogue est vide.')
  }

  return Array.from({ length: 5 }, (_, index) => {
    const rarity = chooseRarity(index === 4)
    return chooseCard(cards, rarity)
  })
}
