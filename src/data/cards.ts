export type Rarity = 'Commun' | 'Rare' | 'Épique' | 'Légendaire'

export interface Card {
  id: string
  name: string
  rarity: Rarity
  type: string
  description: string
  power: string
  accent: string
  symbol: string
}

export const cardsExemple: Card[] = [
  {
    id: 'flocon-veille',
    name: 'Flocon de veille',
    rarity: 'Commun',
    type: 'Charme hivernal',
    description: 'Un souffle glacé qui garde les nuits de décembre bien au chaud.',
    power: 'Givre doux',
    accent: 'ice',
    symbol: '✦',
  },
  {
    id: 'renard-nocturne',
    name: 'Renard nocturne',
    rarity: 'Rare',
    type: 'Gardien de la forêt',
    description: 'Il connaît chaque chemin secret menant jusqu’au sapin illuminé.',
    power: 'Pas feutrés',
    accent: 'blue',
    symbol: '◆',
  },
  {
    id: 'bal-des-luciole',
    name: 'Bal des lucioles',
    rarity: 'Épique',
    type: 'Merveille céleste',
    description: 'Une constellation vivante danse entre les branches enneigées.',
    power: 'Éclat astral',
    accent: 'violet',
    symbol: '✧',
  },
  {
    id: 'etoile-polaire',
    name: 'Étoile polaire',
    rarity: 'Légendaire',
    type: 'Relique du solstice',
    description: 'La lumière qui guide les cœurs sincères vers le plus beau des cadeaux.',
    power: 'Lumière éternelle',
    accent: 'gold',
    symbol: '★',
  },
]

export const cards: Card[] = [
  {
    id: 'flocon-veille',
    name: 'Flocon de veille',
    rarity: 'Commun',
    type: 'Charme hivernal',
    description: 'Un souffle glacé qui garde les nuits de décembre bien au chaud.',
    power: 'Givre doux',
    accent: 'ice',
    symbol: '✦',
  },
  {
    id: 'renard-nocturne',
    name: 'Renard nocturne',
    rarity: 'Rare',
    type: 'Gardien de la forêt',
    description: 'Il connaît chaque chemin secret menant jusqu’au sapin illuminé.',
    power: 'Pas feutrés',
    accent: 'blue',
    symbol: '◆',
  },
  {
    id: 'bal-des-luciole',
    name: 'Bal des lucioles',
    rarity: 'Épique',
    type: 'Merveille céleste',
    description: 'Une constellation vivante danse entre les branches enneigées.',
    power: 'Éclat astral',
    accent: 'violet',
    symbol: '✧',
  },
  {
    id: 'etoile-polaire',
    name: 'Étoile polaire',
    rarity: 'Légendaire',
    type: 'Relique du solstice',
    description: 'La lumière qui guide les cœurs sincères vers le plus beau des cadeaux.',
    power: 'Lumière éternelle',
    accent: 'gold',
    symbol: '★',
  },
]

export const rarityDetails: Array<{ name: Rarity; description: string; color: string }> = [
  { name: 'Commun', description: 'Les petites merveilles du quotidien', color: 'common' },
  { name: 'Rare', description: 'Des compagnons qu’on n’oublie pas', color: 'rare' },
  { name: 'Épique', description: 'Des histoires vraiment extraordinaires', color: 'epic' },
  { name: 'Légendaire', description: 'Une magie que l’on ne voit qu’une fois', color: 'legendary' },
]
