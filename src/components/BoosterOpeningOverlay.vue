<script setup lang="ts">
import { ref } from 'vue'
import UiButton from '@/components/UiButton.vue'
import UiCard from '@/components/UiCard.vue'
import type { Card } from '@/data/cards'
import { useBoosterOpening } from '@/composables/useBoosterOpening'

const selectedCard = ref<Card | null>(null)
const currentKind = ref<'standard' | 'special'>('standard')
const {
  boosterCards,
  boosterPhase,
  closeBooster,
  cutBooster,
  isCardRevealed,
  isCutting,
  isDraggingPack,
  movePackDrag,
  isOpening,
  openBooster,
  openSpecialBooster,
  packDragProgress,
  rarityEffect,
  revealCard,
  revealedCards,
  startPackDrag,
  endPackDrag,
} = useBoosterOpening()

function open(kind: 'standard' | 'special') {
  currentKind.value = kind
  if (kind === 'special') openSpecialBooster()
  else openBooster()
}

function handlePackPointerDown(event: PointerEvent) {
  const target = event.currentTarget
  if (target instanceof HTMLElement) target.setPointerCapture(event.pointerId)
  startPackDrag(event.clientX)
}

function handlePackPointerMove(event: PointerEvent) {
  movePackDrag(event.clientX)
}

function handlePackPointerUp() {
  endPackDrag()
}

defineExpose({ isOpening, open })
</script>

