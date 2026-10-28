<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import BoosterOpeningOverlay from '@/components/BoosterOpeningOverlay.vue'
import PointWheel from '@/components/PointWheel.vue'
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'
import { useAdventCalendar } from '@/composables/useAdventCalendar'
import { useDailyQuiz } from '@/composables/useDailyQuiz'
import { useDailyWheel, type WheelReward, wheelSegmentCount, wheelSegments } from '@/composables/useDailyWheel'

const {
  claimDay,
  isDayClaimed,
  isDayUnlocked,
  totalDays,
  unlockedDays,
} = useAdventCalendar()
const {
  continueQuiz,
  currentQuestion,
  completedDays,
  isLastQuestion,
  isQuizOpen,
  isDayCompleted,
  pointsEarned,
  quizAnswerSubmitted,
  quizIndex,
  quizQuestions,
  selectAnswer,
  selectedAnswer,
  startQuiz,
  points,
} = useDailyQuiz()
const { canSpin, spin } = useDailyWheel()

const boosterOverlay = ref<{ isOpening: { value: boolean }; open: () => void } | null>(null)
const availableQuizzes = computed(() => Math.max(0, unlockedDays.value - completedDays.value.length))
const canStartQuiz = computed(() => availableQuizzes.value > 0)
const isWheelSpinning = ref(false)
const wheelRotation = ref(0)
const wheelReward = ref<WheelReward | null>(null)
const isWheelRewardModalOpen = computed({
  get: () => wheelReward.value !== null,
  set: (isOpen) => {
    if (!isOpen) wheelReward.value = null
  },
})
let wheelTimeout: ReturnType<typeof setTimeout> | undefined

onBeforeUnmount(() => {
  if (wheelTimeout) clearTimeout(wheelTimeout)
})

function openFreeBooster(day: number) {
  if (boosterOverlay.value?.isOpening.value) return

  const claimedDay = claimDay(day)
  if (!claimedDay) return

  boosterOverlay.value?.open()
}

function startNextQuiz() {
  const day = Array.from({ length: unlockedDays.value }, (_, index) => index + 1)
    .find((candidate) => !isDayCompleted(candidate))

  if (day) startQuiz(day)
}

function spinWheel() {
  const reward = spin()
  if (!reward) return

  const matchingSegments = wheelSegments
    .map((candidate, index) => candidate.points === reward.points ? index : -1)
    .filter((index) => index >= 0)
  const segmentIndex = matchingSegments[Math.floor(Math.random() * matchingSegments.length)] ?? 0
  const midpoint = (segmentIndex + 0.5) / wheelSegmentCount * 360
  const currentAngle = wheelRotation.value % 360
  const correction = (360 - midpoint - currentAngle + 360) % 360
  wheelRotation.value += 1800 + correction
  isWheelSpinning.value = true
  wheelTimeout = setTimeout(() => {
    isWheelSpinning.value = false
    wheelReward.value = reward
    wheelTimeout = undefined
  }, 3200)
}
</script>

