<script setup lang="ts">
import { computed, ref } from 'vue'
import UiCard from '@/components/UiCard.vue'
import UiModal from '@/components/UiModal.vue'
import type { Card } from '@/data/cards'

defineProps<{
  card: Card
}>()
const selectedCard = defineModel<Card | null>({ required: true })
const cardStage = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const glareX = ref(50)
const glareY = ref(50)

function updateTilt(event: PointerEvent) {
  const stage = cardStage.value
  if (!stage) return
  const bounds = stage.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - 0.5
  const y = (event.clientY - bounds.top) / bounds.height - 0.5
  rotateX.value = -y * 18
  rotateY.value = x * 18
  glareX.value = (x + 0.5) * 100
  glareY.value = (y + 0.5) * 100
}

function resetTilt() {
  rotateX.value = 0
  rotateY.value = 0
  glareX.value = 50
  glareY.value = 50
}

const isOpen = computed({
  get: () => selectedCard.value !== null,
  set: (value: boolean) => {
    if (!value) {
      resetTilt()
      selectedCard.value = null
    }
  },
})
</script>

<template>
  <UiModal v-model="isOpen" panel-class="!my-0 !h-[calc(100dvh-2.5rem)] !max-w-none !rounded-none !border-0 !bg-transparent !p-0 !shadow-none" aria-label="Carte en grand format">
    <div ref="cardStage" class="card-detail-stage flex h-full w-full items-center justify-center" @pointermove="updateTilt" @pointerleave="resetTilt" @pointerup="resetTilt">
      <div class="card-detail-tilt relative w-[min(82vw,28rem)]" :style="{ transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }">
        <UiCard :card="card" :rarity="card.rarity" class="relative z-0 w-full" />
        <div class="card-detail-glare absolute inset-0 z-10 rounded-2xl" :style="{ '--glare-x': `${glareX}%`, '--glare-y': `${glareY}%` }"></div>
      </div>
    </div>
  </UiModal>
</template>
