import { computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import type { Rarity } from '@/data/cards'

export const MIMI_POINTS_PER_CORRECT_ANSWER = 20
export const CLASSIC_BOOSTER_COST = 30
export const SPECIAL_BOOSTER_COST = 100
export const EXTRAORDINARY_CARD_COST = 500
export const CARD_COST_BY_RARITY: Record<Exclude<Rarity, 'Extraordinaire' | 'Stellaire'>, number> = {
  Commun: 5,
  Rare: 15,
  Épique: 50,
  Légendaire: 100,
}
const { value: points } = useLocalStorage<number>('mimi-points', 0)

export function usePoints() {
  const canAfford = (cost: number) => computed(() => points.value >= cost)

  function addPoints(amount: number) {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new Error(`Le nombre de points à ajouter est invalide : ${amount}`)
    }

    points.value += amount
  }

  function spendPoints(amount: number) {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(`Le coût doit être supérieur à zéro : ${amount}`)
    }
    if (points.value < amount) return false

    points.value -= amount
    return true
  }

  return {
    points,
    canAfford,
    addPoints,
    spendPoints,
  }
}