<template>
  <div class="min-h-screen bg-[#101a26] text-[#f7f3ea]">
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10">
      <section class="snow-drift relative overflow-hidden rounded-4xl border border-white/10 bg-[#172536] px-6 py-12 md:px-12">
        <div class="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#b46e36]/20 blur-3xl"></div>
        <div class="relative flex flex-wrap items-end justify-between gap-8">
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]">Ton rendez-vous quotidien</p>
            <h1 class="font-display text-6xl leading-none text-[#fff9ed] md:text-8xl">Le calendrier</h1>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-[#b9c5cc]">Chaque jour débloque une nouvelle question. Une bonne réponse rapporte 10 points Mimi.</p>
          </div>
          <div class="flex gap-4">
            <div class="rounded-2xl border border-[#e2bd72]/30 bg-[#e2bd72]/10 px-6 py-4 text-right">
              <p class="text-xs uppercase tracking-[.2em] text-[#aebdc2]">Mon solde</p>
              <p class="mt-1 font-display text-4xl text-[#f2d58d]">{{ points }} <span class="text-base">pts</span></p>
            </div>
            <div class="rounded-2xl border border-[#8cb3bd]/30 bg-[#31576a]/20 px-6 py-4 text-right">
              <p class="text-xs uppercase tracking-[.2em] text-[#aebdc2]">Quiz restants</p>
              <p class="mt-1 font-display text-4xl text-[#d9e3e5]">{{ availableQuizzes }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div><p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Édition hiver 2026</p><h2 class="font-display text-5xl text-[#fff8e9]">Les défis de Mimi</h2></div>
          <p class="max-w-xs text-right text-sm leading-relaxed text-[#8fa0aa]">{{ unlockedDays }} / {{ totalDays }} jours débloqués</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-[#172536]/70 p-5 md:p-8">
          <div class="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-12 md:gap-3">
            <UiButton v-for="day in totalDays" :key="day" variant="ghost" :disabled="!isDayUnlocked(day) || isDayClaimed(day)" :class="[isDayClaimed(day) ? 'border-[#537382] bg-[#2b4654] text-[#c2d2d3]' : isDayUnlocked(day) ? 'border-[#d6b975]/60 bg-[#d6b975]/10 text-[#e2bd72] hover:bg-[#e2bd72] hover:text-[#172536]' : 'border-white/10 bg-white/3 text-[#71858e]', 'aspect-square rounded-lg border px-0 py-0 text-sm font-bold no-underline transition disabled:cursor-not-allowed md:rounded-xl']" @click="openFreeBooster(day)">{{ String(day).padStart(2, '0') }}</UiButton>
          </div>
          <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p class="text-sm text-[#8fa0aa]">{{ unlockedDays === 0 ? 'Le calendrier ouvre bientôt.' : `${availableQuizzes} quiz restant${availableQuizzes > 1 ? 's' : ''} à utiliser.` }}</p>
            <UiButton variant="secondary" :disabled="!canStartQuiz" @click="startNextQuiz">Répondre au défi du jour</UiButton>
          </div>
        </div>
      </section>

      <section class="grid items-center gap-10 py-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Une chance par jour</p>
          <h2 class="font-display text-5xl text-[#fff8e9]">La roue de Mimi</h2>
          <p class="mt-5 leading-relaxed text-[#9cafb6]">Lance la roue pour gagner uniquement des points Mimi. Le jackpot de 100 points est unique et très rare.</p>
        </div>
        <PointWheel :disabled="!canSpin" :spinning="isWheelSpinning" :rotation="wheelRotation" @spin="spinWheel" />
      </section>
    </main>

    <UiModal v-model="isQuizOpen" panel-class="max-w-xl p-7 md:p-10" aria-label="Défi quotidien">
        <div class="mb-8 flex items-start justify-between gap-5">
          <div>
            <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Défi du jour · Question {{ quizIndex + 1 }} / {{ quizQuestions.length }}</p>
            <h2 class="mt-2 font-display text-4xl text-[#fff8e9]">Gagne des points Mimi</h2>
          </div>
          <span class="rounded-full bg-[#e2bd72]/10 px-3 py-1 text-[10px] uppercase tracking-wider text-[#e2bd72]">{{ currentQuestion?.difficulty }}</span>
        </div>
        <p class="mb-7 text-xl leading-relaxed text-[#f7f3ea]">{{ currentQuestion?.name }}</p>
        <div class="grid gap-3">
          <UiButton v-for="option in currentQuestion?.options" :key="option" variant="ghost" :disabled="quizAnswerSubmitted" :class="[selectedAnswer === option ? 'border-[#e2bd72] bg-[#e2bd72]/15 text-[#fff8e9]' : 'border-white/10 bg-white/3 text-[#b9c5cc]', 'w-full justify-start rounded-xl border px-4 py-3 text-left no-underline transition hover:border-[#e2bd72] disabled:cursor-not-allowed']" @click="selectAnswer(option)">{{ option }}</UiButton>
        </div>
        <p v-if="quizAnswerSubmitted" class="mt-5 text-sm" :class="selectedAnswer === currentQuestion?.answer ? 'text-emerald-300' : 'text-rose-300'">{{ selectedAnswer === currentQuestion?.answer ? 'Bonne réponse ! +10 points' : `La bonne réponse était : ${currentQuestion?.answer}` }}</p>
        <div class="mt-8 flex justify-end">
          <UiButton :disabled="!selectedAnswer" @click="continueQuiz">{{ quizAnswerSubmitted && isLastQuestion ? `Terminer · +${pointsEarned} points` : quizAnswerSubmitted ? 'Question suivante' : 'Valider ma réponse' }} <span class="ml-2">→</span></UiButton>
        </div>
    </UiModal>

    <BoosterOpeningOverlay ref="boosterOverlay" />

    <UiModal v-if="wheelReward" v-model="isWheelRewardModalOpen" panel-class="max-w-sm" aria-label="Récompense de la roue">
      <div class="text-center">
        <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Récompense obtenue</p>
        <h2 class="mt-3 font-display text-6xl text-[#f2d58d]">+{{ wheelReward.points }}</h2>
        <p class="mt-2 text-sm uppercase tracking-[.2em] text-[#aebdc2]">points Mimi · {{ wheelReward.label }}</p>
        <UiButton class="mt-8 w-full" @click="wheelReward = null">Continuer</UiButton>
      </div>
    </UiModal>
  </div>
</template>