<template>
  <div v-if="isOpening" class="fixed inset-0 z-30 overflow-y-auto bg-[#09111a]/90 p-5 backdrop-blur-md md:p-10">
    <div class="mx-auto flex min-h-full max-w-6xl flex-col justify-center">
      <div class="mb-8 flex items-start justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">{{ currentKind === 'special' ? 'Booster spécial' : 'Booster classique' }}</p>
          <h2 class="mt-2 font-display text-5xl text-[#fff8e9] md:text-6xl">{{ boosterPhase === 'pack' ? 'Le paquet est arrivé' : 'Révèle tes cartes' }}</h2>
        </div>
        <button aria-label="Fermer le booster" class="text-3xl text-[#8fa0aa] transition hover:text-white" :disabled="boosterPhase === 'pack' || revealedCards.size < boosterCards.length" @click="closeBooster">×</button>
      </div>
      <p class="mb-10 text-[#9cafb6]">{{ boosterPhase === 'pack' ? 'Découpe le paquet pour faire apparaître les cinq cartes.' : 'Clique sur chaque carte pour la retourner. La dernière cache toujours une rareté au minimum.' }}</p>

      <div v-if="boosterPhase === 'pack'" class="flex flex-col items-center justify-center py-8">
        <button :class="{ 'is-cutting': isCutting, 'is-dragging': isDraggingPack }" :style="{ '--tear-progress': `${packDragProgress}px` }" class="booster-pack relative h-96 w-64" :disabled="isCutting" aria-label="Ouvrir le booster en le déchirant" @pointerdown="handlePackPointerDown" @pointermove="handlePackPointerMove" @pointerup="handlePackPointerUp" @pointercancel="handlePackPointerUp">
          <div class="booster-pack__glow absolute -inset-12 rounded-full"></div>
          <div class="booster-pack__body card-shine relative flex h-full flex-col justify-between bg-[#203747] p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,.45)]">
            <span class="booster-pack__crimp booster-pack__crimp--top"></span>
            <div class="booster-pack__seal absolute left-0 right-0 top-0 flex items-center justify-between px-4 py-2 text-[8px] uppercase tracking-[.2em] text-[#e2bd72]"><span>✦ Le Secret de Mimi</span><span class="booster-pack__tear-line">DÉCHIRER</span></div>
            <div class="flex justify-between text-[9px] uppercase tracking-[.25em] text-[#e2bd72]"><span>Booster</span><span>✦</span></div>
            <div><div class="mx-auto mb-4 grid h-28 w-28 place-items-center rounded-full border border-[#e2bd72]/40 text-7xl text-[#e2bd72]">✦</div><p class="font-display text-4xl text-[#fff8e9]">Le Secret</p><p class="mt-2 text-[10px] uppercase tracking-[.25em] text-[#93a7ae]">Collection d’hiver</p></div>
            <div class="border-t border-[#e2bd72]/20 pt-3 text-[9px] uppercase tracking-widest text-[#93a7ae]">5 cartes à découvrir</div>
            <span class="booster-pack__crimp booster-pack__crimp--bottom"></span>
          </div>
          <span class="booster-pack__scissors absolute -right-10 top-1/2 text-4xl text-[#f4d994]">✂</span>
        </button>
        <p class="mt-8 text-xs uppercase tracking-[.2em] text-[#8499a1]">{{ isCutting ? 'Le paquet s’ouvre…' : 'Fais glisser pour déchirer le paquet' }}</p>
        <UiButton :disabled="isCutting" class="mt-5 px-8 py-4" @click="cutBooster">{{ isCutting ? 'Le paquet s’ouvre…' : 'Découper le booster' }} <span class="ml-2">✂</span></UiButton>
      </div>

      <div v-else class="booster-circle">
        <div v-for="(card, index) in boosterCards" :key="`${card.id}-${index}`" :style="{ '--card-index': index }" class="booster-circle-card">
          <div :class="{ 'is-revealed': isCardRevealed(index) }" class="booster-flip">
            <button class="booster-card-face booster-card__back flex aspect-[.72] w-full items-center justify-center rounded-2xl border border-[#d6b975]/40 shadow-2xl" :aria-label="`Révéler la carte ${index + 1}`" @click="revealCard(index)"><span class="font-display text-6xl text-[#e2bd72]/70">✦</span></button>
            <div class="booster-card-face booster-card-front relative"><span :class="['rarity-burst', rarityEffect(card.rarity)]"></span><UiCard :card="card" @click="selectedCard = card" /></div>
          </div>
        </div>
      </div>
      <div class="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
        <span class="text-xs uppercase tracking-[.18em] text-[#7f939d]">{{ revealedCards.size }} / {{ boosterCards.length }} cartes révélées</span>
        <UiButton v-if="revealedCards.size === boosterCards.length" @click="closeBooster">Garder mes cartes</UiButton>
      </div>
    </div>
  </div>

  <div v-if="selectedCard" class="fixed inset-0 z-40 grid place-items-center bg-[#09111a]/80 p-6 backdrop-blur-sm" @click.self="selectedCard = null">
    <div class="w-full max-w-md rounded-2xl border border-[#e2bd72]/40 bg-[#172536] p-7 shadow-2xl">
      <div class="mb-8 flex items-start justify-between"><div><p class="text-xs uppercase tracking-[.2em] text-[#e2bd72]">{{ selectedCard.type }}</p><h2 class="mt-2 font-display text-4xl text-[#fff8e9]">{{ selectedCard.name }}</h2></div><button aria-label="Fermer" class="text-2xl text-[#9aabb1] hover:text-white" @click="selectedCard = null">×</button></div>
      <div class="mb-6 flex items-center gap-5 rounded-xl border border-white/10 bg-[#203747] p-5"><span class="text-6xl text-[#e2c978]">{{ selectedCard.symbol }}</span><div><span class="rounded-full bg-[#fff0bc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#95601d]">{{ selectedCard.rarity }}</span><p class="mt-3 text-xs uppercase tracking-widest text-[#8fa0aa]">{{ selectedCard.power }}</p></div></div>
      <p class="leading-relaxed text-[#b9c5cc]">{{ selectedCard.description }}</p>
      <UiButton class="mt-8 w-full" @click="selectedCard = null">Fermer la carte</UiButton>
    </div>
  </div>
</template>
