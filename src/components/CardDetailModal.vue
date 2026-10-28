<script setup lang="ts">
import { computed } from 'vue'
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'
import type { Card } from '@/data/cards'

defineProps<{
  card: Card
}>()
const selectedCard = defineModel<Card | null>({ required: true })
const isOpen = computed({
  get: () => selectedCard.value !== null,
  set: (value: boolean) => {
    if (!value) selectedCard.value = null
  },
})
</script>

<template>
  <UiModal v-model="isOpen" aria-label="Détails de la carte">
    <div class="mb-8 flex items-start justify-between pr-8">
      <div>
        <p class="text-xs uppercase tracking-[.2em] text-[#e2bd72]">{{ card.type }}</p>
        <h2 class="mt-2 font-display text-4xl text-[#fff8e9]">{{ card.name }}</h2>
      </div>
    </div>
    <div class="mb-6 flex items-center gap-5 rounded-xl border border-white/10 bg-[#203747] p-5">
      <span class="text-6xl text-[#e2c978]">{{ card.symbol }}</span>
      <div>
        <span class="rounded-full bg-[#fff0bc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#95601d]">{{ card.rarity }}</span>
        <p class="mt-3 text-xs uppercase tracking-widest text-[#8fa0aa]">{{ card.power }}</p>
      </div>
    </div>
    <p class="leading-relaxed text-[#b9c5cc]">{{ card.description }}</p>
    <UiButton class="mt-8 w-full" @click="selectedCard = null">Fermer la carte</UiButton>
  </UiModal>
</template>
