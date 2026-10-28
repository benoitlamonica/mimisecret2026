<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import BoosterOpeningOverlay from '@/components/BoosterOpeningOverlay.vue'
import PurchaseConfirmationModal from '@/components/PurchaseConfirmationModal.vue'
import ScratchTicketModal from '@/components/ScratchTicketModal.vue'
import UiCard from '@/components/UiCard.vue'
import UiButton from '@/components/UiButton.vue'
import UiModal from '@/components/UiModal.vue'
import {
  CLASSIC_BOOSTER_COST,
  EXTRAORDINARY_CARD_COST,
  SPECIAL_BOOSTER_COST,
  usePoints,
} from '@/composables/usePoints'
import { useShop } from '@/composables/useShop'
import {
  drawScratchReward,
  SCRATCH_TICKET_COST,
  type ScratchReward,
  type ScratchTicketType,
} from '@/composables/useScratchTickets'
import { cards, type Card, type Rarity } from '@/data/cards'

const boosterOverlay = ref<{ open: (kind: 'standard' | 'special') => void } | null>(null)
const purchasedCard = ref<Card | null>(null)
type PendingPurchase = {
  type: 'booster' | 'card' | 'extraordinary' | 'ticket'
  name: string
  cost: number
  kind?: 'standard' | 'special'
  card?: Card
  ticketType?: ScratchTicketType
}
const pendingPurchase = ref<PendingPurchase | null>(null)
const isPurchaseModalOpen = computed({
  get: () => pendingPurchase.value !== null,
  set: (isOpen) => {
    if (!isOpen) pendingPurchase.value = null
  },
})
const isPurchasedCardModalOpen = computed({
  get: () => purchasedCard.value !== null,
  set: (isOpen) => {
    if (!isOpen) purchasedCard.value = null
  },
})
const searchTerm = ref('')
const activeFilter = ref<'Toutes' | Rarity>('Toutes')
const { addPoints, points, spendPoints } = usePoints()
const { buyCard, buyRandomExtraordinaryCard, collectCard, getCardCost, getOwnedCount } = useShop()
const scratchTicketType = ref<ScratchTicketType>('banco')
const scratchReward = ref<ScratchReward | null>(null)
const isScratchModalOpen = ref(false)
const isScratchRewardApplied = ref(false)
const filters: Array<'Toutes' | Rarity> = ['Toutes', 'Commun', 'Rare', 'Épique', 'Légendaire', 'Extraordinaire']
const purchasableCards = computed(() => {
  const search = searchTerm.value.trim().toLocaleLowerCase()

  return cards.filter((card) => {
    if (card.rarity === 'Extraordinaire') return false
    if (activeFilter.value !== 'Toutes' && card.rarity !== activeFilter.value) return false
    return !search || card.name.toLocaleLowerCase().includes(search)
  })
})
const mysteryCard = computed(() => cards.find((card) => card.rarity === 'Extraordinaire'))
const showExtraordinaryCard = computed(() => {
  const search = searchTerm.value.trim().toLocaleLowerCase()
  return (activeFilter.value === 'Toutes' || activeFilter.value === 'Extraordinaire')
    && (!search || 'extraordinaire'.includes(search))
})

function buyBooster(kind: 'standard' | 'special') {
  const cost = kind === 'standard' ? CLASSIC_BOOSTER_COST : SPECIAL_BOOSTER_COST
  pendingPurchase.value = {
    type: 'booster',
    name: kind === 'standard' ? 'Booster classique' : 'Booster spécial',
    cost,
    kind,
  }
}

function buyCardFromShop(card: Card) {
  const cost = getCardCost(card.rarity)
  if (cost === null) return

  pendingPurchase.value = {
    type: 'card',
    name: card.name,
    cost,
    card,
  }
}

function buyExtraordinaryCard() {
  pendingPurchase.value = {
    type: 'extraordinary',
    name: 'Carte extraordinaire mystérieuse',
    cost: EXTRAORDINARY_CARD_COST,
  }
}

