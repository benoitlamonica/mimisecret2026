import type { Card, Rarity } from '@/data/cards'
import { cards } from '@/data/cards'

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

const SPECIAL_RARITIES: Array<{ rarity: Rarity; threshold: number }> = [
  { rarity: 'Extraordinaire', threshold: 20 },
  { rarity: 'Légendaire', threshold: 50 },
  { rarity: 'Épique', threshold: 100 },
]

function chooseRarity(guaranteedRare: boolean, specialBooster?: boolean): Rarity {
  const table = specialBooster ? SPECIAL_RARITIES : guaranteedRare ? GUARANTEED_RARITIES : STANDARD_RARITIES
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

export function drawBooster(): Card[] {
  if (cards.length === 0) {
    throw new Error('Impossible d’ouvrir un booster : le catalogue est vide.')
  }

  return Array.from({ length: 5 }, (_, index) => {
    const rarity = chooseRarity(index === 4)
    return chooseCard(cards, rarity)
  })
}

export function drawSpecialBooster(): Card[] {
  if (cards.length === 0) {
    throw new Error('Impossible d’ouvrir un booster spécial : le catalogue est vide.')
  }

  return Array.from({ length: 5 }, () => {
    const rarity = chooseRarity(false, true)
    return chooseCard(cards, rarity)
  })
}
