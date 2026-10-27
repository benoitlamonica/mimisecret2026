import { computed, ref } from 'vue'
import { questions, type Question, type QuestionDifficulty } from '@/data/questions'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { usePoints, MIMI_POINTS_PER_CORRECT_ANSWER } from '@/composables/usePoints'

interface QuizProgress {
  completedDays: number[]
}

export function useDailyQuiz() {
  const { value: progress } = useLocalStorage<QuizProgress>('mimi-quiz-progress', { completedDays: [] })
  const { points, addPoints } = usePoints()
  const isQuizOpen = ref(false)
  const quizQuestions = ref<Question[]>([])
  const quizIndex = ref(0)
  const selectedAnswer = ref<string | null>(null)
  const quizAnswerSubmitted = ref(false)
  const correctAnswers = ref(0)
  const quizDay = ref<number | null>(null)
  const pointsEarned = ref(0)
  const currentQuestion = computed(() => quizQuestions.value[quizIndex.value])
  const isLastQuestion = computed(() => quizIndex.value === quizQuestions.value.length - 1)
  const completedDays = computed(() => (
    Array.isArray(progress.value.completedDays) ? progress.value.completedDays : []
  ))

  function isDayCompleted(day: number) {
    return completedDays.value.includes(day)
  }

  function startQuiz(day: number) {
    if (isQuizOpen.value || isDayCompleted(day)) return

    const difficulties: QuestionDifficulty[] = ['easy', 'medium', 'hard']
    const selectedQuestions = difficulties.map((difficulty) => {
      const availableQuestions = questions.filter((question) => question.difficulty === difficulty)
      const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
      if (!question) throw new Error(`Aucune question ${difficulty} n'est disponible.`)
      return question
    })

    quizDay.value = day
    quizQuestions.value = selectedQuestions
    quizIndex.value = 0
    selectedAnswer.value = null
    quizAnswerSubmitted.value = false
    correctAnswers.value = 0
    pointsEarned.value = 0
    isQuizOpen.value = true
  }

  function selectAnswer(answer: string) {
    if (!quizAnswerSubmitted.value) selectedAnswer.value = answer
  }

  function submitAnswer() {
    if (!currentQuestion.value || !selectedAnswer.value || quizAnswerSubmitted.value) return

    quizAnswerSubmitted.value = true
    if (selectedAnswer.value === currentQuestion.value.answer) correctAnswers.value += 1
  }

  function finishQuiz() {
    if (!quizDay.value || !quizAnswerSubmitted.value) return

    pointsEarned.value = correctAnswers.value * MIMI_POINTS_PER_CORRECT_ANSWER
    addPoints(pointsEarned.value)
    progress.value = {
      ...progress.value,
      completedDays: [...completedDays.value, quizDay.value],
    }
    isQuizOpen.value = false
  }

  function continueQuiz() {
    if (!quizAnswerSubmitted.value) {
      submitAnswer()
      return
    }
    if (isLastQuestion.value) {
      finishQuiz()
      return
    }

    quizIndex.value += 1
    selectedAnswer.value = null
    quizAnswerSubmitted.value = false
  }

  return {
    completedDays,
    continueQuiz,
    currentQuestion,
    isDayCompleted,
    isLastQuestion,
    isQuizOpen,
    points,
    pointsEarned,
    quizAnswerSubmitted,
    quizIndex,
    quizQuestions,
    selectAnswer,
    selectedAnswer,
    startQuiz,
  }
}
