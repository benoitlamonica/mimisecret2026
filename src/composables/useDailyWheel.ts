import { computed } from 'vue'
import { useAdventCalendar } from '@/composables/useAdventCalendar'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { usePoints } from '@/composables/usePoints'

export interface WheelReward {
  points: number
  weight: number
  label: string
}

export const wheelRewards: WheelReward[] = [
  { points: 0, weight: 1, label: 'Très rare' },
  { points: 10, weight: 10, label: 'Peu commun' },
  { points: 20, weight: 56, label: 'Commun' },
  { points: 30, weight: 25, label: 'Rare' },
  { points: 50, weight: 10, label: 'Très rare' },
  { points: 100, weight: 5, label: 'Jackpot' },
]
export const wheelTotalWeight = wheelRewards.reduce((total, reward) => total + reward.weight, 0)
const displayCounts = [1, 1, 6, 3, 1, 1]
const maxDisplayCount = Math.max(...displayCounts)
export const wheelSegments = Array.from({ length: maxDisplayCount }, (_, round) => (
  wheelRewards.filter((_, rewardIndex) => (displayCounts[rewardIndex] ?? 1) > round)
)).flat()
export const wheelSegmentCount = wheelSegments.length

interface WheelProgress {
  spunDays?: number[]
  lastSpinDate?: string | null
}

export function useDailyWheel() {
  const { value: progress } = useLocalStorage<WheelProgress>('mimi-wheel-progress', { lastSpinDate: null })
  const { unlockedDays } = useAdventCalendar()
  const { addPoints } = usePoints()
  const spunDays = computed(() => {
    if (Array.isArray(progress.value.spunDays)) {
      return [...new Set(progress.value.spunDays.filter((day) => day >= 1 && day <= unlockedDays.value))]
    }

    return progress.value.lastSpinDate && unlockedDays.value > 0 ? [1] : []
  })
  const availableSpins = computed(() => Math.max(0, unlockedDays.value - spunDays.value.length))
  const canSpin = computed(() => availableSpins.value > 0)

  function spin() {
    if (!canSpin.value) return null

    let roll = Math.random() * wheelTotalWeight
    const reward = wheelRewards.find((candidate) => {
      roll -= candidate.weight
      return roll < 0
    })

    if (!reward) throw new Error('Impossible de sélectionner une récompense de roue.')

    const day = Array.from({ length: unlockedDays.value }, (_, index) => index + 1)
      .find((candidate) => !spunDays.value.includes(candidate))
    if (!day) return null

    progress.value = {
      spunDays: [...spunDays.value, day],
    }
    addPoints(reward.points)
    return reward
  }

  return {
    availableSpins,
    canSpin,
    spin,
  }
}
