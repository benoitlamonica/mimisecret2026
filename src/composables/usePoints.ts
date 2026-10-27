import { computed } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

export const MIMI_POINTS_PER_CORRECT_ANSWER = 10
export const CLASSIC_BOOSTER_COST = 30
export const SPECIAL_BOOSTER_COST = 100
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
