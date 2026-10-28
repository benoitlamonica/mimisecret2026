<script setup lang="ts">
import { ref, watch } from 'vue'
import ScratchTicket from '@/components/ScratchTicket.vue'
import UiCard from '@/components/UiCard.vue'
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'
import type { ScratchReward, ScratchTicketType } from '@/composables/useScratchTickets'

const props = defineProps<{
  ticketType: ScratchTicketType
  reward: ScratchReward | null
}>()
const isOpen = defineModel<boolean>({ required: true })
const emit = defineEmits<{ complete: [] }>()
const isRevealed = ref(false)

watch(isOpen, (open) => {
  if (open) isRevealed.value = false
})

const title = () => props.ticketType === 'banco' ? 'Banco Mimi' : 'Carto Mimi'
const accent = () => props.ticketType === 'banco' ? 'border-[#e2bd72] bg-[#a36b2e]' : 'border-[#8cb3bd] bg-[#31576a]'
</script>

<template>
  <UiModal
    v-model="isOpen"
    :dismissible="isRevealed"
    panel-class="max-w-3xl p-6 md:p-10"
    aria-label="Ticket à gratter"
  >
    <div
      v-if="reward"
      class="text-center"
    >
      <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Ton ticket est prêt</p>
      <h2 class="mt-2 font-display text-5xl text-[#fff8e9]">{{ title() }}</h2>
      <div :class="isRevealed ? `scratch-reward--${reward.tone}` : ''">
        <ScratchTicket
          :title="reward.kind === 'points' ? `${reward.points} points` : reward.card.name"
          :subtitle="reward.kind === 'points' ? reward.label : reward.label"
          :accent="accent()"
          :variant="reward.kind === 'card' ? 'card' : 'points'"
          :show-heading="reward.kind !== 'card'"
          @revealed="isRevealed = true; emit('complete')"
        >
          <UiCard
            v-if="reward.kind === 'card'"
            :card="reward.card"
            :rarity="reward.card.rarity"
            class="h-full"
          />
        </ScratchTicket>
      </div>
      <UiButton
        v-if="isRevealed"
        class="mt-7 w-full"
        @click="isOpen = false"
      >
        Continuer
      </UiButton>
    </div>
  </UiModal>
</template>
