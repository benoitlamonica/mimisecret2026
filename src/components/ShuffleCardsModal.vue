<script setup lang="ts">
import UiButton from '@/components/UiButton.vue'
import UiCard from '@/components/UiCard.vue'
import UiModal from '@/components/UiModal.vue'
import type { Card } from '@/data/cards'

defineProps<{
  cards: Card[]
  hasShuffled: boolean
  isShuffling: boolean
  selectedCard: Card | null
}>()

const isOpen = defineModel<boolean>({ required: true })
const emit = defineEmits<{
  select: [card: Card]
  close: []
  shuffle: []
}>()
</script>

<template>
  <UiModal
    v-model="isOpen"
    :dismissible="!isShuffling && selectedCard !== null"
    panel-class="max-w-3xl p-6 md:p-10"
    aria-label="Le jeu des cartes mélangées"
  >
    <div class="text-center">
      <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Mini-jeu</p>
      <h2 class="mt-2 font-display text-5xl text-[#fff8e9]">Le choix de Mimi</h2>
      <p class="mx-auto mt-4 max-w-xl leading-relaxed text-[#9cafb6]">
        Les cinq cartes du paquet spécial se mélangent. Quand elles sont retournées, choisis-en une seule : ce sera ta carte.
      </p>
    </div>

    <div class="shuffle-cards-grid mt-10">
      <div
        v-for="(card, index) in cards"
        :key="`${card.id}-${index}`"
        class="shuffle-card"
        :class="{ 'is-shuffling': isShuffling }"
        :style="{ '--shuffle-index': index }"
      >
        <div
          class="shuffle-card__inner"
          :class="{ 'is-back': hasShuffled && selectedCard !== card }"
        >
          <div class="shuffle-card__face shuffle-card__front pointer-events-none">
            <UiCard
              :card="card"
              :rarity="card.rarity"
            />
          </div>
          <button
            class="shuffle-card__face shuffle-card__back flex items-center justify-center rounded-2xl border border-[#d6b975]/40 bg-[#203747] shadow-2xl"
            :disabled="!hasShuffled || isShuffling || selectedCard !== null"
            :aria-label="`Choisir la carte ${index + 1}`"
            @click="emit('select', card)"
          >
            <span class="font-display text-5xl text-[#e2bd72]/70">✦</span>
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="!hasShuffled && !isShuffling"
      class="mt-8 text-center"
    >
      <UiButton
        class="w-full"
        @click="emit('shuffle')"
      >
        Mélanger !
      </UiButton>
    </div>
    <p
      v-else-if="isShuffling"
      class="mt-8 text-center text-xs uppercase tracking-[.2em] text-[#8499a1]"
    >
      Le paquet se mélange…
    </p>
    <div
      v-else-if="selectedCard"
      class="mt-8 text-center"
    >
      <p class="text-xs font-bold uppercase tracking-[.2em] text-[#e2bd72]">Carte gagnée</p>
      <p class="mt-2 font-display text-3xl text-[#fff8e9]">{{ selectedCard.name }}</p>
      <UiButton
        class="mt-6 w-full"
        @click="emit('close')"
      >
        Continuer
      </UiButton>
    </div>
  </UiModal>
</template>
