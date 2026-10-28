import { cards, type Card, type Rarity } from '@/data/cards'

export const SCRATCH_TICKET_COST = 10
export type ScratchTicketType = 'banco' | 'carto'

export interface PointsScratchReward {
  kind: 'points'
  points: number
  label: string
  tone: 'nothing' | 'common' | 'rare' | 'epic' | 'legendary'
}

export interface CardScratchReward {
  kind: 'card'
  card: Card
  label: string
  tone: Lowercase<Rarity>
}

export type ScratchReward = PointsScratchReward | CardScratchReward

const bancoRewards: Array<PointsScratchReward & { weight: number }> = [
  { kind: 'points', points: 0, label: 'Rien cette fois', tone: 'nothing', weight: 60 },
  { kind: 'points', points: 10, label: 'Gain commun', tone: 'common', weight: 25 },
  { kind: 'points', points: 30, label: 'Gain rare', tone: 'rare', weight: 10 },
  { kind: 'points', points: 50, label: 'Gain très rare', tone: 'epic', weight: 3 },
  { kind: 'points', points: 100, label: 'Gain ultra rare', tone: 'legendary', weight: 1 },
  { kind: 'points', points: 200, label: 'Jackpot', tone: 'legendary', weight: 1 },
]

const cartoRewards: Array<{ rarity: Rarity; label: string; weight: number }> = [
  { rarity: 'Commun', label: 'Carte commune', weight: 50 },
  { rarity: 'Rare', label: 'Carte rare', weight: 30 },
  { rarity: 'Épique', label: 'Carte épique', weight: 10 },
  { rarity: 'Légendaire', label: 'Carte légendaire', weight: 6 },
  { rarity: 'Extraordinaire', label: 'Carte extraordinaire', weight: 4 },
]

function weightedPick<T extends { weight: number }>(rewards: T[]) {
  let roll = Math.random() * rewards.reduce((total, reward) => total + reward.weight, 0)
  return rewards.find((reward) => {
    roll -= reward.weight
    return roll < 0
  })
}

export function drawScratchReward(type: ScratchTicketType): ScratchReward {
  if (type === 'banco') {
    const reward = weightedPick(bancoRewards)
    if (!reward) throw new Error('Impossible de tirer le résultat du Banco Mimi.')
    return reward
  }

  const rarityReward = weightedPick(cartoRewards)
  if (!rarityReward) throw new Error('Impossible de tirer la rareté du Carto Mimi.')
  const matchingCards = cards.filter((card) => card.rarity === rarityReward.rarity)
  const card = matchingCards[Math.floor(Math.random() * matchingCards.length)]
  if (!card) throw new Error(`Aucune carte ${rarityReward.rarity} disponible pour le Carto Mimi.`)

  return {
    kind: 'card',
    card,
    label: rarityReward.label,
    tone: rarityReward.rarity.toLowerCase() as Lowercase<Rarity>,
  }
}
