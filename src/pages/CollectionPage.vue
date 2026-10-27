<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import UiButton from '@/components/UiButton.vue'
import UiCard from '@/components/UiCard.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { cards, type Card, type Rarity } from '@/data/cards'

type Filter = 'Toutes' | Rarity

const filters: Filter[] = ['Toutes', 'Commun', 'Rare', 'Épique', 'Légendaire', 'Extraordinaire']
const activeFilter = ref<Filter>('Toutes')
const selectedCard = ref<Card | null>(null)
const { value: collection } = useLocalStorage<Card[]>('mimi-secret-collection', [])

const collectionCards = computed(() => cards.map((card) => ({
  card,
  count: collection.value.filter((ownedCard) => ownedCard.id === card.id).length,
})))

const filteredCards = computed(() => {
  if (activeFilter.value === 'Toutes') return collectionCards.value
  return collectionCards.value.filter(({ card }) => card.rarity === activeFilter.value)
})

const uniqueCards = computed(() => new Set(collection.value.map((card) => card.id)).size)

const countByRarity = (rarity: Rarity) => collection.value.filter((card) => card.rarity === rarity).length
</script>

<template>
  <div class="min-h-screen bg-[#101a26] text-[#f7f3ea]">
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 pb-24 pt-12 lg:px-10">
      <section class="snow-drift relative overflow-hidden rounded-4xl border border-white/10 bg-[#172536] px-6 py-12 md:px-12">
        <div class="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#b46e36]/20 blur-3xl"></div>
        <div class="relative">
          <p class="mb-4 text-xs font-bold uppercase tracking-[.3em] text-[#e2bd72]">Ton album d’hiver</p>
          <div class="flex flex-wrap items-end justify-between gap-8">
            <div>
              <h1 class="font-display text-6xl leading-none text-[#fff9ed] md:text-8xl">Ma collection</h1>
              <p class="mt-6 max-w-xl text-lg leading-relaxed text-[#b9c5cc]">Toutes les merveilles découvertes dans tes boosters, soigneusement conservées jusqu’au grand soir.</p>
            </div>
            <div class="flex gap-8 border-l border-white/10 pl-8">
              <div><p class="font-display text-4xl text-[#e2bd72]">{{ collection.length }}</p><p class="mt-1 text-xs uppercase tracking-widest text-[#84969e]">cartes</p></div>
              <div><p class="font-display text-4xl text-[#e2bd72]">{{ uniqueCards }}<span class="text-2xl text-[#84969e]">/{{ cards.length }}</span></p><p class="mt-1 text-xs uppercase tracking-widest text-[#84969e]">découvertes</p></div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="mb-2 text-xs font-bold uppercase tracking-[.25em] text-[#e2bd72]">Mon album</p>
            <h2 class="font-display text-4xl text-[#fff8e9]">L’album complet</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="filter in filters" :key="filter" :class="activeFilter === filter ? 'border-[#e2bd72] bg-[#e2bd72] text-[#172536]' : 'border-white/10 bg-white/3 text-[#94a8b0] hover:border-[#e2bd72]/60 hover:text-[#f2d58d]'" class="rounded-full border px-4 py-2 text-xs font-bold transition" @click="activeFilter = filter">{{ filter }}<span v-if="filter !== 'Toutes'" class="ml-1.5 opacity-60">({{ countByRarity(filter) }})</span></button>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="{ card, count } in filteredCards" :key="card.id" class="relative">
            <UiCard :card="card" :disabled="count === 0" :mystery="card.rarity === 'Extraordinaire' && count === 0" @click="selectedCard = card" />
            <span v-if="count > 0" class="pointer-events-none absolute right-3 top-3 rounded-full bg-[#e2bd72] px-2.5 py-1 text-[10px] font-bold text-[#172536]">{{ count }} exemplaire{{ count > 1 ? 's' : '' }}</span>
            <span v-else class="pointer-events-none absolute right-3 top-3 rounded-full bg-[#101a26]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#71858e]">À découvrir</span>
          </div>
        </div>
      </section>
    </main>

    <div v-if="selectedCard" class="fixed inset-0 z-30 grid place-items-center bg-[#09111a]/80 p-6 backdrop-blur-sm" @click.self="selectedCard = null">
      <div class="w-full max-w-md rounded-2xl border border-[#e2bd72]/40 bg-[#172536] p-7 shadow-2xl">
        <div class="mb-8 flex items-start justify-between"><div><p class="text-xs uppercase tracking-[.2em] text-[#e2bd72]">{{ selectedCard.type }}</p><h2 class="mt-2 font-display text-4xl text-[#fff8e9]">{{ selectedCard.name }}</h2></div><button aria-label="Fermer" class="text-2xl text-[#9aabb1] hover:text-white" @click="selectedCard = null">×</button></div>
        <div class="mb-6 flex items-center gap-5 rounded-xl border border-white/10 bg-[#203747] p-5"><span class="text-6xl text-[#e2c978]">{{ selectedCard.symbol }}</span><div><span class="rounded-full bg-[#fff0bc] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#95601d]">{{ selectedCard.rarity }}</span><p class="mt-3 text-xs uppercase tracking-widest text-[#8fa0aa]">{{ selectedCard.power }}</p></div></div>
        <p class="leading-relaxed text-[#b9c5cc]">{{ selectedCard.description }}</p>
        <UiButton class="mt-8 w-full" @click="selectedCard = null">Fermer la carte</UiButton>
      </div>
    </div>
  </div>
</template>
