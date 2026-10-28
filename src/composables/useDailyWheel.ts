import { computed } from 'vue'
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
  lastSpinDate: string | null
}

function todayKey() {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

export function useDailyWheel() {
  const { value: progress } = useLocalStorage<WheelProgress>('mimi-wheel-progress', { lastSpinDate: null })
  const { addPoints } = usePoints()
  const canSpin = computed(() => true) // computed(() => progress.value.lastSpinDate !== todayKey())

  function spin() {
    if (!canSpin.value) return null

    let roll = Math.random() * wheelTotalWeight
    const reward = wheelRewards.find((candidate) => {
      roll -= candidate.weight
      return roll < 0
    })

    if (!reward) throw new Error('Impossible de sélectionner une récompense de roue.')

    progress.value = { lastSpinDate: todayKey() }
    addPoints(reward.points)
    return reward
  }

  return {
    canSpin,
    spin,
  }
}
