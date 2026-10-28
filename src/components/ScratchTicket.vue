<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  title: string
  subtitle: string
  accent: string
  variant?: 'points' | 'card'
  showHeading?: boolean
}>()
const emit = defineEmits<{ revealed: [] }>()
const canvas = ref<HTMLCanvasElement | null>(null)
const isScratching = ref(false)
const isRevealed = ref(false)
let context: CanvasRenderingContext2D | null = null
let lastPoint: { x: number; y: number } | null = null

function resizeCanvas() {
  const element = canvas.value
  if (!element) return
  const bounds = element.getBoundingClientRect()
  const ratio = window.devicePixelRatio || 1
  element.width = bounds.width * ratio
  element.height = bounds.height * ratio
  context = element.getContext('2d')
  if (!context) return
  context.scale(ratio, ratio)
  context.fillStyle = '#b7bdc0'
  context.fillRect(0, 0, bounds.width, bounds.height)
  context.fillStyle = 'rgba(255,255,255,.35)'
  context.font = '700 16px DM Sans, sans-serif'
  context.textAlign = 'center'
  context.fillText('GRATTE ICI', bounds.width / 2, bounds.height / 2)
}

function pointFromEvent(event: PointerEvent) {
  const element = canvas.value
  if (!element) return null
  const bounds = element.getBoundingClientRect()
  return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
}

function scratchAt(point: { x: number; y: number }) {
  if (!context || !canvas.value || isRevealed.value) return
  context.globalCompositeOperation = 'destination-out'
  context.lineWidth = 34
  context.lineCap = 'round'
  context.beginPath()
  if (lastPoint) {
    context.moveTo(lastPoint.x, lastPoint.y)
    context.lineTo(point.x, point.y)
  } else {
    context.moveTo(point.x, point.y)
    context.lineTo(point.x, point.y)
  }
  context.stroke()
  lastPoint = point
}

function checkRevealed() {
  const element = canvas.value
  if (!context || !element || isRevealed.value) return
  const pixels = context.getImageData(0, 0, element.width, element.height).data
  let transparent = 0
  for (let index = 3; index < pixels.length; index += 4 * 12) {
    if ((pixels[index] ?? 255) < 30) transparent += 1
  }
  if (transparent / (pixels.length / (4 * 12)) >= 0.45) {
    isRevealed.value = true
    context.clearRect(0, 0, element.width, element.height)
    emit('revealed')
  }
}

function pointerDown(event: PointerEvent) {
  if (isRevealed.value) return
  canvas.value?.setPointerCapture(event.pointerId)
  isScratching.value = true
  lastPoint = pointFromEvent(event)
  if (lastPoint) scratchAt(lastPoint)
}

function pointerMove(event: PointerEvent) {
  if (!isScratching.value) return
  const point = pointFromEvent(event)
  if (point) scratchAt(point)
}

function pointerUp() {
  if (!isScratching.value) return
  isScratching.value = false
  lastPoint = null
  checkRevealed()
}

onMounted(() => {
  nextTick(resizeCanvas)
  window.addEventListener('resize', resizeCanvas)
})
onBeforeUnmount(() => window.removeEventListener('resize', resizeCanvas))
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <div
      class="relative overflow-hidden rounded-3xl border-4 p-5 shadow-2xl"
      :class="[accent, variant === 'card' ? 'mx-auto aspect-[.72] max-w-80' : 'aspect-[1.65] max-w-2xl']"
    >
      <div class="relative z-0 flex h-full flex-col items-center justify-center rounded-2xl border border-white/30 bg-[#172536] text-center">
        <template v-if="showHeading !== false">
          <p class="text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]">{{ subtitle }}</p>
          <p class="mt-2 font-display text-4xl text-[#fff8e9]">{{ title }}</p>
        </template>
        <slot />
      </div>
      <canvas
        ref="canvas"
        class="absolute inset-5 z-10 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] cursor-crosshair touch-none rounded-2xl"
        @pointerdown="pointerDown"
        @pointermove="pointerMove"
        @pointerup="pointerUp"
        @pointercancel="pointerUp"
      />
    </div>
    <p class="mt-4 text-center text-xs uppercase tracking-[.2em] text-[#8fa0aa]">{{ isRevealed ? 'Ticket révélé !' : 'Gratte avec ton doigt ou ta souris' }}</p>
  </div>
</template>