function buyScratchTicket(ticketType: ScratchTicketType) {
  pendingPurchase.value = {
    type: 'ticket',
    name: ticketType === 'banco' ? 'Ticket Banco Mimi' : 'Ticket Carto Mimi',
    cost: SCRATCH_TICKET_COST,
    ticketType,
  }
}

function confirmPurchase() {
  const purchase = pendingPurchase.value
  if (!purchase) return

  pendingPurchase.value = null

  if (purchase.type === 'booster' && purchase.kind && spendPoints(purchase.cost)) {
    boosterOverlay.value?.open(purchase.kind)
  }
  if (purchase.type === 'card' && purchase.card && buyCard(purchase.card)) {
    purchasedCard.value = purchase.card
  }
  if (purchase.type === 'extraordinary') {
    const card = buyRandomExtraordinaryCard()
    if (card) purchasedCard.value = card
  }
  if (purchase.type === 'ticket' && purchase.ticketType && spendPoints(purchase.cost)) {
    scratchTicketType.value = purchase.ticketType
    scratchReward.value = drawScratchReward(purchase.ticketType)
    isScratchRewardApplied.value = false
    isScratchModalOpen.value = true
  }
}

function completeScratch() {
  if (isScratchRewardApplied.value || !scratchReward.value) return
  isScratchRewardApplied.value = true

  if (scratchReward.value.kind === 'points') addPoints(scratchReward.value.points)
  else collectCard(scratchReward.value.card)
}
</script>

