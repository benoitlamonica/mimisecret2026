<script setup lang="ts">
import { computed } from 'vue'
import UiButton from '@/components/UiButton.vue'
import {
  wheelSegmentCount,
  wheelSegments,
} from '@/composables/useDailyWheel'

defineProps<{
  spinning: boolean
  disabled: boolean
  rotation: number
}>()

const segments = computed(() => wheelSegments.map((reward, index) => ({
  ...reward,
  index,
  startAngle: index / wheelSegmentCount * 360,
  midpoint: (index + 0.5) / wheelSegmentCount * 360,
  endAngle: (index + 1) / wheelSegmentCount * 360,
})))
const wheelBackground = computed(() => {
  const separatorWidth = 0.8
  return `conic-gradient(${segments.value.map((segment) => {
    const separatorEnd = Math.min(segment.startAngle + separatorWidth, segment.endAngle)
    return `#e2bd72 ${segment.startAngle}deg ${separatorEnd}deg, #31576a ${separatorEnd}deg ${segment.endAngle}deg`
  }).join(', ')})`
})

const emit = defineEmits<{
  spin: []
}>()
</script>

<template>
  <div class="mx-auto w-full max-w-2xl text-center">
    <div class="relative mx-auto aspect-square w-full" style="--wheel-label-radius: clamp(100px, 35vw, 220px)">
      <span class="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-3xl text-[#f2d58d]">▼</span>
      <div :style="{ transform: `rotate(${rotation}deg)`, background: wheelBackground }" :class="{ 'point-wheel--spinning': spinning }" class="point-wheel relative h-full w-full overflow-hidden rounded-full border-8 border-[#e2bd72] shadow-[0_0_50px_rgba(226,189,114,.25)]">
        <div v-for="segment in segments" :key="segment.index" :style="{ transform: `rotate(${segment.midpoint}deg) translateY(calc(-1 * var(--wheel-label-radius))) rotate(${-segment.midpoint}deg)` }" class="pointer-events-none absolute left-1/2 top-1/2 flex w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center text-[#fff8e9]">
          <span class="font-display text-sm font-bold leading-tight shadow-sm">{{ segment.points }} pts</span>
        </div>
        <div class="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#f2d58d] bg-[#172536]"></div>
      </div>
    </div>
    <UiButton class="mt-8" :disabled="disabled || spinning" @click="emit('spin')">{{ spinning ? 'La roue tourne…' : disabled ? 'Aucune roue disponible' : 'Lancer la roue' }}</UiButton>
    
  </div>
</template>
