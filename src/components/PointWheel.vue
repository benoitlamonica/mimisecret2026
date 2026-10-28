<script setup lang="ts">
import { computed } from 'vue'
import UiButton from '@/components/UiButton.vue'
import {
  wheelRewards,
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
  <div class="mx-auto max-w-sm text-center">
    <div class="relative mx-auto aspect-square w-full max-w-75">
      <span class="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-3xl text-[#f2d58d]">▼</span>
      <div :style="{ transform: `rotate(${rotation}deg)`, background: wheelBackground }" :class="{ 'point-wheel--spinning': spinning }" class="point-wheel relative h-full w-full overflow-hidden rounded-full border-8 border-[#e2bd72] shadow-[0_0_50px_rgba(226,189,114,.25)]">
        <div v-for="segment in segments" :key="segment.index" :style="{ transform: `rotate(${segment.midpoint}deg) translateY(-103px) rotate(${-segment.midpoint}deg)` }" class="pointer-events-none absolute left-1/2 top-1/2 flex w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center text-[#fff8e9]">
          <span class="rounded-full bg-[#101a26]/80 px-1.5 py-1 font-display text-sm font-bold leading-tight shadow-sm">{{ segment.points }} pts</span>
        </div>
        <div class="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#f2d58d] bg-[#172536]"></div>
      </div>
    </div>
    <UiButton class="mt-8" :disabled="disabled || spinning" @click="emit('spin')">{{ spinning ? 'La roue tourne…' : disabled ? 'Roue déjà utilisée' : 'Lancer la roue' }}</UiButton>
    <div class="mt-6 rounded-2xl border border-white/10 bg-[#172536]/80 p-4 text-left">
      <p class="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#e2bd72]">Gains possibles</p>
      <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div v-for="reward in wheelRewards" :key="reward.points" class="flex items-center justify-between gap-2 text-[#d9e3e5]">
          <span>{{ reward.points }} points <span class="text-[#8fa0aa]">({{ reward.label }})</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