<template>
  <div class="min-h-screen bg-[#101a26] text-[#f7f3ea]">
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10">
      <section class="snow-drift relative overflow-hidden rounded-4xl border border-white/10 bg-[#172536] px-6 py-12 md:px-12">
        <div class="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-[#b46e36]/20 blur-3xl"></div>
        <div class="relative flex flex-wrap items-end justify-between gap-8">
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]">La réserve de Mimi</p>
            <h1 class="font-display text-6xl leading-none text-[#fff9ed] md:text-8xl">La boutique</h1>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-[#b9c5cc]">Échange tes points Mimi contre des boosters et agrandis ta collection.</p>
          </div>
          <div class="rounded-2xl border border-[#e2bd72]/30 bg-[#e2bd72]/10 px-6 py-4 text-right">
            <p class="text-xs uppercase tracking-[.2em] text-[#aebdc2]">Mon solde</p>
            <p class="mt-1 font-display text-4xl text-[#f2d58d]">{{ points }} <span class="text-base">pts</span></p>
          </div>
        </div>
      </section>

      <section class="grid gap-6 py-12 md:grid-cols-2">
        <article class="relative overflow-hidden rounded-2xl border border-[#d6b975]/30 bg-[#172536] p-8">
          <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#31576a]/40 blur-3xl"></div>
          <div class="relative">
            <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Le classique</p>
            <h2 class="font-display text-3xl text-[#fff8e9]">Booster classique</h2>
            <p class="mt-4 min-h-14 leading-relaxed text-[#9cafb6]">Cinq cartes avec une rareté garantie à partir de Rare.</p>
            <div class="mt-8 flex items-center justify-between gap-4">
              <span class="font-display text-3xl text-[#f2d58d]">{{ CLASSIC_BOOSTER_COST }} pts</span><UiButton
                :disabled="points < CLASSIC_BOOSTER_COST"
                @click="buyBooster('standard')"
              >
                Acheter
              </UiButton>
            </div>
          </div>
        </article>
        <article class="relative overflow-hidden rounded-2xl border border-[#e2bd72]/50 bg-linear-to-br from-[#4a3b2a] via-[#302b2d] to-[#172536] p-8">
          <div class="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#e2bd72]/20 blur-3xl"></div>
          <div class="relative">
            <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#f2d58d]">Le précieux</p>
            <h2 class="font-display text-3xl text-[#fff8e9]">Booster spécial</h2>
            <p class="mt-4 min-h-14 leading-relaxed text-[#c5bca8]">Cinq cartes avec des chances renforcées sur les grandes raretés.</p>
            <div class="mt-8 flex items-center justify-between gap-4">
              <span class="font-display text-3xl text-[#f2d58d]">{{ SPECIAL_BOOSTER_COST }} pts</span><UiButton
                :disabled="points < SPECIAL_BOOSTER_COST"
                @click="buyBooster('special')"
              >
                Acheter
              </UiButton>
            </div>
          </div>
        </article>
      </section>

      <section class="pb-12">
        <div class="mb-8">
          <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Les tickets de Mimi</p>
          <h2 class="font-display text-5xl text-[#fff8e9]">Tente ta chance</h2>
          <p class="mt-4 max-w-xl leading-relaxed text-[#9cafb6]">Gratte tes tickets pour gagner des points ou une nouvelle carte. Chaque ticket coûte {{ SCRATCH_TICKET_COST }} points.</p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <article class="relative overflow-hidden rounded-2xl border border-[#e2bd72]/40 bg-linear-to-br from-[#4c3525] to-[#172536] p-8">
            <p class="text-xs font-bold uppercase tracking-[.25em] text-[#f2d58d]">Ticket points</p>
            <h3 class="mt-3 font-display text-4xl text-[#fff8e9]">Banco Mimi</h3>
            <p class="mt-3 leading-relaxed text-[#c5bca8]">De rien à 200 points, avec un jackpot très rare.</p>
            <div class="mt-8 flex items-center justify-between gap-4">
              <span class="font-display text-3xl text-[#f2d58d]">{{ SCRATCH_TICKET_COST }} pts</span><UiButton
                :disabled="points < SCRATCH_TICKET_COST"
                @click="buyScratchTicket('banco')"
              >
                Acheter
              </UiButton>
            </div>
          </article>
          <article class="relative overflow-hidden rounded-2xl border border-[#8cb3bd]/40 bg-linear-to-br from-[#244454] to-[#172536] p-8">
            <p class="text-xs font-bold uppercase tracking-[.25em] text-[#b8e4ed]">Ticket cartes</p>
            <h3 class="mt-3 font-display text-4xl text-[#fff8e9]">Carto Mimi</h3>
            <p class="mt-3 leading-relaxed text-[#b9d1d6]">Une carte aléatoire, de Commune à Extraordinaire.</p>
            <div class="mt-8 flex items-center justify-between gap-4">
              <span class="font-display text-3xl text-[#b8e4ed]">{{ SCRATCH_TICKET_COST }} pts</span><UiButton
                :disabled="points < SCRATCH_TICKET_COST"
                @click="buyScratchTicket('carto')"
              >
                Acheter
              </UiButton>
            </div>
          </article>
        </div>
      </section>

      <section class="pb-12">
        <div class="mb-8">
          <p class="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">À l’unité</p>
          <h2 class="font-display text-5xl text-[#fff8e9]">Choisis ta carte</h2>
          <p class="mt-4 max-w-xl leading-relaxed text-[#9cafb6]">Achète directement les cartes Commun, Rare, Épique et Légendaire. Les cartes Extraordinaires restent secrètes jusqu’à leur achat ou leur découverte dans un booster.</p>
        </div>
        <div class="mb-6 flex flex-col gap-3 md:flex-row">
          <input
            v-model="searchTerm"
            type="search"
            placeholder="Rechercher une carte…"
            aria-label="Rechercher une carte"
            class="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#172536] px-4 py-3 text-sm text-[#f7f3ea] outline-none placeholder:text-[#71858e] focus:border-[#e2bd72]"
          >
          <div class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="filter in filters"
              :key="filter"
              variant="ghost"
              :class="[activeFilter === filter ? 'border-[#e2bd72] bg-[#e2bd72] text-[#172536]' : 'border-white/10 bg-white/3 text-[#94a8b0]', 'shrink-0 rounded-full border px-3 py-2 text-xs font-bold no-underline transition hover:border-[#e2bd72]']"
              @click="activeFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          <article
            v-for="card in purchasableCards"
            :key="card.id"
            class="relative rounded-2xl border border-white/10 bg-[#172536]/70 p-4"
          >
            <UiCard
              :card="card"
              :rarity="card.rarity"
            />
            <span
              v-if="getOwnedCount(card) > 0"
              class="pointer-events-none absolute right-6 top-6 rounded-full bg-[#e2bd72] px-2 py-1 text-[10px] font-bold text-[#172536]"
            >{{ getOwnedCount(card) }} exemplaire{{ getOwnedCount(card) > 1 ? 's' : '' }}</span>
            <div class="mt-3 flex flex-col items-stretch gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
              <span class="font-display text-xl text-[#f2d58d]">{{ getCardCost(card.rarity) }} pts</span>
              <UiButton
                :disabled="points < (getCardCost(card.rarity) ?? Infinity)"
                class="px-3 py-2 text-xs sm:px-4 sm:text-sm"
                @click="buyCardFromShop(card)"
              >
                Acheter
              </UiButton>
            </div>
          </article>
          <article
            v-if="showExtraordinaryCard"
            class="relative rounded-2xl border border-[#d99bc5]/50 bg-linear-to-br from-[#593d5b] via-[#302b3b] to-[#172536] p-4"
          >
            <div v-if="mysteryCard">
              <UiCard
                :card="mysteryCard"
                :disabled="true"
                :mystery="true"
              />
              <span
                v-if="getOwnedCount(mysteryCard) > 0"
                class="pointer-events-none absolute right-6 top-6 rounded-full bg-[#e2bd72] px-2 py-1 text-[10px] font-bold text-[#172536]"
              >Déjà obtenue</span>
            </div>
            <div class="mt-3 flex flex-col items-stretch gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between">
              <span class="font-display text-xl text-[#f0b9dc]">{{ EXTRAORDINARY_CARD_COST }} pts</span>
              <UiButton
                :disabled="points < EXTRAORDINARY_CARD_COST"
                class="px-3 py-2 text-xs sm:px-4 sm:text-sm"
                @click="buyExtraordinaryCard"
              >
                Acheter
              </UiButton>
            </div>
          </article>
        </div>
      </section>
    </main>

    <BoosterOpeningOverlay ref="boosterOverlay" />

    <PurchaseConfirmationModal
      v-if="pendingPurchase"
      v-model="isPurchaseModalOpen"
      :item-name="pendingPurchase.name"
      :cost="pendingPurchase.cost"
      :balance="points"
      @confirm="confirmPurchase"
    >
      <template #visual>
        <div
          v-if="pendingPurchase.type === 'card' && pendingPurchase.card"
          class="pointer-events-none mx-auto max-w-45"
        >
          <UiCard
            :card="pendingPurchase.card"
            :rarity="pendingPurchase.card.rarity"
          />
        </div>
        <div
          v-else
          class="mx-auto grid h-28 w-24 place-items-center rounded-xl border border-[#e2bd72]/40 bg-[#203747] text-5xl text-[#e2bd72] shadow-lg"
        >
          {{ pendingPurchase.type === 'extraordinary' ? '?' : pendingPurchase.type === 'ticket' ? '✧' : '✦' }}
        </div>
      </template>
    </PurchaseConfirmationModal>

    <ScratchTicketModal
      v-model="isScratchModalOpen"
      :ticket-type="scratchTicketType"
      :reward="scratchReward"
      @complete="completeScratch"
    />

    <UiModal
      v-if="purchasedCard"
      v-model="isPurchasedCardModalOpen"
      panel-class="max-w-sm"
      aria-label="Carte achetée"
    >
      <p class="mb-5 text-center text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Carte ajoutée à ta collection</p>
      <UiCard
        :card="purchasedCard"
        :rarity="purchasedCard.rarity"
      />
      <UiButton
        class="mt-6 w-full"
        @click="purchasedCard = null"
      >
        Garder la carte
      </UiButton>
    </UiModal>
  </div>
</template>
