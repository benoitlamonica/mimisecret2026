<script setup lang="ts">
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'

defineProps<{
  clicks: number
  isPlaying: boolean
  remainingSeconds: number
}>()

const isOpen = defineModel<boolean>({ required: true })
const emit = defineEmits<{
  click: []
  close: []
}>()
</script>

<template>
  <UiModal v-model="isOpen" :dismissible="!isPlaying" panel-class="max-w-lg p-6 text-center md:p-10" aria-label="Jeu de clic">
    <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Mini-jeu</p>
    <h2 class="mt-2 font-display text-5xl text-[#fff8e9]">Clique Mimi !</h2>
    <p class="mt-4 text-[#9cafb6]">Chaque clic rapporte 1 point. Fais le meilleur score en 10 secondes.</p>

    <div class="my-8 flex items-center justify-center gap-8">
      <div>
        <p class="text-xs uppercase tracking-wider text-[#8fa0aa]">Temps</p>
        <p class="font-display text-5xl text-[#f2d58d]">{{ remainingSeconds }}s</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-wider text-[#8fa0aa]">Score</p>
        <p class="font-display text-5xl text-[#f2d58d]">{{ clicks }}</p>
      </div>
    </div>

    <UiButton v-if="isPlaying" class="h-40 w-full text-2xl md:h-48" @click="emit('click')">CLIQUE !</UiButton>
    <div v-else class="rounded-2xl border border-[#e2bd72]/40 bg-[#e2bd72]/10 p-6">
      <p class="text-sm uppercase tracking-[.2em] text-[#e2bd72]">Temps écoulé</p>
      <p class="mt-2 font-display text-5xl text-[#fff8e9]">+{{ clicks }} points</p>
    </div>

    <UiButton v-if="!isPlaying" variant="secondary" class="mt-7 w-full" @click="emit('close')">Continuer</UiButton>
  </UiModal>
</template>
