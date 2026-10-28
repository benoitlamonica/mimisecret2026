import { computed, onBeforeUnmount, ref } from 'vue'
import { useAdventCalendar } from '@/composables/useAdventCalendar'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { usePoints } from '@/composables/usePoints'

interface ClickGameProgress {
  completedDays: number[]
}

const GAME_DURATION_SECONDS = 10

export function useClickGame() {
  const { unlockedDays } = useAdventCalendar()
  const { addPoints } = usePoints()
  const { value: progress } = useLocalStorage<ClickGameProgress>('mimi-click-game-progress', { completedDays: [] })
  const isOpen = ref(false)
  const isPlaying = ref(false)
  const clicks = ref(0)
  const remainingSeconds = ref(GAME_DURATION_SECONDS)
  let timer: ReturnType<typeof setInterval> | undefined

  const completedDays = computed(() => (
    Array.isArray(progress.value.completedDays) ? progress.value.completedDays : []
  ))
  const availableGames = computed(() => Math.max(0, unlockedDays.value - completedDays.value.length))

  function clearTimer() {
    if (timer) clearInterval(timer)
    timer = undefined
  }

  function finishGame() {
    clearTimer()
    isPlaying.value = false
    const day = Array.from({ length: unlockedDays.value }, (_, index) => index + 1)
      .find((candidate) => !completedDays.value.includes(candidate))
    if (!day) return

    addPoints(clicks.value)
    progress.value = {
      completedDays: [...completedDays.value, day],
    }
  }

  function startGame() {
    if (isPlaying.value || availableGames.value <= 0) return
    clicks.value = 0
    remainingSeconds.value = GAME_DURATION_SECONDS
    isOpen.value = true
    isPlaying.value = true
    clearTimer()
    timer = setInterval(() => {
      remainingSeconds.value -= 1
      if (remainingSeconds.value <= 0) finishGame()
    }, 1000)
  }

  function click() {
    if (isPlaying.value) clicks.value += 1
  }

  function close() {
    if (!isPlaying.value) isOpen.value = false
  }

  onBeforeUnmount(clearTimer)

  return {
    availableGames,
    click,
    clicks,
    close,
    isOpen,
    isPlaying,
    remainingSeconds,
    startGame,
  }
}
