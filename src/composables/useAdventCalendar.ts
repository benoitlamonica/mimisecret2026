import { computed } from 'vue'
import { adventConfig } from '@/config/advent'
import { useLocalStorage } from '@/composables/useLocalStorage'

interface AdventProgress {
  claimedDays: number[]
}

function toLocalDate(date: string) {
  const [year = 0, month = 1, day = 1] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function useAdventCalendar() {
  const { value: progress } = useLocalStorage<AdventProgress>('mimi-advent-progress', { claimedDays: [] })
  const startDate = toLocalDate(adventConfig.startDate)
  const endDate = toLocalDate(adventConfig.endDate)
  const totalDays = Math.max(0, Math.floor((endDate.getTime() - startDate.getTime()) / 86400000) + 1)

  const unlockedDays = computed(() => {
    const today = startOfDay(new Date())
    if (today < startDate) return 0
    if (today > endDate) return totalDays

    return Math.floor((today.getTime() - startDate.getTime()) / 86400000) + 1
  })

  const claimedDays = computed(() => (
    Array.isArray(progress.value.claimedDays)
      ? progress.value.claimedDays.filter((day) => day >= 1 && day <= totalDays)
      : []
  ))

  const availableBoosters = computed(() => Math.max(0, unlockedDays.value - claimedDays.value.length))
  const canOpenBooster = computed(() => availableBoosters.value > 0)

  function isDayClaimed(day: number) {
    return claimedDays.value.includes(day)
  }

  function isDayUnlocked(day: number) {
    return day <= unlockedDays.value
  }

  function claimDay(day: number) {
    if (!isDayUnlocked(day) || isDayClaimed(day)) return null

    progress.value = {
      ...progress.value,
      claimedDays: [...claimedDays.value, day],
    }

    return day
  }

  function claimBooster() {
    const day = Array.from({ length: unlockedDays.value }, (_, index) => index + 1)
      .find((candidate) => !isDayClaimed(candidate))

    return day ? claimDay(day) : null
  }

  return {
    availableBoosters,
    canOpenBooster,
    claimDay,
    claimBooster,
    isDayClaimed,
    isDayUnlocked,
    totalDays,
    unlockedDays,
  }
}
