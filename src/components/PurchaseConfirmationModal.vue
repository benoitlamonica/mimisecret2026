<script setup lang="ts">
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'

defineProps<{
  itemName: string
  cost: number
  balance: number
}>()

const isOpen = defineModel<boolean>({ required: true })
const emit = defineEmits<{
  confirm: []
}>()
</script>

<template>
  <UiModal v-model="isOpen" panel-class="max-w-md" aria-label="Confirmation d’achat">
    <div class="pr-8">
      <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Confirmer l’achat</p>
      <h2 class="mt-2 font-display text-4xl text-[#fff8e9]">{{ itemName }}</h2>
    </div>
    <div class="my-7 rounded-xl border border-white/10 bg-[#203747] p-5">
      <div class="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
        <span class="text-[#9cafb6]">Prix</span>
        <strong class="text-[#f2d58d]">{{ cost }} points</strong>
      </div>
      <div class="flex items-center justify-between pt-4 text-sm">
        <span class="text-[#9cafb6]">Solde après achat</span>
        <strong class="text-[#f7f3ea]">{{ Math.max(0, balance - cost) }} points</strong>
      </div>
    </div>
    <slot name="visual" />
    <div class="mt-8 flex gap-3">
      <UiButton variant="ghost" class="flex-1" @click="isOpen = false">Annuler</UiButton>
      <UiButton class="flex-1" :disabled="balance < cost" @click="emit('confirm')">Confirmer</UiButton>
    </div>
  </UiModal>
</template>
