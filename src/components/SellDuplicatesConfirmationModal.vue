<script setup lang="ts">
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'

defineProps<{
  cardCount: number
  gain: number
  balance: number
}>()

const isOpen = defineModel<boolean>({ required: true })
const emit = defineEmits<{ confirm: [] }>()
</script>

<template>
  <UiModal
    v-model="isOpen"
    panel-class="max-w-md"
    aria-label="Confirmation de vente des doublons"
  >
    <div class="pr-8">
      <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Confirmer la vente</p>
      <h2 class="mt-2 font-display text-4xl text-[#fff8e9]">Vendre mes doublons</h2>
      <p class="mt-3 text-sm leading-relaxed text-[#9cafb6]">Une carte de chaque modèle sera conservée. Les {{ cardCount }} carte{{ cardCount > 1 ? 's' : '' }} en trop seront échangées contre des points.</p>
    </div>
    <div class="my-7 rounded-xl border border-white/10 bg-[#203747] p-5">
      <div class="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
        <span class="text-[#9cafb6]">Gain de la vente</span>
        <strong class="text-[#f2d58d]">+{{ gain }} points</strong>
      </div>
      <div class="flex items-center justify-between pt-4 text-sm">
        <span class="text-[#9cafb6]">Solde après vente</span>
        <strong class="text-[#f7f3ea]">{{ balance + gain }} points</strong>
      </div>
    </div>
    <div class="flex gap-3">
      <UiButton
        variant="ghost"
        class="flex-1"
        @click="isOpen = false"
      >
        Annuler
      </UiButton>
      <UiButton
        class="flex-1"
        @click="emit('confirm')"
      >
        Vendre
      </UiButton>
    </div>
  </UiModal>
</template>
